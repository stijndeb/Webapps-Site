import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {PostService} from '../../services/post.service';
import {Post} from '../../models/post.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['../../app.component.css']
})
export class ProfileComponent implements OnInit {
  private _posts: Post[];
  page:number=1;
  totalPosts: number;
  user: any;

  constructor(private postService: PostService,private authService: AuthService, private router: Router) { }

  ngOnInit() {
      this.user = this.authService.getUser();
      this.postService.getMyPosts().subscribe((res) =>{
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



}
