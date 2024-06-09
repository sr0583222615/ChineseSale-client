import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { GiftList } from '../list-gift/giftList.module';
import { OrdersDTO } from '../Models/OrdersDTO.model';
import { Winners } from '../Models/Winners.model';

@Injectable({
  providedIn: 'root'
})
export class BuyService {

  constructor(private httpClient:HttpClient ) { }
  private reloadGiftSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  reloadGift$: Observable<boolean> = this.reloadGiftSubject.asObservable();

  gifts:GiftList[]
  giftCart:GiftList[]
  getGift(): Observable<GiftList[]>{// חנות  הצגת
    let url = 'https://localhost:44346/api/Gift';
    //return null;
    return this.httpClient.get<GiftList[]>(url);
  }
  getc(): Observable<GiftList[]>{
    let url = 'https://localhost:44346/api/Orders ';
    let token = localStorage.getItem('token')
    const headers = new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization':`Bearer ${token}`
    });
    return this.httpClient.get<GiftList[]>(url,{ headers })//.pipe(map(a=>this.gifts=a))
  }
  // addcard(o:number): Observable<GiftList[]>{
  //   let url = 'https://localhost:44346/api/Orders';//add to card
  //   return this.httpClient.post<GiftList[]>(url,o);
  // }
  // addcard(o:number): Observable<any[]>{
  //   let url = 'https://localhost:44346/api/Orders';//add to card

  //   return this.httpClient.post<any[]>(url,o);
  // }

  addToCart(giftId:GiftList):Observable<GiftList[]>{
    let url='https://localhost:44346/api/orders'
    let token =localStorage.getItem('token')
    
    const headers = new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization':`Bearer ${token}`
    });
    console.log(token);
    console.log(giftId);

    return this.httpClient.post<GiftList[]>(url ,giftId ,{ headers })
    //.pipe(map(a=>this.gifts=a));
    }

  delete(id:number): Observable<number>{
    let url = 'https://localhost:44346/api/Orders/'+id;
    let token =localStorage.getItem('token')
    const headers = new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization':`Bearer ${token}`
    });
    return this.httpClient.delete<number>(url,{headers})
  }
  pay(arr:GiftList[]): Observable<number>{
    let url = 'https://localhost:44346/api/Orders/update';
    let token =localStorage.getItem('token')
    
    const headers = new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization':`Bearer ${token}`
    });
    //return null;
    console.log(arr);
    
    return this.httpClient.put<number>(url,arr,{ headers });
  }
  getWinner(): Observable<Winners[]>{
    let url = 'https://localhost:44346/api/Winner';
    //return null;
    return this.httpClient.get<Winners[]>(url);
  }
  getOrdersByGift(id:number[]): Observable<number>{
    let url = 'https://localhost:44346/api/Orders/'+id;
    //return null;
    return this.httpClient.get<number>(url);
  }

  setReloadGift(){
    let flag = this.reloadGiftSubject.value;
    this.reloadGiftSubject.next(!flag);
  }
}
