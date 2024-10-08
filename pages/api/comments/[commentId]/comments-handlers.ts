import { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from 'next-auth/jwt';

import dbConnect from '@/utils/db/dbConnect';
import { Comment } from '@/models/Comment';
import { User } from '@/models/User';
import { Food, FoodDoc } from '@/models/Food';
import { Types } from 'mongoose';
import { friesList, saladList } from '@/DUMMY_DATA/foods';

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

// export async function foodsCommentsPostHandler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   try {
//     const secret = process.env.JWT_SECRET;
//     const session = await getToken({ req, secret });
//     if (!session) {
//       res.status(401).json({ message: 'You are not authenticated' });
//       return;
//     }

//     const { slug } = req.query;
//     const { text } = req.body;

//     await dbConnect();

//     const user = await User.findOne({ email: session?.email });

//     if (!slug) {
//       return res.status(400).json({ message: 'Food slug is required !' });
//     }
//     const commentFood = await Food.findOne({ slug: slug });
//     if (!commentFood) {
//       return res.status(400).json({ message: 'Food slug is wrong !' });
//     }

//     const newComment = Comment.build({
//       text,
//       user: user!,
//       foodSlug: slug as string,
//     });
//     await newComment.save();

//     if (commentFood.commentsLength) {
//       commentFood.commentsLength = ++commentFood.commentsLength;
//     } else {
//       commentFood.commentsLength = 1;
//     }

//     await commentFood.save();

//     res.status(201).json(newComment);
//     return;
//   } catch (error) {
//     res.status(500).json({ message: 'Somethin went wrong !' });
//   }
// }

export async function foodsCommentsDeleteHandler(
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

    const commentId = req.query.commentId;

    const commentToDelete = await Comment.findById(commentId).populate('user');
    if (!commentToDelete) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    if (commentToDelete.user.email !== session.email) {
      return res.status(401).json({ message: 'You are not authenticated' });
    }

    const foodComment = await Food.findOne({ slug: commentToDelete.foodSlug });

    if (!foodComment) {
      return res.status(400).json({ message: 'Food not found' });
    }

    await commentToDelete.delete();

    if (foodComment.commentsLength! > 0) {
      foodComment.commentsLength = --foodComment.commentsLength!;
    }

    await foodComment.save();

    res.status(200).json({});
    return;
  } catch (error) {
    res.status(500).json({ message: 'Somethin went wrong !' });
  }
}
