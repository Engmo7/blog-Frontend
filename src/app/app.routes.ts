import { Routes } from '@angular/router';
import { PostListComponent } from './features/posts/post-list/post-list.component';
import { PostDetailComponent } from './features/posts/post-detail/post-detail.component';
import { PostFormComponent } from './features/posts/post-form/post-form.component';
import { MyPostsComponent } from './features/posts/my-posts/my-posts.component';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { authGuard } from './core/guards/auth.guard';
 
export const routes: Routes = [
  { path: '', component: PostListComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'my-posts', component: MyPostsComponent, canActivate: [authGuard] },
  { path: 'posts/new', component: PostFormComponent, canActivate: [authGuard] },
  { path: 'posts/:id/edit', component: PostFormComponent, canActivate: [authGuard] },
  { path: 'posts/:id', component: PostDetailComponent },
  { path: '**', component: NotFoundComponent }
];