import { User } from './user';
 
export interface Comment {
  _id: string;
  content: string;
  author: User;
  post: string;
  createdAt: string;
}