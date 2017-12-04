import {Router} from '@angular/router';
import {PostService} from './../../services/post.service';
import {AuthService} from './../../services/auth.service';
import {Post} from './../../models/post.model';
import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {FormGroup, FormBuilder, Validators, FormArray} from '@angular/forms';
import {Observable} from 'rxjs/Rx';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {
@Output() public newPost = new EventEmitter<Post>();
public post: FormGroup;
public categorien: any[];
private categorie: any;
private user: any;
  constructor(private fb: FormBuilder, private _postService: PostService, private _authService: AuthService, private _router: Router) { }

  ngOnInit() {
    this.user = this._authService.getUser();
    this._postService.getCategorien().subscribe((categorien) => {this.categorien = categorien

    this.post = this.fb.group({
      title: ['', [Validators.required]],
      inhoud: ['', [Validators.required]],
      category: [this.categorien[0].name, [Validators.required]]
    })
    });
    this.post = this.fb.group({
      title: [''],
      inhoud: [''],
      category: ['']
    })
  }

  onSubmit(){
    this.categorie = this.categorien.find(c => c.name === this.post.value.category);
    const post = new Post(this.post.value.title, this.post.value.inhoud, this.user.id, this.categorie._id);    
    this._postService.addNewPost(post).subscribe(() => this._router.navigateByUrl(''));
  }

}
