import {Injectable, signal, WritableSignal} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import { Product, SendDataProduct} from "../interfaces/product";

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  api = 'http://localhost:3100/product'

  cardSignal:WritableSignal<boolean> = signal(false)

  constructor(
    private _http: HttpClient,
  ) { }

  //product

  public getProduct(): Observable<Product[]> {
    return this._http.get<Product[]>(this.api)
  }

  public getProductById(id: any): Observable<any> {
    return this._http.get<any>(this.api+ '/' + id)
  }

  public updateProduct(id: any, data: any): Observable<any> {
    return this._http.put<any>(this.api + '/' + id, data)
  }

  public saveProduct(data: { img: any; valor: any; nombre: any; detalle: any }): Observable<any> {
    return this._http.post<any>(this.api+ '/' , data)
  }

  public deleteProduct(id: any): Observable<boolean> {
    return this._http.delete<boolean>(this.api+ '/' + id)
  }

}
