import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListGiftComponent } from './list-gift/list-gift.component';
import { ModalComponent } from './modal/modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddEditComponent } from './add-edit/add-edit.component';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';
import { DonorManagmentComponent } from './donor-managment/donor-managment.component';
import { BuyComponent } from './buy/buy.component';
import { PayComponent } from './pay/pay.component';
import { HttpClientModule } from '@angular/common/http';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DropdownModule } from 'primeng/dropdown';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RatingModule } from 'primeng/rating';
import { ToolbarModule } from 'primeng/toolbar';
import { ConfirmationService } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { FileUploadModule } from 'primeng/fileupload';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SliderModule } from 'primeng/slider'; 
import { MultiSelectModule } from 'primeng/multiselect'; 
import { ContextMenuModule } from 'primeng/contextmenu'; 
import { ToastModule } from 'primeng/toast'; 
import { ProgressBarModule } from 'primeng/progressbar'; 
import {CardModule} from 'primeng/card';
import { cardComponent } from './card/card.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {PasswordModule} from 'primeng/password';
import { WinnerComponent } from './winner/winner.component';
import { OrderComponent } from './order/order.component';
import { OrderDetailesComponent } from './order-detailes/order-detailes.component';
import { TabMenuModule } from 'primeng/tabmenu';




@NgModule({
  declarations: [
    AppComponent,
    ListGiftComponent,
    ModalComponent,
    HomeComponent,
    AddEditComponent,
    MenuComponent,
    DonorManagmentComponent,
    BuyComponent,
    PayComponent,
    cardComponent,
    LoginComponent,
    RegisterComponent,
    WinnerComponent,
    OrderComponent,
    OrderDetailesComponent,
    
  ],

  
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ButtonModule,
    TableModule,
    RatingModule,
    ToolbarModule,
    DialogModule,
    ConfirmDialogModule,
    BrowserAnimationsModule,
    InputTextModule,
    InputNumberModule,
    InputTextareaModule,
    RadioButtonModule,
    DropdownModule,
    CalendarModule,
    FileUploadModule,
    SliderModule, 
    MultiSelectModule, 
    ContextMenuModule, 
    ToastModule, 
    ProgressBarModule, 
    CardModule  ,
    PasswordModule,
    TableModule,
    TabMenuModule
    
    
         
        
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
