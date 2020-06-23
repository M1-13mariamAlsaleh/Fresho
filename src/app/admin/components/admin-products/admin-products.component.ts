import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { ProductService } from 'src/app/shared/services/product.service';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/shared/models/product';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss']
})
export class AdminProductsComponent implements OnInit, OnDestroy {

  products : Product[];
  filteredProducts : Product[];
  subscription : Subscription;

  dataSource: MatTableDataSource<Product>;
  displayedColumns = ['name', 'price', 'edit'];

  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

  constructor(private productService : ProductService) { }

  filter(query : string) {
    /* Basic filtering
    this.filteredProducts = (query) ? 
    this.products.filter(prod => prod.name.toLowerCase().includes(query.toLowerCase())) : 
    this.products;
    */
    this.dataSource.filter = query;
  }
  
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  
  ngOnInit(): void {
    this.products = this.filteredProducts = [];
    this.subscription = this.productService.getAll()
    .subscribe(products => {
      this.dataSource = new MatTableDataSource(products);
      // this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.dataSource.filterPredicate = (
        data: Product,
        filter: string) => 
          data.name.toLowerCase().includes(filter.trim().toLowerCase());
    });
  }

}
