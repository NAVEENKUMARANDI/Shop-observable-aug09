import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  productList;

  constructor(private productService: ProductService) {
    // Directly by calling getShippingPrices
    // this.shippingCosts = this.cartService.getShippingPrices();

    // this.productService.productList calls getProductList() method to get observable 
    // Subscibe method get updated productList from observer

    // Subscribe to the readonly shippingCosts of the CartService.
    this.productService.productList.subscribe(updatedProductList => {
      // Assign updated product list to product list object 
      this.productList = updatedProductList;
    });
  }

  ngOnInit() {
    this.productService.getProductData();
  }

}
