import {Component, OnInit} from '@angular/core';
import {Product} from "../../interfaces/product";
import {HomeService} from "../../service/home.service";
import {DatePipe, NgForOf} from "@angular/common";

@Component({
  selector: 'app-administration',
  standalone: true,
  imports: [
    NgForOf,
    DatePipe
  ],
  templateUrl: './administration.component.html',
  styleUrl: './administration.component.scss'
})
export class AdministrationComponent implements OnInit{
  products: Product[] = [];

  constructor(
    private  _home: HomeService,
  ) {
  }
  ngOnInit() {
    this.getProduct();
  }


  getProduct() {
    this._home.getProduct().subscribe({
      next: (data) => {
        this.products = data;
        console.log(data)
        data.forEach(
          (item: any) => {
            if (item.images[0].startsWith('["')) {
              item.images = JSON.parse(item.images);
            }
          }
        )
      }
    })
  }


}
