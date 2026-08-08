import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post, PostListResponse } from '../models/post';

const API_URL = 'http://localhost:5000/api/posts';

@Injectable({ providedIn: 'root' })
export class PostService {
  constructor(private http: HttpClient) {}

  getPosts(page = 1, limit = 10): Observable<PostListResponse> {
    return this.http.get<PostListResponse>(`${API_URL}?page=${page}&limit=${limit}`);
  }

  getPostById(id: string): Observable<{ post: Post; comments: any[] }> {
    return this.http.get<{ post: Post; comments: any[] }>(`${API_URL}/${id}`);
  }

  createPost(data: { title: string; content: string; coverImage?: string; tags?: string[] }): Observable<Post> {
    return this.http.post<Post>(API_URL, data);
  }

  updatePost(id: string, data: Partial<Post>): Observable<Post> {
    return this.http.put<Post>(`${API_URL}/${id}`, data);
  }

  deletePost(id: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${API_URL}/${id}`);
  }

  toggleLike(id: string): Observable<{ likesCount: number; liked: boolean }> {
    return this.http.post<{ likesCount: number; liked: boolean }>(`${API_URL}/${id}/like`, {});
  }
}