import { Component, OnInit } from '@angular/core';
import {ValidateService} from '../../services/validate.service';
import {AuthService} from '../../services/auth.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import {Router} from'@angular/router';
import { Observable } from 'rxjs/Rx';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl, ValidatorFn} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../../app.component.css']
})
export class RegisterComponent implements OnInit {
  public user: FormGroup;
  
  constructor(private validateService: ValidateService, 
              private flashMessage: FlashMessagesService,
              private authService: AuthService,
              private router: Router,
              private fb: FormBuilder) { }

  ngOnInit() {
    this.user = this.fb.group({
      name: ['', [Validators.required]],
      username: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  /*validateUsername(): ValidatorFn {
    return (control: AbstractControl): Observable<{ [key: string]: any }> => {
      return this.authService.checkUsernameAvailable(control.value).map(available => {
        console.log("testje niet");
        if (available) {
          return null;
        }
        return { userAlreadyExists: true };
      })
    };
  }*/

  /*validateEmail(): ValidatorFn {
    return (control: AbstractControl): Observable<{ [key: string]: any }> => {
      return this.authService.checkEmailAvailable(control.value).map(available => {
        console.log("testjee");
        if (available) {
          return null;
        }
        return { emailAlreadyExists: true };
      })
    };
  }*/

  onRegisterSubmit(){
    

    if(!this.validateService.validateEmail(this.user.value.email)){
      this.flashMessage.show("invalid email", {cssClass: 'alert-danger', timeout: 5000});
      return false;
    }else if(!this.authService.checkEmailAvailable(this.user.value.email)){
      this.flashMessage.show("Email already in use", {cssClass: 'alert-danger', timeout: 5000});
      return false;
    }else if(!this.authService.checkUsernameAvailable(this.user.value.username)){
      this.flashMessage.show("Username already in use", {cssClass: 'alert-danger', timeout: 5000});
      return false;
    }else{

      const user = {
        name: this.user.value.name,
        email: this.user.value.email,
        username: this.user.value.username,
        password: this.user.value.password
      }
  
      this.authService.registerUser(user).subscribe(data => {
        if(data.success){
          this.flashMessage.show("You are now registered and can log in", {cssClass: 'alert-success', timeout: 3000});        
          this.router.navigate(['/login']);
        }else{
          this.flashMessage.show("Something went wrong", {cssClass: 'alert-danger', timeout: 3000});        
          this.router.navigate(['/register']);
        }
      });
    }
  }
}
