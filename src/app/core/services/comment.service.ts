import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Comment } from '../models/comment';

const API_URL = 'http://localhost:5000/api/comments';

@Injectable({ providedIn: 'root' })
export class CommentService {
  constructor(private http: HttpClient) {}

  addComment(postId: string, content: string): Observable<Comment> {
    return this.http.post<Comment>(`${API_URL}/${postId}`, { content });
  }

  deleteComment(commentId: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${API_URL}/${commentId}`);
  }
}