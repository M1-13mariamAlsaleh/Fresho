import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from 'src/app/product.service';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss']
})
export class AdminProductsComponent implements OnInit, OnDestroy {

  products : Product[];
  filteredProducts : Product[];
  subscription : Subscription;

  constructor(private productService : ProductService) { 
    this.products = this.filteredProducts = [];
    this.subscription = this.productService.getAll()
    .subscribe(products => {
      this.filteredProducts = this.products = products;
    });
  }

  filter(query : string) {
    this.filteredProducts = (query) ? 
      this.products.filter(prod => prod.name.toLowerCase().includes(query.toLowerCase())) : 
      this.products;
  }
  
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  
  ngOnInit(): void {
  }

}
