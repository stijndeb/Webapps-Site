import { Component, OnInit, Input } from '@angular/core';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/post.model';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['../../app.component.css']
})
export class PostComponent implements OnInit {
  @Input() public _post: Post;
  
  constructor(private _postService: PostService) { }

  ngOnInit() {
  }

  get post(){
    return this._post;
  }

}
