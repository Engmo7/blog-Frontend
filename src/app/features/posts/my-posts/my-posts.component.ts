import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PostService } from '../../../core/services/post.service';
import { AuthService } from '../../../core/services/auth.service';
import { Post } from '../../../core/models/post';

@Component({
  selector: 'app-my-posts',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './my-posts.component.html',
  styleUrl: './my-posts.component.css'
})
export class MyPostsComponent implements OnInit {
  myPosts: Post[] = [];
  loading = true;

  constructor(private postService: PostService, private authService: AuthService) {}

  ngOnInit(): void {
    const userId = this.authService.currentUser()?._id;
    
    this.postService.getPosts(1, 100).subscribe({
      next: (res) => {
        this.myPosts = res.posts.filter((p) => p.author._id === userId);
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  deletePost(id: string): void {
    if (!confirm('are you sure you want delete post?')) return;
    this.postService.deletePost(id).subscribe(() => {
      this.myPosts = this.myPosts.filter((p) => p._id !== id);
    });
  }
}