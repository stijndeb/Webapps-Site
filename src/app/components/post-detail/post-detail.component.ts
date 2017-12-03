import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/post.model';
import { Comment } from '../../models/comment.model';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['../../app.component.css']
})
export class PostDetailComponent implements OnInit {
  private _post: Post;
  private _id: number;

  constructor(private postService: PostService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      console.log(params);
      this._id = params.id;
      this.postService.getPost(this._id).subscribe((res) => {
        this._post = res;
        console.log(this._post);
      }, (err) => {console.log(err);});
    });

    
  }

  get post(){
    return this._post;
  }

  get comments(){
    return this._post.comments;
  }

  

}
