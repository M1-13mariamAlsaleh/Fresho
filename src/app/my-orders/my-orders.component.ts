import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { OrderService } from '../order.service';
import { Order } from '../models/order';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss']
})
export class MyOrdersComponent implements OnInit {

  orders : Order[] = [];
  userId : string;

  constructor(private authService : AuthService, private orderService : OrderService) { }

  ngOnInit() {
    this.authService.user$.pipe(switchMap(user => 
      this.orderService.getOrdersByUser(user.uid)))
    .subscribe(orders => this.orders = orders);
  }
}
