import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from "rxjs";
import { GiftList } from '../list-gift/giftList.module';
import { orders } from '../Models/Orders.model';
import { OrderDetailes } from '../Models/OrderDetailes.model';

@Injectable({
  providedIn: 'root'
})
export class GiftService {

  constructor(private httpClient:HttpClient ) { }
  private reloadGiftSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  reloadGift$: Observable<boolean> = this.reloadGiftSubject.asObservable();
  gifts:GiftList[];
  getGift(): Observable<GiftList[]>{
    let url = 'https://localhost:7219/api/Gift';
    //return null;
    return this.httpClient.get<GiftList[]>(url);
  }
  addGift(g:GiftList): Observable<GiftList[]>{
    let url = 'https://localhost:7219/api/Gift';
    let token = localStorage.getItem('token')
    const headers = new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization':`Bearer ${token}`
    });    return this.httpClient.post<GiftList[]>(url,g,{ headers })//.pipe(map(a=>this.gifts=a))
  }
  updateGift(g:GiftList): Observable<number>{
    let url = 'https://localhost:7219/api/Gift/'+ g.giftId;
    let token = localStorage.getItem('token')
    const headers = new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization':`Bearer ${token}`
    });

    return this.httpClient.put<number>(url,g,{ headers });
  }
  delete(id:number): Observable<number>{
    let url = 'https://localhost:7219/api/Gift/'+id;
    let token = localStorage.getItem('token')
    const headers = new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization':`Bearer ${token}`
    });
    return this.httpClient.delete<number>(url,{ headers });
  }
  byOrder(): Observable<GiftList[]>{
    let url = 'https://localhost:7219/api/Gift/CostBYorder';
    //return null;
    return this.httpClient.get<GiftList[]>(url);
  }
  filterOrderHighToLow(): Observable<GiftList[]>{
    let url = 'https://localhost:7219/api/Gift/CostByExpensive';
    //return null;
    return this.httpClient.get<GiftList[]>(url);
  }
  filterDonor(d:string): Observable<GiftList[]>{
    let url = 'https://localhost:7219/api/Gift/FindByDonor'+d;
    //return null;
    return this.httpClient.get<GiftList[]>(url);
  }

  filterGIft(d:string): Observable<GiftList>{
    let url = 'https://localhost:7219/api/Gift/findByName'+d;
    //return null;
    return this.httpClient.get<GiftList>(url);
  }
  filterCategory(d:string): Observable<GiftList[]>{
    let url = 'https://localhost:7219/api/Gift/FindByCategory'+d;
    //return null;
    return this.httpClient.get<GiftList[]>(url);
  }
  filterOrders(d:number): Observable<GiftList[]>{
    let url = 'https://localhost:7219/api/Gift/FilterByOrders'+d;
    //return null;
    return this.httpClient.get<GiftList[]>(url);
  }
  filterBuyTheBest(): Observable<GiftList>{
    let url = 'https://localhost:7219/api/Orders/OrderByTheBest';
    //return null;
    return this.httpClient.get<GiftList>(url);
  }
  raffle(d:number): Observable<string>{
    let url = 'https://localhost:7219/api/Winner/'+d;
    let token = localStorage.getItem('token')
    const headers = new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization':`Bearer ${token}`
    });
    return this.httpClient.post<string>(url,d,{ headers });
  }
  Allmomy(): Observable<number>{
    let url = 'https://localhost:7219/api/Winner/allmony';
    //return null;
    return this.httpClient.get<number>(url);
  }

  ordersGift(id:number): Observable<orders[]>{
    let url = 'https://localhost:7219/api/Orders/'+id;
    //return null;
    return this.httpClient.get<orders[]>(url);
  }
  OrderDetailes(): Observable<OrderDetailes[]>{
    let url = 'https://localhost:7219/api/Orders/BuyerDetails'
    //return null;
    return this.httpClient.get<OrderDetailes[]>(url);
  }
 setReloadGift(){
    let flag = this.reloadGiftSubject.value;
    this.reloadGiftSubject.next(!flag);
  }

}
