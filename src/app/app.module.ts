import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';
import {RouterModule, Routes} from '@angular/router'; 
import {ReactiveFormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';

import {ValidateService} from'./services/validate.service';
import {AuthService} from'./services/auth.service';
import {PostService} from'./services/post.service';
import {FlashMessagesModule} from'angular2-flash-messages';
import {AuthGuard} from './guards/auth.guard';
import { PostDetailComponent } from './components/post-detail/post-detail.component';

import {StarRatingModule} from 'angular-star-rating';
import { AddPostComponent } from './components/add-post/add-post.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { CategorieComponent } from './components/categorie/categorie.component';

const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'add-post', component: AddPostComponent, canActivate:[AuthGuard]},
  {path: 'profile', component: ProfileComponent, canActivate:[AuthGuard]},
  {path: 'post-detail/:id', component: PostDetailComponent},
  {path: 'categorie/:id', component: CategorieComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ProfileComponent,
    PostDetailComponent,
    AddPostComponent,
    CategorieComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    FlashMessagesModule,
    ReactiveFormsModule,
    StarRatingModule.forRoot(),
    NgbModule.forRoot()
  ],
  providers: [ValidateService, AuthService, AuthGuard, PostService],
  bootstrap: [AppComponent]
})
export class AppModule { }
