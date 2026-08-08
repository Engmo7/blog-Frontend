import { Component } from '@angular/core';
 
@Component({
  selector: 'app-footer',
  standalone: true,
  template: `
    <footer class="footer">
      <p>&copy; {{ year }} Blog Platform. All rights reserved.</p>
    </footer>
  `,
  styles: [`
    .footer {
      text-align: center;
      padding: 1rem;
      background-color: #1f2937;
      color: #d1d5db;
      margin-top: 2rem;
    }
  `]
})
export class FooterComponent {
  year = new Date().getFullYear();
}
