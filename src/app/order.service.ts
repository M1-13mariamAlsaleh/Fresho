import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { ShoppingCartService } from './shopping-cart.service';
import { map } from 'rxjs/operators';
import { Order } from './models/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private database : AngularFireDatabase, private cartService : ShoppingCartService) { }

  async placeOrder(order) {
    let result = await this.database.list('/orders').push(order);
    this.cartService.clearCart();
    return result;
  }

  getOrders() {
    return this.database.list('/orders').snapshotChanges()
    .pipe(map(orders => orders.map(order => {
        const key = order.payload.key;
        const data = order.payload.val() as any;
        return {key, ...data} as Order;
      }))
    );
  }

  getOrdersByUser(userId : string) {
    console.log(userId);
    return this.database.list('/orders', ref => ref.orderByChild('userId').equalTo(userId)).snapshotChanges()
    .pipe(map(orders => orders.map(order => {
        const key = order.payload.key;
        const data = order.payload.val() as any;
        return {key, ...data} as Order;
      }))
    );
  }
}
