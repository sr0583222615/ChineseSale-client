import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChange, SimpleChanges } from '@angular/core';
import { GiftList } from '../list-gift/giftList.module';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { uniqueValidator } from '../infrastructure/validators/uniqueValidatore';
import { GiftService } from '../service/gift.service';
import { Confirmation, MessageService } from 'primeng/api';
import { User } from '../Models/User.model';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.css']

})
export class AddEditComponent implements OnInit {
  constructor(private GiftListService: GiftService, private messageService: MessageService) { }

  giftCatagory: any[]
  @Input()
  GiftList: GiftList
  @Output()
  GiftListChange: EventEmitter<GiftList> = new EventEmitter<GiftList>()
  @Input()
  submitted: boolean
  @Output()
  submittedChange: EventEmitter<boolean> = new EventEmitter<boolean>()
  @Input()
  GiftListDialog: boolean
  @Output()
  GiftListDialogChange: EventEmitter<boolean> = new EventEmitter<boolean>()
  @Input()
  GiftLists: GiftList[]
  @Output()
  GiftListsChange: EventEmitter<GiftList[]> = new EventEmitter<GiftList[]>
  listOfDonors: string[]


@Output()
flag1:EventEmitter<number>=new EventEmitter<number>()


  ngOnInit(): void {
    this.GiftListChange.emit(this.GiftList)
    this.GiftListDialogChange.emit(this.GiftListDialog)
    this.submittedChange.emit(this.submitted)

    this.giftCatagory = [
      { label: 'Electronics', value: 'Electronics' },
      { label: 'Accessories', value: 'Accessories' },
      { label: 'different', value: 'different' }
    ];

  }
  // frm: FormGroup = new FormGroup({
  //   giftId:new FormControl('',[Validators.required]),
  //   giftName:new FormControl('',[Validators.required,uniqueValidator(this.GiftListService)]),
  //   // giftName:new FormControl('',[Validators.required]),

  //    giftTicketCost:new FormControl('',[Validators.required]),
  //    giftUrlImage:new FormControl('',[]),
  //    giftCatagory:new FormControl('',[Validators.required]),
  //   giftDiscription:new FormControl('',[]),
  //    status:new FormControl('',[Validators.required]),
  //    donorToGift:new FormControl('',[Validators.required])

  // });
 
  saveGiftList() {
    this.GiftList.status = "chart";
    this.submitted = true;
    if (this.GiftList.giftName.trim()) {
      if (this.GiftList.giftId) {
        this.GiftListService.updateGift(this.GiftList)
          .subscribe((id:number) => {
            this.relode();
        this.GiftLists[this.findIndexById(this.GiftList.giftId)] = this.GiftList;  
      },(err:any)=>{ console.error('occure error',err) })
      }
      else {
        let concatenatedString = "";
        for (let i = 0; i < this.GiftList.donorToGift.length; i++) {//המרה לתוך סטרינג
          concatenatedString += this.GiftList.donorToGift[i];
        }
        var a = concatenatedString.split(",")//המרה חזרה לתוך מערך ללא הפסיק
        this.GiftList.donorToGift = a;
        this.GiftListService.addGift(this.GiftList).subscribe(b => {
          this.relode();
        },
        (err:any)=>{
          alert("there is a problem, try again...")
          console.log("dosent added");
          
        }
        )
      }
  this.GiftListService.setReloadGift();
         this.GiftListService.getGift().subscribe((list:any) => {
          this.GiftLists = list;
          this.GiftListDialogChange.emit(this.GiftListDialog);
        },(err:any)=>{ console.error('occure error',err) })

      this.GiftLists = [...this.GiftLists];
      this.GiftListDialog = false;
     this.GiftList = new GiftList;
      this.flag1.emit(1)
      this.GiftListDialogChange.emit(this.GiftListDialog);


    
  }}
  hideDialog() {
    this.GiftListDialog = false;
    this.submitted = false;
  }
  editGift(g: GiftList) {
    debugger;
    this.GiftList = { ...g };
    this.GiftListDialog = true;
  }
  findIndexById(id: number): number {
    let index = -1;
    for (let i = 0; i < this.GiftLists.length; i++) {
      if (this.GiftLists[i].giftId === id) {
        index = i;
        break;
      }
    }

    return index;
  }
  change: SimpleChanges
  copyGift: GiftList
  // ngOnChanges(changes: SimpleChanges): void {
  //   this.change = changes;
  //   this.copyGift = Object.assign(this.copyGift, this.GiftList);
  // } 
  openNew() {
    this.GiftList = new GiftList();
    this.submitted = false;
    this.GiftListDialog = true;
  }



relode(){
  this.GiftListService.reloadGift$.subscribe((aa:any)=>{
    this.GiftListService.getGift().subscribe(a=>{
      console.log(a);
      this.GiftLists=a;})
    },(err:any)=>{ console.log("there is a problem of reloding");
    alert("there is a problem of reloding");})
  
}

}
