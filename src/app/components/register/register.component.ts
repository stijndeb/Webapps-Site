import { Component, OnInit } from '@angular/core';
import {ValidateService} from '../../services/validate.service';
import {AuthService} from '../../services/auth.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import {Router} from'@angular/router';
import { Observable } from 'rxjs/Rx';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators, FormControl } from '@angular/forms';


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
      username: ['', [Validators.required], this.validateUsername()],
      email: ['', [Validators.required], this.validateEmail()],
      password: ['', [Validators.required]]
    });
  }

  validateUsername(): ValidatorFn {
    return (control: AbstractControl): Observable<{ [key: string]: any }> => {
      return this.authService.checkUsernameAvailable(control.value).map(available => {
        if (available) {
          return null;
        }
        return { userAlreadyExists: true };
      })
    };
  }

  validateEmail(): ValidatorFn {
    return (control: AbstractControl): Observable<{ [key: string]: any }> => {
      return this.authService.checkEmailAvailable(control.value).map(available => {
        if (available) {
          return null;
        }
        return { emailAlreadyExists: true };
      })
    };
  }

  

  onRegisterSubmit(){

    if(!this.validateService.validateEmail(this.user.value.email)){
      this.flashMessage.show("invalid email", {cssClass: 'alert-danger', timeout: 5000});
      return false;
    }

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
