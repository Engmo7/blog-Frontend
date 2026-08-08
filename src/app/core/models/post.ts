import { User } from './user';
 
export interface Post {
  _id: string;
  title: string;
  content: string;
  coverImage?: string;
  tags: string[];
  author: User;
  likes: string[];
  createdAt: string;
  updatedAt: string;
}
 
export interface PostListResponse {
  total: number;
  page: number;
  pages: number;
  posts: Post[];
}