import {Injectable} from '@angular/core';
import {ProductType} from "../../../types/product.type";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products: ProductType[] = [];

  constructor(private http: HttpClient) {
  }

  getProducts(): Observable<ProductType[]> {
    return this.http.get<ProductType[]>(environment.apiURL + 'tea');
  }

  getProduct(id: number): Observable<ProductType> {
    return this.http.get<ProductType>(environment.apiURL + `tea?id=${id}`);
  }

  createOrder(data: {
    name: string | null | undefined,
    last_name: string | null | undefined,
    phone: string | null | undefined,
    country: string | null | undefined,
    zip: string | null | undefined,
    product: string | null | undefined,
    address: string | null | undefined,
    comment: string | null | undefined
  }) {
    return this.http.post<{ success: boolean, message?: string }>(environment.apiURL + `order-tea`, data);
  }
}
