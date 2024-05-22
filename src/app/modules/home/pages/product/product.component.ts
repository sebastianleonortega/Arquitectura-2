import {Component, Inject, Input, OnInit, signal, WritableSignal} from '@angular/core';
import {HomeService} from "../../service/home.service";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {NgForOf, NgIf, NgOptimizedImage, TitleCasePipe} from "@angular/common";
import {EditProductComponent} from "../edit-product/edit-product.component";
import {Product} from "../../interfaces/product";
import {MAT_DIALOG_DATA, MatDialogModule} from "@angular/material/dialog";

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    NgForOf,
    EditProductComponent,
    NgOptimizedImage,
    RouterLink,
    TitleCasePipe,
    MatDialogModule,
    NgIf
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent implements OnInit{

  product?: Product ;
  productId: string | any = '' ;
  parsedImages: string[] = [];
  carouselData: any = [];
  currentIndex: number = 0;

  constructor(
    private _home: HomeService,
    private _route: ActivatedRoute,
    private _router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.productId = data;
    console.log(this.productId)
  }

  ngOnInit() {
    this.startAutoPlay();
    this.getProductById(this.productId);
    this.carouselData = [
      { id: 1, image: 'https://wallpapers-clan.com/wp-content/uploads/2023/11/call-of-duty-warrior-with-weapon-red-desktop-wallpaper-preview.jpg' },
      { id: 2, image: 'https://wallpapercrafter.com/desktop4/1151951-video-games-Ubisoft-collage-1080P.jpg' },
      { id: 3, image: 'https://static.techspot.com/images2/news/bigimage/2020/12/2020-12-14-image-17.jpg' },
      { id: 4, image: 'https://img2.wallspic.com/crops/5/4/2/1/41245/41245-extincion-juego_de_pc-2048x1079.jpg' },
    ]
    console.log(this.carouselData)
  }

  getProductById(id : any){
    this._home.getProductById(id).subscribe({
      next: (data) => {
        this.parsedImages =  data.images;

        if (data.images[0].startsWith('["')) {
         this.parsedImages = JSON.parse(data.images);
        }
        this.product = data;
        this.parsedImages =  JSON.parse(data.images);
      }
    })
  }

  deleteProduct(){
    this._home.deleteProduct(this.productId).subscribe({
      next: () => {
        this._router.navigateByUrl('/home').then();
      }
    })
  }

  prevItem(): void {
    this.currentIndex = (this.currentIndex === 0) ? this.carouselData.length - 1 : this.currentIndex - 1;
  }
  nextItem(): void {
    console.log(this.currentIndex)
    this.currentIndex = (this.currentIndex === this.carouselData.length - 1) ? 0 : this.currentIndex + 1;
  }
  startAutoPlay(): void{
    setInterval(() => {
      this.nextItem();
    }, 8000); // 8000 milisegundos = 8 segundos
  }

}
