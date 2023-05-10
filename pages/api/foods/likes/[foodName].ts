import { Food } from '@/models/Food';
import dbConnect from '@/utils/db/dbConnect';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from 'next-auth/jwt';
import nextConnect from 'next-connect';

const foodsLikes = nextConnect<NextApiRequest, NextApiResponse>({
  onError(err, req, res) {
    console.log(err, 'onError');
    res
      .status(500)
      .json({ message: 'Sorry something happened !' + err.message });
    return;
  },
  onNoMatch(req, res) {
    console.log(req, res, 'no match');
    res.status(405).json({ message: `Method ${req.method} not allowed !` });
    return;
  },
});

export async function foodsLikesPostHandler(
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

    const userEmail = req.body;
    if (session.email !== userEmail) {
      res.status(401).json({ message: 'You are not authenticated' });
      return;
    }

    const { foodName } = req.query;

    await dbConnect();
    const foodToLike = await Food.findOne({ name: foodName });
    if (!foodToLike) {
      return res.status(404).json({ message: 'Food not found !' });
    }

    let isAlreadyLike = foodToLike.likes.find((email) => email === userEmail);

    foodToLike.likes = isAlreadyLike
      ? foodToLike.likes.filter((email) => email !== isAlreadyLike)
      : [...foodToLike.likes, userEmail];

    await foodToLike.save();

    res.status(200);

    return;
  } catch (error) {
    res.status(500).json({ message: 'Somethin went wrong !' });
  }
}

foodsLikes.post(foodsLikesPostHandler);

export default foodsLikes;
