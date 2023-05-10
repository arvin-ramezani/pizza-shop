import { Food } from '@/models/Food';
import dbConnect from '@/utils/db/dbConnect';
import type { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';

type Data = {
  name: string;
};

const foodsRoutes = nextConnect<NextApiRequest, NextApiResponse>({
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

async function foodsGetHandler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await dbConnect();

    const foods = await Food.find({});

    res.status(200).json(foods);
  } catch (error) {
    res.status(500).json({ message: 'Somethin went wrong !' });
  }
}

foodsRoutes.get(foodsGetHandler);

export default foodsRoutes;
