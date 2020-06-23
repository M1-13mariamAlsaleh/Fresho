import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { firebase } from '@firebase/app';
import '@firebase/auth';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from 'shared/models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private database : AngularFireDatabase) { }

  create(product) {
    return this.database.list('/products').push(product); //Returns a promise
  }

  getAll() {
    return this.database.list('/products').snapshotChanges()
    .pipe(
      map(products => products.map(product => {
        const key = product.payload.key;
        const data = product.payload.val() as any;
        return {key, ...data} as Product;
      }))
    );
  }

  get(productId) {
    return this.database.object('/products/' + productId).valueChanges();
  }

  update(productId, product) {
    return this.database.object('/products/' + productId).update(product);
  }

  delete(productId){
    this.database.object('/products/' + productId)
    .remove().then(() => {
      console.log("Deleted");
    }).catch(err => {
      console.log("Delete error");
    });
  }
}
