import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PostService } from '../../../core/services/post.service';
import { Post } from '../../../core/models/post';

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.css'
})
export class PostListComponent implements OnInit {
  posts: Post[] = [];
  loading = true;
  errorMessage = '';
  page = 1;
  totalPages = 1;

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.loadPosts();
  }

  loadPosts(): void {
    this.loading = true;
    this.postService.getPosts(this.page).subscribe({
      next: (res) => {
        this.posts = res.posts;
        this.totalPages = res.pages;
        this.loading = false;
      },
      error: () => {
        this.errorMessage = 'Failed to load posts';
        this.loading = false;
      }
    });
  }

  nextPage(): void {
    if (this.page < this.totalPages) {
      this.page++;
      this.loadPosts();
    }
  }

  prevPage(): void {
    if (this.page > 1) {
      this.page--;
      this.loadPosts();
    }
  }
}