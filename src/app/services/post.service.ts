import { Injectable } from '@angular/core';
import {Http, Headers } from '@angular/http';
import { Post } from '../models/post.model';
import { Comment } from '../models/comment.model';
import { Rating } from '../models/rating.model';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import {AuthService} from './auth.service';

@Injectable()
export class PostService {
  //private _appUrl = 'http://localhost:3000/';
  private _appUrl = '';
  constructor(private http: Http, private authService: AuthService) { }


  getAllPosts(): Observable<Post[]>{
    return this.http.get(`${this._appUrl}posts/alles`).map(res => res.json().map(item => Post.fromJSON(item)));
  }

  getCatPosts(id): Observable<Post[]>{
    return this.http.get(`${this._appUrl}posts/cat/${id}`).map(res => res.json().map(item => Post.fromJSON(item)));
  }

  getMyPosts(): Observable<Post []>{
    let headers = new Headers();
    headers.append('Authorization', this.authService.token);
    headers.append('Content-Type', 'application/json');
    return this.http.get(`${this._appUrl}posts/myPosts/${this.authService.user.id}`, {headers: headers}).map(res => res.json().map(item => Post.fromJSON(item)));
  }

  getPost(id): Observable<Post> {
    return this.http.get(`${this._appUrl}posts/${id}`).map(res => res.json()).map(item => Post.fromJSON(item));
  }

  getCategorien(){
    return this.http.get(`${this._appUrl}categories/alles`).map(res => res.json());
  }

  addNewPost(post){
    let headers = new Headers();
    headers.append('Authorization', this.authService.token);
    headers.append('Content-Type', 'application/json');
    return this.http.post(`${this._appUrl}posts/post`, post, {headers: headers})
      .map(res => res.json()).map(item => Post.fromJSON(item));
  }

  deletePost(id){
    let headers = new Headers();
    headers.append('Authorization', this.authService.token);
    headers.append('Content-Type', 'application/json');
    return this.http.delete(`${this._appUrl}posts/${id}`, {headers: headers})
      .map(res => res.json()).map(item => Post.fromJSON(item));
  }

  addNewComment(comment, id){
    let headers = new Headers();
    headers.append('Authorization', this.authService.token);
    headers.append('Content-Type', 'application/json');
    return this.http.post(`${this._appUrl}${id}/comments`, comment, {headers: headers})
      .map(res => res.json()).map(item => Comment.fromJSON(item));
  }

  deleteComment(id){
    let headers = new Headers();
    headers.append('Authorization', this.authService.token);
    headers.append('Content-Type', 'application/json');
    return this.http.delete(`${this._appUrl}comment/${id}`, {headers: headers})
      .map(res => res.json()).map(item => Comment.fromJSON(item));
  }

  addNewRating(rating, id){
    let headers = new Headers();
    headers.append('Authorization', this.authService.token);
    headers.append('Content-Type', 'application/json');
    return this.http.post(`${this._appUrl}${id}/rate`, rating, {headers: headers})
      .map(res => res.json()).map(item => Post.fromJSON(item));
  }


}
