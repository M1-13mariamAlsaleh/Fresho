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

  // Create a new cart and push to Firebase
  private create() {
    return this.database.list('/carts').push({
      dateCreated : new Date().getTime()
    });
  }

  // Fetch cart from Firebase
  async getCart() : Promise<Observable<Cart>> {
    let cartId = await this.getOrCreateCartId();
    let cart = this.database.object('/carts/' + cartId).snapshotChanges().pipe(map(obj => {
      const key = obj.key;
      const items = (obj.payload.val() as any).items;
      return new Cart(key, items);
    }));
    return cart;
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

  async addToCart(product : Product) {
   this.updateItemQuantity(product, 1);
  }

  async removeFromCart(product: Product) {
    this.updateItemQuantity(product, -1);
  }

  private async updateItemQuantity(product : Product, change : number) {
    let cartId = await this.getOrCreateCartId();
    let item$ = this.getItem(cartId, product.key);
    item$.snapshotChanges().pipe(take(1)).subscribe(item => {
      item$.update({ product : product, quantity : ((item.payload.val() as any)?.quantity || 0) + change })
    });
  }
}
