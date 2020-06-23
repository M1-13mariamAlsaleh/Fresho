import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'shared/services/auth.service';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { OrderService } from 'shared/services/order.service';
import { Router } from '@angular/router';
import { Order } from 'shared/models/order';
import { Cart } from 'shared/models/cart';

@Component({
  selector: 'shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.scss']
})
export class ShippingFormComponent implements OnInit, OnDestroy {

  @Input('cart') cart : Cart;
  shipping : any = {}; 
  userId : string;
  userSubscription : Subscription;

  constructor(
    private authService : AuthService,
    private orderService : OrderService,
    private router : Router) { }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  ngOnInit() {
    this.userSubscription = this.authService.user$.subscribe(user => this.userId = user.uid);
  }

  async placeOrder() {
    let order = new Order(this.userId, this.shipping, this.cart);
    let result = await this.orderService.placeOrder(order);
    this.router.navigate(['/success', result.key]);
  } 

}
