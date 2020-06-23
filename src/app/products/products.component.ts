import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../product.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../models/product';
import { switchMap } from 'rxjs/operators';
import { ShoppingCartService } from '../shopping-cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy{

  products : Product[] = [];
  filteredProducts : Product[] = [];
  currentCategory : string;
  cart: any;
  subscription: Subscription;

  constructor(
      route : ActivatedRoute,
      productService : ProductService,
      private cartService : ShoppingCartService ) { 

    
    productService.getAll().pipe(switchMap(products => {  
      this.products = products;
      return route.queryParamMap;
    }))
    .subscribe(params => {
        this.currentCategory = params.get('category');
        
        this.filteredProducts = (this.currentCategory) ? 
        this.products.filter(prod => prod.category === this.currentCategory) : 
        this.products;
    });
  }

  async ngOnInit() {
    this.subscription = (await this.cartService.getCart()).subscribe(cart => {
      this.cart = cart;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
