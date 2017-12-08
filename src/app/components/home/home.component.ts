import { Component, OnInit } from '@angular/core';
import { PostService} from '../../services/post.service';
import { Post } from '../../models/post.model';
import { Comment } from '../../models/comment.model';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['../../app.component.css']
})
export class HomeComponent implements OnInit {
  private _posts: Post[];
  page:number=1;
  totalPosts: number;

  constructor(private postService: PostService, public authService: AuthService) { }

  ngOnInit() {
    this.getPostList();
  }

  getPostList(){
    this.postService.getAllPosts().subscribe((res) =>{
      this._posts = res;
      this.totalPosts = this._posts.length;
      this._posts.sort((a,b)=>{
        return a.score - b.score;
      })
      this._posts.reverse();
    }, (err) => {console.log(err);});
  }

  get posts(){
    return this._posts.slice((this.page-1)*10,this.page*10);
  }

  delete(post){
    if(confirm("Bent u zeker dat u deze post wilt verwijderen?")){
      this.postService.deletePost(post.id).subscribe(item => this._posts = this._posts.filter(val => item.id !== val.id)
    );
    }
  }

  hottest(){
    this._posts.sort((a,b)=>{
      return a.score - b.score;
    })
    this._posts.reverse();
  }

  nieuwste(){
    this._posts.sort((a,b) => {
      if(a.datum > b.datum) return -1;
      if(a.datum < b.datum) return 1;
      return 0;
    });
  }

  beste(){
    this._posts.sort((a,b)=>{
      return a.average - b.average;
    }).reverse();
  }



}

