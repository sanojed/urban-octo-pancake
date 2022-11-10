import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Inventory } from './inventory.model';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  endUrl: string = "http://localhost:5000/Inventory";

  constructor(private http: HttpClient) { }

  get(): Observable<any> {
    return this.http.get(this.endUrl);
  }

  post(inventory: Inventory): Observable<any> {
    return this.http.post(this.endUrl, inventory);
  }

  put(inventory: Inventory): Observable<any> {
    return this.http.put(this.endUrl, inventory);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.endUrl}/${id}`);
  }

}
