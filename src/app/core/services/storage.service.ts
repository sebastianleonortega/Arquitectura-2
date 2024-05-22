import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  setItem(key: string, value: any): void {
    this.set(key, value);
  }

  getItem<T>(key: string): T {
    return this.ls.get(key);
  }
}
