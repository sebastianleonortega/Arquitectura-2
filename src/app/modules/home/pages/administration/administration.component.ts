import {Component, OnInit} from '@angular/core';
import {Product} from "../../interfaces/product";
import {HomeService} from "../../service/home.service";
import {DatePipe, NgForOf} from "@angular/common";
import {NgxPaginationModule} from "ngx-pagination";
import {MatDialog} from "@angular/material/dialog";
import {AlertService} from "../../../../core/services/alert.service";
import {EditProductComponent} from "../edit-product/edit-product.component";
import {LoadingService} from "../../../../core/services/loading.service";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-administration',
  standalone: true,
  imports: [
    NgForOf,
    DatePipe,
    NgxPaginationModule,
    RouterLink
  ],
  templateUrl: './administration.component.html',
  styleUrl: './administration.component.scss'
})
export class AdministrationComponent implements OnInit {
  products: Product[] = [];
  page: number = 1;

  constructor(
    private _home: HomeService,
    private _dialog: MatDialog,
    private _alert: AlertService,
    private _loader: LoadingService,
  ) {
  }

  ngOnInit() {
    this.getProduct();
  }


  addProduct() {
    const dialogRef = this._dialog.open(EditProductComponent, {
      width: "500px",
      height: "524px",
    })

    dialogRef.afterClosed().subscribe({
      next: () => {
        this.getProduct();
      }
    })
  }

  editProduct(id: any) {
    console.log(id)
    const dialogRef = this._dialog.open(EditProductComponent, {
      width: "500px",
      height: "524px",
      data: id
    })

    dialogRef.afterClosed().subscribe({
      next: () => {
        this.getProduct();
      }
    })

  }

  deleteProduct(id: any) {
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


      }
    })
  }


}
