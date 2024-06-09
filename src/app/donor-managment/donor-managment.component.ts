import { Component, OnInit } from '@angular/core';
import { Donors } from './Donors.module';
import { DonorsService } from '../service/Donors.service';
import { GiftList } from '../list-gift/giftList.module';

@Component({
  selector: 'app-donor-managment',
  templateUrl: './donor-managment.component.html',
  styleUrls: ['./donor-managment.component.css']
})
export class DonorManagmentComponent implements OnInit {
  DonorsDialog: boolean;
  Donorss: Donors[];
  Donorss2: Donors[];
  Donors: Donors;
  submitted: boolean;
  add: boolean;
  gift: GiftList;
  selectedDonors: boolean;
  types: any[];
  inputValue: string = '';

  constructor(private DonorsService: DonorsService) { }

  ngOnInit(): void {
    this.types = [
      { label: 'mony', value: 'mony' },
      { label: 'gift', value: 'gift' },

    ];
    this.DonorsService.reloadDonors$.subscribe((a:any) => {
      this.DonorsService.getD().subscribe(a => {
        this.Donorss = a;})
    },
    (err:any)=>{
      console.error('occure error',err)
    })
  }
  saveDonors() {
    if (this.Donors.donorFullName.trim()) {   //עדכון   
      if (this.add == false) {
        this.DonorsService.updateGift(this.Donors).subscribe((donor:any) => {
          this.relod();
        },(err:any)=>{
          console.error('occure error',err)
          alert(" there is a problem, it isn't update , sory...")
        } )
      }
      else {
        this.DonorsService.addGDonors(this.Donors).subscribe(b => {//הוספה
          this.relod();
        },
          (err:any)=>{
          alert("there is aproblem ,the donor's ditails dosent update,sory")
        })
      }
      this.Donorss = [...this.Donorss];
      this.DonorsDialog = false;
      this.Donors = new Donors;
      
    }
  }
  openNew() {
    this.Donors = new Donors();
    this.submitted = false;
    this.DonorsDialog = true;

  }
  hideDialog() {
    this.DonorsDialog = false;
    this.submitted = false;
    this.add = true;
  }
  delete(id: string) {
    this.DonorsService.delete(id).subscribe((a:any) => {
      this.relod();
    },(err:any)=>{
      console.error('occure error',err)
    })


  }
  editGift(d: Donors) {
    this.add = false;
    this.Donors = { ...d };
    this.DonorsDialog = true;

  }
  filterByGift(value: string) {
    if (value == "")
      this.DonorsService.reloadDonors$.subscribe((a:any) => {
        this.DonorsService.getD().subscribe(a => {
          this.Donorss = a
          console.log(this.Donorss);
 })   },
 (err:any)=>{
  console.error('occure error',err)
  this.relod()
})
 else
      this.DonorsService.detByFilter(value).subscribe(a => {
      if (a != null) {
        this.Donorss = [];
         this.Donorss[0] = a;
        console.log(this.Donorss);

      }   
       else 
       this.DonorsService.fillterByGift(value).subscribe(a=>{
        this.Donorss = [];
        this.Donorss = a; 
      })
    })
        this.relod()
  }
  relod(){
    this.DonorsService.reloadDonors$.subscribe((a:any) => {
      this.DonorsService.getD().subscribe(a => {
        this.Donorss = a;})
    },(err:any)=>{ console.error('occure error',err) })
  }
}