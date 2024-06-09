import { ChangeDetectorRef, Component } from '@angular/core';
import { BuyService } from '../service/buy.service';
import { GiftList } from '../list-gift/giftList.module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class cardComponent {

  constructor(private buyService:BuyService,private cdr:ChangeDetectorRef,private router:Router){}
  GiftLists:GiftList[]
  GiftListold:GiftList[]
  giftList:GiftList
  dialog:boolean
  counter:number

ngOnInit(): void {
this.buyService.getc().subscribe(a=>this.GiftLists=a)
this.buyService.setReloadGift()
}

delete(g:GiftList){
this.buyService.delete(g.giftId).subscribe((x:any)=>{
  this.buyService.getc().subscribe((a:any)=>{(this.GiftLists=a)},
  (err:any)=>{
    console.error('not relode',err)
    alert("not relode")
  }) 
},
(err:any)=>{
  alert("not delete")
})
}
pay(){
  this.router.navigate(['pay'])
  this.dialog=true
}
  goToBuying(){
    this.router.navigate(['buy'])
  }
  }
  