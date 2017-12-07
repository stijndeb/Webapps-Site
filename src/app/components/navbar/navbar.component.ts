import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';
import {PostService} from '../../services/post.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['../../app.component.css']
})
export class NavbarComponent implements OnInit {
  public _categorien: any[];

  constructor(public authService: AuthService,
              private router: Router,
              private _postService: PostService,
              private flashMessage:FlashMessagesService) { }


  ngOnInit() {
    this._postService.getCategorien().subscribe((categorien) => {this._categorien = categorien});
  }

  onLogoutClick(){
    this.authService.logout();
    this.flashMessage.show('You are logged out', {
      cssClass:'alert-success',
      timeout: 3000
    });
    this.router.navigate(['/login']);
    return false;
  }

  get categorien(){
    return this._categorien;
  }

}
