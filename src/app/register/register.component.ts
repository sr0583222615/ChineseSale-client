import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../Models/User.model';
import { UserService } from '../service/user.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  frmPerson: FormGroup = new FormGroup({});
  constructor(private route:Router,private serv:UserService,private activatedRoute:ActivatedRoute){
    this.frmPerson = new FormGroup({
      userId: new FormControl('0', [Validators.required , Validators.pattern('[0-9]{9}')]),
      userName: new FormControl('0', [Validators.required]),
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required, Validators.maxLength(10)]),
      userPhone: new FormControl('', [Validators.required , Validators.pattern('[0-9]{7,20}')]),
      userEmail: new FormControl('', [Validators.required, Validators.email]),
      role: new FormControl('',[Validators.required])
    });
  }
client:User=new User
goToLogin(){
this.route.navigate(['login']);}
user:User = new User()
registerUser(){
  this.user.userId=this.frmPerson.controls['userId'].value;
  this.user.firstName=this.frmPerson.controls['firstName'].value;
  this.user.lastName=this.frmPerson.controls['lastName'].value;
  this.user.role=this.frmPerson.controls['role'].value;
  this.user.userEmail=this.frmPerson.controls['userEmail'].value;
  this.user.userName=this.frmPerson.controls['userName'].value;
  this.user.userPhone=this.frmPerson.controls['userPhone'].value


  this.serv.register(this.user).subscribe((a:any)=>{
    alert(a)
    if (a!= null) {
      console.log(this.user);
      
      this.serv.setReloadGift();
      alert(this.user.firstName +" "+ this.user.lastName+"  register")
    }},
      (err:any)=>{
        console.error('occure error',err)
        alert(this.user.firstName +" "+ this.user.lastName+"sory, you are not registered  , try again")

      })
    this.goToLogin();
}
}
