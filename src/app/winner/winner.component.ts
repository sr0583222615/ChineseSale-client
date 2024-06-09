import { Component, OnInit } from '@angular/core';
import { BuyService } from '../service/buy.service';
import { Winners } from '../Models/Winners.model';

@Component({
  selector: 'app-winner',
  templateUrl: './winner.component.html',
  styleUrls: ['./winner.component.css']
})
export class WinnerComponent implements OnInit {
  constructor(private buyServ: BuyService) { }
  winner: Winners
  
  winners: Winners[]
  ngOnInit(): void {
    this.buyServ.getWinner().subscribe((a:any) => {
      if (a != null)
      console.log(a);
      
        this.winners = a;
      this.buyServ.setReloadGift();

    },(err:any)=>{
      console.error('occure error',err)
    }
    )
  }



}
