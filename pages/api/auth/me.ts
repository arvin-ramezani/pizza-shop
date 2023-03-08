import nextConnect from 'next-connect';
import type { NextApiRequest, NextApiResponse } from 'next';

import { usersGetHandler, usersPatchHandler } from './me-handlers';

const usersRoutes = nextConnect<NextApiRequest, NextApiResponse>({
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

usersRoutes.get(usersGetHandler);
usersRoutes.patch(usersPatchHandler);

// export const config = {
//   api: {
//     bodyParser: process.env.NODE_ENV === 'production' ? true : false,
//   },
// };

export default usersRoutes;
