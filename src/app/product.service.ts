import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://rest-items.research.cloudonix.io/items';

  constructor(private http: HttpClient) {}

  getProducts(authKey: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${authKey}`
    });
    return this.http.get<any>(this.apiUrl, { headers });
  }

  createProduct(product: any, authKey: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${authKey}`,
      'Content-Type': 'application/json'
    });
    return this.http.post<any>(this.apiUrl, product, { headers });
  }

  updateProduct(id: number, product: any, authKey: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${authKey}`,
      'Content-Type': 'application/json'
    });
    return this.http.patch<any>(`${this.apiUrl}/${id}`, product, { headers });
  }

  deleteProduct(id: number, authKey: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${authKey}`
    });
    return this.http.delete<any>(`${this.apiUrl}/${id}`, { headers });
  }
}
