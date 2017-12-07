import { Component, OnInit } from '@angular/core';
import { PostService} from '../../services/post.service';
import { Post } from '../../models/post.model';
import { Comment } from '../../models/comment.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-categorie',
  templateUrl: './categorie.component.html',
  styleUrls: ['./categorie.component.css']
})
export class CategorieComponent implements OnInit {
  private _posts: Post[];
  page:number=1;
  totalPosts: number;
  private _id: number;

  constructor(private postService: PostService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this._id = params.id;
      this.postService.getCatPosts(this._id).subscribe((res) =>{
        this._posts = res;
        this.totalPosts = this._posts.length;
        this._posts.sort((a,b)=>{
          return a.score - b.score;
        })
        this._posts.reverse();
      }, (err) => {console.log(err);});
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

}
