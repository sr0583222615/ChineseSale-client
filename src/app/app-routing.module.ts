import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListGiftComponent } from './list-gift/list-gift.component';
import { MenuComponent } from './menu/menu.component';
import { PayComponent } from './pay/pay.component';
import { BuyComponent } from './buy/buy.component';
import { DonorManagmentComponent } from './donor-managment/donor-managment.component';
import { cardComponent } from './card/card.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { WinnerComponent } from './winner/winner.component';
import { OrderComponent } from './order/order.component';
import { OrderDetailesComponent } from './order-detailes/order-detailes.component';

const routes: Routes = [
  {path:'', redirectTo:'ListGiftComponent', pathMatch:'full'},
  {path:'list-gift',component:ListGiftComponent},
  {path:'',component:MenuComponent},
  {path:'pay',component:PayComponent},
  {path:'shop',component:BuyComponent},
  {path:'donor-managment',component:DonorManagmentComponent}, 
   {path:'card',component:cardComponent},
  //  {path:'',component:LoginComponent},
   {path:'login',component:LoginComponent},
   {path:'register',component:RegisterComponent},
   {path:'Winner',component:WinnerComponent},
   {path:'Order',component:OrderComponent},
   {path:'OrderDetailes',component:OrderDetailesComponent},

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
