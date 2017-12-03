import { Injectable } from '@angular/core';
import {Http, Headers } from '@angular/http';
import { Post } from '../models/post.model';
import { Comment } from '../models/comment.model';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class PostService {
  private _appUrl = 'http://localhost:3000';

  constructor(private http: Http) { }


  getAllPosts(): Observable<Post[]>{
    return this.http.get(`${this._appUrl}/posts`).map(res => res.json().map(item => Post.fromJSON(item)));
  }

  getPost(id): Observable<Post> {
    console.log(id);
    return this.http.get(`${this._appUrl}/posts/${id}`).map(res => res.json()).map(item => Post.fromJSON(item));
  }

  getCategorien(){
    return this.http.get(`${this._appUrl}/categories`).map(res => res.json());
  }

  addNewPost(post){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(`${this._appUrl}/posts/post`, post, {headers: headers})
      .map(res => res.json()).map(item => Post.fromJSON(item));
  }

  deletePost(id){
    return this.http.delete(`${this._appUrl}/posts/${id}`)
      .map(res => res.json()).map(item => Post.fromJSON(item));
  }


}
