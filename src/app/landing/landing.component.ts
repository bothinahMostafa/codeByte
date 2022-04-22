import { AfterContentChecked, Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit, AfterContentChecked { 

  products: any[] = [];
  added: boolean = false;

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    this.http.get('https://fakestoreapi.com/products').subscribe((res) => {
      (res as Array<any>).forEach(product => {
        let {image, price, title} = product;
        price = Number(price).toFixed(0);
        this.products.push({image, price , title});
      });
    },
    error=> {
    });
  }

  ngAfterContentChecked(): void {
    if(document.getElementsByClassName('cards__item').length > 0 && !this.added){
      [...document.getElementsByClassName('cards__item')].forEach((el: Element)=> {
        el.addEventListener('click', ()=> {
          console.log('clicked');
          el.getElementsByClassName('cards__backoptions')[0]?.classList.toggle('v-none');
        });
      }); 
      this.added = true;
    }     
  }
}
