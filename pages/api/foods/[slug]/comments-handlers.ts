import { Comment } from '@/models/Comment';
import { User } from '@/models/User';
import dbConnect from '@/utils/db/dbConnect';
import { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from 'next-auth/jwt';
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

    const newComment = Comment.build({
      text,
      user: user!,
      foodSlug: slug as string,
    });

    await newComment.save();
    res.status(201).json(newComment);
    return;
  } catch (error) {
    res.status(500).json({ message: 'Somethin went wrong !' });
  }
}
