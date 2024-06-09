import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderDetailes } from '../Models/OrderDetailes.model';
import { GiftService } from '../service/gift.service';

@Component({
  selector: 'app-order-detailes',
  templateUrl: './order-detailes.component.html',
  styleUrls: ['./order-detailes.component.css']
})
export class OrderDetailesComponent implements OnInit{
  orders:OrderDetailes[]
constructor(private route: Router,private serv:GiftService) {    
}
  ngOnInit(): void {
      this.serv.OrderDetailes().subscribe((res:any)=>{
        this.orders=res;
        console.log(this.orders);
          },
          (error: any) => {
            console.error('Error occurred:', error);
            alert('error');
          })
 
 
        }


}
