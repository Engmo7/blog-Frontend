import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PostService } from '../../../core/services/post.service';
import { CommentService } from '../../../core/services/comment.service';
import { AuthService } from '../../../core/services/auth.service';
import { Post } from '../../../core/models/post';
import { Comment } from '../../../core/models/comment';

@Component({
  selector: 'app-post-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './post-detail.component.html',
  styleUrl: './post-detail.component.css'
})
export class PostDetailComponent implements OnInit {
  post: Post | null = null;
  comments: Comment[] = [];
  loading = true;
  errorMessage = '';
  newComment = '';
  postId = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private postService: PostService,
    private commentService: CommentService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.postId = this.route.snapshot.paramMap.get('id')!;
    this.loadPost();
  }

  loadPost(): void {
    this.loading = true;
    this.postService.getPostById(this.postId).subscribe({
      next: (res) => {
        this.post = res.post;
        this.comments = res.comments;
        this.loading = false;
      },
      error: () => {
        this.errorMessage = 'Post not found';
        this.loading = false;
      }
    });
  }

  isOwner(): boolean {
    const user = this.authService.currentUser();
    return !!user && !!this.post && this.post.author._id === user._id;
  }

  hasLiked(): boolean {
    const user = this.authService.currentUser();
    return !!user && !!this.post && this.post.likes.includes(user._id);
  }

  toggleLike(): void {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }
    this.postService.toggleLike(this.postId).subscribe(() => this.loadPost());
  }

  submitComment(): void {
    if (!this.newComment.trim()) return;

    this.commentService.addComment(this.postId, this.newComment).subscribe({
      next: (comment) => {
        this.comments.unshift(comment);
        this.newComment = '';
      }
    });
  }

  deleteComment(commentId: string): void {
    this.commentService.deleteComment(commentId).subscribe(() => {
      this.comments = this.comments.filter((c) => c._id !== commentId);
    });
  }

  isCommentOwner(comment: Comment): boolean {
    const user = this.authService.currentUser();
    return !!user && comment.author._id === user._id;
  }

  deletePost(): void {
    if (!confirm('Are you sure you want to delete this post?')) return;
    this.postService.deletePost(this.postId).subscribe(() => {
      this.router.navigate(['/']);
    });
  }
}