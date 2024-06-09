import { Component, OnInit } from '@angular/core';
import { BuyService } from '../service/buy.service';
import { GiftList } from '../list-gift/giftList.module';
import { Router } from '@angular/router';
import { OrdersDTO } from '../Models/OrdersDTO.model';
import { GiftService } from '../service/gift.service';

@Component({
  selector: 'app-buy',
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.css']
})
export class BuyComponent implements OnInit {
  constructor(private buyService: BuyService, private router: Router, private giftservice: GiftService) { }

  GiftLists: GiftList[]
  GiftList: GiftList
  inputValue: string
  giftCatagory: any[]
  listid :number[]
  numb :number
//good
  ngOnInit(): void {
    this.buyService.getGift().subscribe(
      (res:any)=>{
        if(res!=null){
          this.GiftLists = res;
          console.log(this.GiftLists);
          this.buyService.setReloadGift()}},
     (error:any)=>{
      console.error('Error occurred:', error);} )
    this.giftCatagory = [
      { label: 'Electronics', value: 'Electronics' },
      { label: 'Accessories', value: 'Accessories' },
      { label: 'different', value: 'different' }
    ];
  }

//good
  addTocard(g: GiftList) {
    this.buyService.addToCart(g).subscribe(
      (res:any)=>{
        if (res!=null) {
          this.buyService.setReloadGift()
          alert("add to cart");
          }},
      (err:any)=>{
        console.error('Error occurred', err);
        alert("If you want to take action, log in and enter your name.....")
      } 
        )}
  


  moveToCart() {
    this.buyService.getc().subscribe(a => {
      if (a != null)
        this.GiftLists = a})
    this.router.navigate(['card'])
  }

  
  filterOrder() {
    this.giftservice.reloadGift$.subscribe(x => {
      this.giftservice.byOrder().subscribe(g =>
        this.GiftLists = g)
    })
  }
  filterOrderHighToLow() {
    this.giftservice.reloadGift$.subscribe(x => {
      this.giftservice.filterOrderHighToLow().subscribe(g =>
        this.GiftLists = g)
    })
  }

  filter(dr: string) {

    if (dr == "") {
      this.buyService.reloadGift$.subscribe(x => {
        this.buyService.getGift().subscribe(data => {
          this.GiftLists = data
          console.log(this.GiftLists);
        })
      })
    }

    this.giftservice.filterCategory(dr).subscribe(a => {//by category
      if (a != null) {
        this.GiftLists = [];
        this.GiftLists = a;
      }
    })
  }
}



