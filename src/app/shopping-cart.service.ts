import { Injectable } from '@angular/core';
import { AngularFireDatabase, SnapshotAction, AngularFireObject } from '@angular/fire/database';
import { Product } from './models/product';
import { take, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Cart } from './models/cart';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private database : AngularFireDatabase) { }

  // Fetch cart from Firebase
  async getCart() : Promise<Observable<Cart>> {
    let cartId = await this.getOrCreateCartId();
    let cart = this.database.object('/carts/' + cartId).snapshotChanges().pipe(map(obj => {
      const key = obj.key;
      const items = (obj.payload.val() as any).items;
      return new Cart(key, {...items});
    }));
    return cart;
  }

  async addToCart(product : Product) {
    this.updateItem(product, 1);
  }

  async removeFromCart(product: Product) {
    this.updateItem(product, -1);
  }

  async clearCart() {
    let cartId = await this.getOrCreateCartId();
    this.database.object('/carts/' + cartId + '/items').remove();
  }


  // Create a new cart and push to Firebase
  private create() {
    return this.database.list('/carts').push({
      dateCreated : new Date().getTime()
    });
  }

  private async getOrCreateCartId() : Promise<string> {
    let cartId = localStorage.getItem('cartId');
    if(cartId) return cartId;
    
    let result = await this.create();
    localStorage.setItem('cartId', result.key);
    return result.key;    
  }

  private getItem(cartId : string, productId : string) {
    return this.database.object('/carts/' + cartId + '/items/' + productId);
  }

  private async updateItem(product : Product, change : number) {
    let cartId = await this.getOrCreateCartId();
    let item$ = this.getItem(cartId, product.key);
    item$.snapshotChanges().pipe(take(1)).subscribe(item => {

      let quantity = ((item.payload.val() as any)?.quantity || 0) + change;
      if(quantity == 0) item$.remove();
      else 
      item$.update({ 
        name : product.name,
        imageUrl : product.imageUrl,
        price : product.price, 
        quantity : quantity })
    });
  }
}
