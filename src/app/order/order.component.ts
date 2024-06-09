import { Component, OnInit } from '@angular/core';
import { BuyService } from '../service/buy.service';
import { GiftService } from '../service/gift.service';
import { orders } from '../Models/Orders.model';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { TreeNode } from 'primeng/api';
@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  order:orders
  orders:orders[]
  orderId:number
  constructor(private serv:GiftService, private route:ActivatedRoute) {}
  ngOnInit(): void {
      this.route.queryParams.subscribe(p => {
        this.orderId = p['id'];
        this.serv.ordersGift(this.orderId).subscribe((res:any)=>{
          this.orders=res;
          console.log(this.orders);
          
            },
            (error: any) => {
              console.error('Error occurred:', error);
              alert('error');
            })
            });
   
   
          }   
  }


 
