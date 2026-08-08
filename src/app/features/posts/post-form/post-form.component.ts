import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from '../../../core/services/post.service';

@Component({
  selector: 'app-post-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './post-form.component.html',
  styleUrl: './post-form.component.css'
})
export class PostFormComponent implements OnInit {
  title = '';
  content = '';
  coverImage = '';
  tagsInput = '';
  errorMessage = '';
  loading = false;
  isEditMode = false;
  postId: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private postService: PostService
  ) {}

  ngOnInit(): void {
    this.postId = this.route.snapshot.paramMap.get('id');
    this.isEditMode = !!this.postId;

    if (this.isEditMode && this.postId) {
      this.loading = true;
      this.postService.getPostById(this.postId).subscribe({
        next: (res) => {
          this.title = res.post.title;
          this.content = res.post.content;
          this.coverImage = res.post.coverImage || '';
          this.tagsInput = res.post.tags.join(', ');
          this.loading = false;
        },
        error: () => {
          this.errorMessage = 'Failed to load post data';
          this.loading = false;
        }
      });
    }
  }

  onSubmit(): void {
    this.errorMessage = '';
    this.loading = true;

    const tags = this.tagsInput
      .split(',')
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    const payload = { title: this.title, content: this.content, coverImage: this.coverImage, tags };

    const request$ = this.isEditMode && this.postId
      ? this.postService.updatePost(this.postId, payload)
      : this.postService.createPost(payload);

    request$.subscribe({
      next: (post) => {
        this.loading = false;
        this.router.navigate(['/posts', post._id]);
      },
      error: (err) => {
        this.loading = false;
        this.errorMessage = err.error?.message || 'An error occurred while saving the post';
      }
    });
  }
}