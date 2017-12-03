import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['../../app.component.css']
})
export class ProfileComponent implements OnInit {
  user: Object;

  constructor(private authService: AuthService, private router:Router) { }

  ngOnInit() {
    this.user = this.authService.getUser();
    console.log(this.user);
  }

}
