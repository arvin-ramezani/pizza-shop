import type { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';

import {
  foodsCommentsGetHandler,
  foodsCommentsPostHandler,
} from './comments-handlers';

const foodsCommentsRoutes = nextConnect<NextApiRequest, NextApiResponse>({
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

foodsCommentsRoutes.get(foodsCommentsGetHandler);
foodsCommentsRoutes.post(foodsCommentsPostHandler);

export default foodsCommentsRoutes;
