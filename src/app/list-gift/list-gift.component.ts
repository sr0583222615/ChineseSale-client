import { ChangeDetectorRef, Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { GiftList } from './giftList.module';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GiftService } from '../service/gift.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { orders } from '../Models/Orders.model';
import { Route, Router } from '@angular/router';


@Component({
  selector: 'app-list-gift',
  templateUrl: './list-gift.component.html',
  styleUrls: ['./list-gift.component.css'],
  providers: [ConfirmationService, MessageService, GiftService]

})
export class ListGiftComponent implements OnInit, OnChanges {

  GiftListDialog: boolean;
  GiftListDialog2: boolean
  winner: string
  GiftLists: GiftList[];
  GiftList: GiftList;
  selectedGiftLists: GiftList[];
  submitted: boolean;
  inputValue: string = "";
  category: any[];
  mony: number;
  orders: orders[]
  order: orders
  constructor(private route: Router, private GiftListService: GiftService, private messageService: MessageService, private confirmationService: ConfirmationService, private cdr: ChangeDetectorRef) { }
  ngOnChanges(changes: SimpleChanges): void {
  }
  ngOnInit() {
    this.GiftListService.reloadGift$.subscribe((x: any) => {
      this.GiftListService.getGift().subscribe(data => {
        this.GiftLists = data
        console.log(this.GiftLists);

      })

    },
      (err: any) => {
        console.error('occure error', err)
      })

  }

  deleteSelectedGiftLists() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected GiftLists?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {

        this.GiftLists = this.GiftLists.filter(val => !this.selectedGiftLists.includes(val));
        this.selectedGiftLists = [];
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'GiftLists Deleted', life: 3000 });
      }
    });
  }


  deleteGiftList(Gift: GiftList) {
    //     this.confirmationService.confirm({
    //         message: 'Are you sure you want to delete ' + Gift.name + '?',
    //         header: 'Confirm',
    //         icon: 'pi pi-exclamation-triangle',
    //         accept: () => {

    //             this.GiftLists = this.GiftLists.filter(val => val.giftId !== Gift.giftId);
    //             this.GiftList = new GiftList;
    //             this.messageService.add({severity:'success', summary: 'Successful', detail: 'GiftList Deleted', life: 3000});
    //         }
    //     });
    // }
    this.GiftListService.delete(Gift.giftId).subscribe((a: any) => {
      if (a) {
        this.GiftListService.setReloadGift()
      }
      this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'deleted', life: 3000 });
    }, (err: any) => {
      console.error('occure error', err)
    })
  }
  reload(g: GiftList) {
    this.GiftList = { ...g };
    this.GiftListDialog = true;
    this.relode()
    //  this.showDialog();

  }
  flag(f:number){
      if(f==1)
      this.relode();
      f=0;
  }

  // showDialog() {
  //   this.confirmationService.confirm({
  //     header: 'Confirmation',
  //     message: 'Do you want to proceed?',
  //     accept: () => {
  //       // קוד לפני סגירת הדיאלוג (אם יש צורך)
  //       console.log('Dialog closed with acceptance');
  //     },
  //     reject: () => {
  //       console.log('Dialog closed with rejection');
  //     },
  //     // onHide: () => {
  //     //   // קוד שירץ לאחר סגירת הדיאלוג
  //     //   this.relode();
  //     // }
  //   });

  //   window.location.reload()
  // onUpload(files) {
  //     this.GiftList.image = files[0];
  // }
  filter(dr: string) {

    if (dr == "") {
      this.GiftListService.reloadGift$.subscribe((x: any) => {
        this.GiftListService.getGift().subscribe(data => {
          this.GiftLists = data
          console.log(this.GiftLists);
        },
          (err: any) => {
            console.error('occure error', err)
          })
      })
    }

    this.GiftListService.filterDonor(dr).subscribe((d: any) =>//by donor
    {
      if (d != null) {
        this.GiftLists = [];
        this.GiftLists = d;
      }
    }, (err: any) => {
      console.error('occure error', err)
    })
    this.GiftListService.filterCategory(dr).subscribe((a: any) => {//by category
      if (a != null) {
        this.GiftLists = [];
        this.GiftLists = a;
      }
    }, (err: any) => {
      console.error('occure error', err)
    })
    this.GiftListService.filterGIft(dr).subscribe((a: any) => {//by gift
      if (a != null) {
        this.GiftLists = [];
        this.GiftLists[0] = a;
      }
    }, (err: any) => {
      console.error('occure error', err)
    })
    let num = parseInt(dr);
    this.GiftListService.filterOrders(num).subscribe((a: any) => {//by num of orders
      if (a != null) {
        this.GiftLists = [];
        this.GiftLists = a;
      }
    }, (err: any) => {
      console.error('occure error', err)
    }) 
  }
  filterBuyTheBest() {
    this.GiftListService.filterBuyTheBest().subscribe((a: any) => {
      if (a != null) {
        this.GiftLists = [];
        this.GiftLists = a;
      }
    },
      (err: any) => {
        console.error('occure error', err)
      })
  }
  allMony() {
    this.GiftListService.Allmomy().subscribe((a: any) => {
      this.mony = a;
      console.log(this.mony);
      alert("all the mony: " + this.mony);
    }, (err: any) => {
      console.error('occure error', err)
    });
  }
  raffle(gift: number): void {
    this.GiftListService.raffle(gift).subscribe(
      (response: any) => {
        console.log(response.res);
        if (response.res != null) {
          if (response.res != 'raffled' && response.res != 'not exist' && response.res != 'not  in the orders') {
            this.winner = response.res
            this.GiftListDialog2 = true;
          }
          else
            alert(response.res);
        } else {
          console.log('not found');
        }
      },
      (error: any) => {
        console.error('Error occurred:', error);
        alert('error');
      }
    );
  }

  OrderDetailes() {
    this.route.navigate(['OrderDetailes'])
  }
  ordersGift(id: number) {
    this.route.navigate(['Order'], { queryParams: { id: id } });
  }


  relode() {
    this.GiftListService.reloadGift$.subscribe((x: any) => {
      this.GiftListService.getGift().subscribe(data => {
        this.GiftLists = data
        console.log(this.GiftLists);
      })
    },
      (err: any) => {
        console.error('occure error', err)
      })
  }
  

  yourOtherComponentFunction() {
    this.relode();
  }
}