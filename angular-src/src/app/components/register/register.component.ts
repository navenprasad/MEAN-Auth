import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { AuthService } from '../../services/auth.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import {Router} from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  name: String;
  username: String;
  email: String;
  password: String;

  constructor(
    private validateService: ValidateService,
    private flashMessage: FlashMessagesService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onRegisterSubmit(){
    const user = {
      name: this.name,
      email: this.email,
      username: this.username,
      password: this.password

    }
    //Required Fields
    if(!this.validateService.validateRegister(user)){
      this.flashMessage.show("Please fill everything", {cssClass: 'alert-danger', timeout:10000});
      return false;
    }

    //Validate emai
    if(!this.validateService.validateEmail(user.email)){
      this.flashMessage.show("Wrong email format", {cssClass: 'alert-danger', timeout:10000});
      return false;
    }

    //Register Users
    this.authService.registerUser(user).subscribe(data =>{
      if(data.success ){
        this.flashMessage.show("You are now registered", {cssClass: 'alert-success', timeout:10000});
        this.router.navigate(['/login']);
      }else{
        this.flashMessage.show("Somethign went wrong", {cssClass: 'alert-danger', timeout:10000});
        this.router.navigate(['/register']);

      }
    });












  }

}
