import {Component, OnInit} from '@angular/core';
import {Product} from "../../interfaces/product";
import {HomeService} from "../../service/home.service";
import {DatePipe, NgForOf} from "@angular/common";
import {NgxPaginationModule} from "ngx-pagination";
import {MatDialog} from "@angular/material/dialog";
import {AlertService} from "../../../../core/services/alert.service";
import {EditProductComponent} from "../edit-product/edit-product.component";

@Component({
  selector: 'app-administration',
  standalone: true,
  imports: [
    NgForOf,
    DatePipe,
    NgxPaginationModule
  ],
  templateUrl: './administration.component.html',
  styleUrl: './administration.component.scss'
})
export class AdministrationComponent implements OnInit{
  products: Product[] = [];
  page: number = 1;

  constructor(
    private  _home: HomeService,
    private _dialog: MatDialog,
    private _alert: AlertService,
  ) {
  }
  ngOnInit() {
    this.getProduct();
  }

  editProduct(id: number ){
    this._dialog.open(EditProductComponent, {
      width: "500px",
      height: "500px",
      data: id
    })

  }

  deleteProduct(id: number){
    this._home.deleteProduct(id).subscribe({
      next: () => {
        this._alert.success("producto Eliminado")
        this.getProduct();
      }
    })
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
