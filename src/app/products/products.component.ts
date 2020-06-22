import { Component } from '@angular/core';
import { ProductService } from '../product.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../models/product';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {

  products : Product[] = [];
  filteredProducts : Product[] = [];
  currentCategory : string;

  constructor(
      route : ActivatedRoute,
      productService : ProductService ) { 

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
}
