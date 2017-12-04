import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/post.model';
import { Comment } from '../../models/comment.model';
import {AuthService} from './../../services/auth.service';


@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['../../app.component.css']
})
export class PostDetailComponent implements OnInit {
  private _post: Post;
  private _id: number;
  private user: any;
  public commentInhoud: string;
  isComment:boolean = false;

  constructor(private postService: PostService, private route: ActivatedRoute,
             private _authService: AuthService, private _router: Router) { }

  ngOnInit() {
    this.user = this._authService.getUser();
    this.route.params.subscribe((params) => {
      this._id = params.id;
      this.postService.getPost(this._id).subscribe((res) => {
        this._post = res;
      }, (err) => {console.log(err);});
    });

    
  }

  get post(){
    return this._post;
  }

  get comments(){
    return this._post.comments;
  }

  addComment(commentInhoud: string){
      const comment = new Comment(this.commentInhoud, this.user.id, this._post.id);
      
      this.postService.addNewComment(comment, this._post.id).subscribe(() => {
        this.postService.getPost(this._post.id).subscribe((res) =>{
          this._post = res;
          this.commentInhoud = "";
          this.isComment = false;
        })
      });
  }

  toggleIsComment(){
    this.isComment = !this.isComment;
  }

  delete(comment){
    if(confirm("Bent u zeker dat u deze comment wilt verwijderen?")){
      this.postService.deleteComment(comment._id).subscribe(() => {
        this.postService.getPost(this._post.id).subscribe((res) =>{
          this._post = res;
          this.commentInhoud = "";
          this.isComment = false;
        })
      });
    }
  }

}
