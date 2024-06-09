import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit{
  title = 'project';

  items: MenuItem[] | undefined;

  activeItem: MenuItem| undefined;
  constructor(private router:Router){}
  ngOnInit() {
      this.items = [
        { label: 'login', icon: 'pi pi-verified' },
          { label: '', icon: 'pi pi-fw pi-home'},
          { label: 'shop', icon: 'pi pi-fw pi-chart' },
          { label: 'donor-managment', icon: 'pi pi-users' },
          { label: 'card', icon: 'pi pi-fw pi-cog' },
          { label: 'list-gift', icon: 'pi pi-gift' },
          {label:'Winner',icon:'pi pi-thumbs-up'}
      ];

      this.activeItem = this.items[0];
  }
  changeRoute(item: any) {
    let route = item.label;
    this.router.navigate(['/' + route + '/']);
}
today = new Date();
  }

