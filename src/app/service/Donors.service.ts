import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Donors } from '../donor-managment/Donors.module';
import { LoginComponent } from '../login/login.component';

@Injectable({
  providedIn: 'root'
})
export class DonorsService {

  constructor(private HttpClient:HttpClient) { }
  private reloadDonorsSubject:BehaviorSubject<boolean>=new BehaviorSubject<boolean>(false)
  reloadDonors$:Observable<boolean>=this.reloadDonorsSubject.asObservable();
  
    getD(): Observable<Donors[]>{
     let url = 'https://localhost:7219/api/Donors';
    return this.HttpClient.get<Donors[]>(url);
  }
  delete(id:string): Observable<number>{
    let url = 'https://localhost:7219/api/Donors/'+id;
    return this.HttpClient.delete<number>(url);
  }
  setReloadGift(){
    let flag = this.reloadDonorsSubject.value;
    this.reloadDonorsSubject.next(!flag);
  }
  addGDonors(g:Donors): Observable<number>{
    let url = 'https://localhost:7219/api/Donors/add';
    return this.HttpClient.post<number>(url,g);
  }
  updateGift(g:Donors): Observable<Donors>{
    let url = 'https://localhost:7219/api/Donors/' +g.donorsId;
    return this.HttpClient.put<Donors>(url,g);
  }
  detByFilter(id:string): Observable<Donors>{
    let url = 'https://localhost:7219/api/Donors/name'+id;
    console.log(url);
    return this.HttpClient.get<Donors>(url);
  }
  fillterByGift(s:string): Observable<Donors[]>{
    let url = 'https://localhost:7219/api/Donors/ByDonotion'+s;
   return this.HttpClient.get<Donors[]>(url);
 }
}
