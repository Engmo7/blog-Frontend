import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { AuthResponse, User } from '../models/user';
 
const API_URL = 'http://localhost:5000/api/auth';
const TOKEN_KEY = 'blog_token';
const USER_KEY = 'blog_user';
 
@Injectable({ providedIn: 'root' })
export class AuthService {
  currentUser = signal<User | null>(this.getStoredUser());
 
  constructor(private http: HttpClient) {}
 
  register(name: string, email: string, password: string): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${API_URL}/register`, { name, email, password })
      .pipe(tap((res) => this.setSession(res)));
  }
 
  login(email: string, password: string): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${API_URL}/login`, { email, password })
      .pipe(tap((res) => this.setSession(res)));
  }
 
  logout(): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    this.currentUser.set(null);
  }
 
  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }
 
  isLoggedIn(): boolean {
    return !!this.getToken();
  }
 
  private setSession(res: AuthResponse): void {
    const user: User = { _id: res._id, name: res.name, email: res.email };
    localStorage.setItem(TOKEN_KEY, res.token);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
    this.currentUser.set(user);
  }
 
  private getStoredUser(): User | null {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) : null;
  }
}