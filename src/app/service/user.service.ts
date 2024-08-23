import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Donors } from '../donor-managment/Donors.module';
import { User } from '../Models/User.model';
import { UserLogin } from '../Models/UserLogin.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private HttpClient:HttpClient) { }
  private reloadDonorsSubject:BehaviorSubject<boolean>=new BehaviorSubject<boolean>(false)
  reloadDonors$:Observable<boolean>=this.reloadDonorsSubject.asObservable();

  addGDonors(g:Donors): Observable<number>{
    console.log(g);
    let url = 'https://localhost:7219/api/Donors/add';
    //return null;
    return this.HttpClient.post<number>(url,g);
  }
  register(g:User): Observable<number>{
    console.log(g); 
    console.log(g.userId);
    
    let url = 'https://localhost:7219/api/User';
    //return null;
    return this.HttpClient.post<number>(url,g);
  }
  setReloadGift(){
    let flag = this.reloadDonorsSubject.value;
    this.reloadDonorsSubject.next(!flag);
  }
  getAdmin(): Observable<User[]>{
    let url = 'http://localhost:5085/api/Person/GetAdmin';
    return this.HttpClient.get<User[]>(url);
  }
  GetAdminId(p:number): Observable<User>{
    let url = 'http://localhost:5085/api//api/Person/GetAdmin{p}';
    return this.HttpClient.get<User>(url);
  }
  login(g:UserLogin): Observable<string>{
    console.log("from the service"+g.Password+g.UserName); 
    let url = 'https://localhost:7219/api/User/login';
    //return null;
    return this.HttpClient.post<string>(url,g);
  }
}


// pay(arr:GiftList[]): Observable<number>{
//   let url = 'https://localhost:7219/api/Orders/update';
//   let token =localStorage.getItem('token')
  
//   const headers = new HttpHeaders({
//     'Content-Type':'application/json',
//     'Authorization':`Bearer ${token}`
//   });
//   //return null;
//   console.log(arr);
  
//   return this.httpClient.put<number>(url,arr,{ headers });
// }