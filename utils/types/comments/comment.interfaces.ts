import { IUser } from '@/utils/types/user/user.types';

export interface CommentFieldValues {
  comment: string;
}

export interface IComment {
  id: string;
  foodSlug: string;
  text: string;
  createdAt: string;
  updatedAt: string;
  user: IUser;
}

export interface IAddComment {
  userEmail: string;
  text: string;
  foodSlug: string;
}

export interface ICommentApiResponse {
  id: string;
  foodSlug: string;
  text: string;
  createdAt: string;
  updatedAt: string;
  user: IUser;
}
