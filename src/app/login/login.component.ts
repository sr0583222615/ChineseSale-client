import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { User } from '../Models/User.model';
import { UserLogin } from '../Models/UserLogin.model';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private userservice: UserService, private router: Router) { }
  client: UserLogin = new UserLogin()
  paslogin: number
  admins: User[]
  token: string
  // private router: Route
  isAdmin(p: number) {//האם הוא מנהל
    this.userservice.GetAdminId(this.paslogin).subscribe(a => {
    })
  }

  login() {
    this.userservice.login(this.client).subscribe(
      (response: any) => {
        console.log(response);
        if (response.jsonToken) {
          const tokenObject = JSON.parse(response.jsonToken);
          localStorage.setItem('token', tokenObject.token);
          this.router.navigate(['/shop']);
        } else {
          console.log('User not found');
        }
      },
      (error: any) => {
        console.error('Error occurred:', error);
        alert("משתמש לא קיים ,מועבר לדף רישום");
        this.router.navigate(['/register']);
      }
    );

  }

  goToDonor() {
    this.router.navigate(['/donor-managment'])
  }

}

