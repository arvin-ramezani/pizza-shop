import { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from 'next-auth/jwt';

import dbConnect from '@/utils/db/dbConnect';
import { Comment } from '@/models/Comment';
import { User } from '@/models/User';
import { Food } from '@/models/Food';

export async function foodsCommentsGetHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { slug } = req.query;

    await dbConnect();

    const comments = await Comment.find({ foodSlug: slug })
      .sort({ _id: -1 })
      .populate('user');

    res.status(200).json(comments);
    return;
  } catch (error) {
    res.status(500).json({ message: 'Somethin went wrong !' });
  }
}

export async function foodsCommentsPostHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const secret = process.env.JWT_SECRET;
    const session = await getToken({ req, secret });
    if (!session) {
      res.status(401).json({ message: 'You are not authenticated' });
      return;
    }

    const { slug } = req.query;
    const { text } = req.body;

    await dbConnect();

    const user = await User.findOne({ email: session?.email });

    if (!slug) {
      return res.status(400).json({ message: 'Food slug is required !' });
    }
    const commentFood = await Food.findOne({ slug: slug });
    if (!commentFood) {
      return res.status(400).json({ message: 'Food slug is wrong !' });
    }

    const newComment = Comment.build({
      text,
      user: user!,
      foodSlug: slug as string,
    });
    await newComment.save();

    if (commentFood.commentsLength) {
      commentFood.commentsLength = ++commentFood.commentsLength;
    } else {
      commentFood.commentsLength = 1;
    }

    await commentFood.save();

    res.status(201).json(newComment);
    return;
  } catch (error) {
    res.status(500).json({ message: 'Somethin went wrong !' });
  }
}

export async function foodsCommentsPatchHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const secret = process.env.JWT_SECRET;
    const session = await getToken({ req, secret });
    if (!session) {
      res.status(401).json({ message: 'You are not authenticated' });
      return;
    }

    await dbConnect();

    if (session.email !== req.body.user.email) {
      return res.status(401).json({ message: 'You are not authenticated' });
    }

    const commentToEdit = await Comment.findById(req.body.id).populate('user');
    if (!commentToEdit) {
      return res.status(404).json({ message: 'Comment not found' });
    }
    if (commentToEdit.user.email !== session.email) {
      return res.status(401).json({ message: 'You are not authenticated' });
    }

    commentToEdit.text = req.body.text;
    await commentToEdit.save();

    res.status(200).json(commentToEdit);
    return;
  } catch (error) {
    res.status(500).json({ message: 'Somethin went wrong !' });
  }
}
