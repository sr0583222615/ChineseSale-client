import { Component, Input, OnInit } from '@angular/core';
import { GiftList } from '../list-gift/giftList.module';
import { User } from '../Models/User.model';
import { BuyService } from '../service/buy.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pay',
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.css']
})
export class PayComponent implements OnInit {

  constructor(private buyService: BuyService, private router: Router) { }

  @Input()
  dialog: boolean
  @Input()
  giftList: GiftList
  giftListsId: number[]
  client: User = new User()
  giftLists: GiftList[]
  giftlist: GiftList
  listid: GiftList[]
  numb: number
  ll: string[]
  i: number
  s: string
  submit: boolean = false
  selectedDate:Date
  cardNumber: number
  cvv: number
  counter:number=0;


  ngOnInit(): void {
    this.dialog = true
    this.buyService.getc().subscribe((a: any) => {
      this.giftLists = a
      console.log(this.giftLists);
      this.all();
    },
      (err: any) => {
        console.error('occure error', err);
      })
  }
  //good
  addToClient() {
    this.listid = []; // הגדרת listid כמערך ריק לפני הלולאה
    this.ll = []; // הגדרת listid כמערך ריק לפני הלולאה
    for (let a = 0; a < this.giftLists.length; a++) {
      this.listid[a] = this.giftLists[a];
    }
    console.log(this.listid);
    this.buyService.pay(this.listid).subscribe((res: any) => {
      console.log(res);
      if (res == 1) {
        for (var i = 0; i < this.listid.length; i++) {
          this.ll[i] = this.giftLists[i].giftName;
        }
        alert(
          this.ll + "Payment went through successfully, thank you"); // אם a שווה 1
      } else {
        alert("sory there is a problem, try again"); // אם a שונה מ-1
      }
      this.buyService.setReloadGift();
      this.hideDialog();
      this.giftLists = [];
      this.router.navigate(['buy'])

    },
      (err: any) => {
        console.error("occure errore", err)
        alert("there is a problem ,you can try in a 10 minuts.... maby ther isnt donors")
      }

    );
  }
  hideDialog() {
    this.dialog = false;
    this.router.navigate(['card'])
  }

  all(){
    this.giftLists.map(a=>{  
     this.counter+=( a.giftTicketCost) * (a.quantity?a.quantity:1)
    })
  }

  confirm() {
    this.submit = true
    console.log(this.selectedDate,this.cvv,this.cardNumber);
 
    if (this.selectedDate && this.cvv && this.cardNumber)
      this.addToClient();
    else
      alert("all fileds are required");

  }
  
}
