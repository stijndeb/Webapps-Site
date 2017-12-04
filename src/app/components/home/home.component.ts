import { Component, OnInit } from '@angular/core';
import { PostService} from '../../services/post.service';
import { Post } from '../../models/post.model';
import { Comment } from '../../models/comment.model';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['../../app.component.css']
})
export class HomeComponent implements OnInit {
  private _posts: Post[];


  constructor(private postService: PostService) { }

  ngOnInit() {
    this.getPostList();
  }

  getPostList(){
    this.postService.getAllPosts().subscribe((res) =>{
      this._posts = res;
    }, (err) => {console.log(err);});
  }

  get posts(){
    return this._posts;
  }

  delete(post){
    if(confirm("Bent u zeker dat u deze post wilt verwijderen?")){
      this.postService.deletePost(post.id).subscribe(item => this._posts = this._posts.filter(val => item.id !== val.id)
    );
    }
  }

}

