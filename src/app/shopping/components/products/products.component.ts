import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from 'shared/services/product.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'shared/models/product';
import { switchMap } from 'rxjs/operators';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { Subscription, Observable } from 'rxjs';
import { Cart } from 'shared/models/cart';
import { CartItem } from 'shared/models/cart-item';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  products : Product[] = [];
  filteredProducts : Product[] = [];
  currentCategory : string;
  cart$: Observable<Cart>;

  constructor(
      private route : ActivatedRoute,
      private productService : ProductService,
      private cartService : ShoppingCartService ) { 
  }

  async ngOnInit() {
    this.cart$ = (await this.cartService.getCart());
    this.populateProducts();
  }

  private populateProducts() {
    this.productService.getAll().pipe(switchMap(products => {  
      this.products = products;
      return this.route.queryParamMap;
    }))
    .subscribe(params => {
        this.currentCategory = params.get('category');
        this.applyFilter();
    });
  }

  private applyFilter() {
    this.filteredProducts = (this.currentCategory) ? 
    this.products.filter(prod => prod.category === this.currentCategory) : 
    this.products;
  }
}
