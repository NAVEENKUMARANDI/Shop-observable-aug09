import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, BehaviorSubject } from 'rxjs';

import { from } from 'rxjs';

// Using Observable
export interface Product {
    id: string;
    name: string;
    price: number;
}

@Injectable({
    providedIn: 'root'
})
export class ProductService {

    // Using Observable - Behavior Subject.
    private _productList = new BehaviorSubject<Product[]>([]);

    // Defining a readonly observable from the behaviorSubject.
    readonly productList = this._productList.asObservable();

    // Node JS server.
    private productUrl = 'http://localhost:9090';

    // DataStore that contains shippingCosts object.
    // Camera man with his camera.
    private dataStore: { productList: Product[] } = { productList: [] };

    constructor(private http: HttpClient) {
        this.getProductData();
    }

    // This is equivalent to recording the drama before broadcasting it on TV.
    getProductData() {
        // Get the data from http client service call. - Marriage medai.
        this.http.get<Product[]>(`${this.productUrl}`).subscribe(data => {
            console.log('getProductData :' + data);

            // data - is the video being recorded.
            // Video camera man recording the video.
            this.dataStore.productList = data;

            // Assigning the values from datastore to the observable.
            // Video gets transmitted to the TV in the hall outside.
            this._productList.next(Object.assign({}, this.dataStore).productList);
        }, error => console.log('Could not load todos.'));
    }

    // shipping-component.ts
    // this.cartService.shippingCosts - will get observable by calling the method below.
    // this.cartService.shippingCosts.subscribe - receives data from the observable.
    getProductList() {
        return this._productList.asObservable;
    }

}