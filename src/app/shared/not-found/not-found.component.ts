import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="not-found">
      <h1>404</h1>
      <p>The page you're looking for doesn't exist.</p>
      <a routerLink="/">Back to Home</a>
    </div>
  `,
  styles: [`
    .not-found {
      text-align: center;
      padding: 4rem 1rem;
    }
    .not-found h1 {
      font-size: 4rem;
      margin-bottom: 0.5rem;
    }
    .not-found a {
      color: #2563eb;
    }
  `]
})
export class NotFoundComponent {}