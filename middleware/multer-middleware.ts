import { NextApiRequest, NextApiResponse } from 'next';
import multer from 'multer';
import { randomUUID } from 'crypto';

const MIME_TYPE_MAP: any = {
  'image/png': 'png',
  'image/jpg': 'jpg',
  'image/jpeg': 'jpeg',
  'image/webp': 'webp',
};

export const upload = multer({
  storage: multer.diskStorage({
    destination: './public/images/profile-images',
    filename: (req, file, cb) => {
      const fileExt = MIME_TYPE_MAP[file.mimetype];

      cb(null, `${randomUUID()}.${fileExt}`);
    },
  }),
  fileFilter: (req, file, cb) => {
    const isValid = !!MIME_TYPE_MAP[file.mimetype];

    cb(null, isValid);
  },
});

export default function runMulterMiddleware(
  req: NextApiRequest,
  res: NextApiResponse,
  multerMiddleware: Function
) {
  return new Promise((resolve, reject) => {
    multerMiddleware(req, res, (result: unknown) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}
