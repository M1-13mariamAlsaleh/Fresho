import { Component, OnInit, Input } from '@angular/core';
import { Cart } from 'shared/models/cart';

@Component({
  selector: 'cart-summary',
  templateUrl: './cart-summary.component.html',
  styleUrls: ['./cart-summary.component.scss']
})
export class CartSummaryComponent {

  @Input('cart') cart : Cart;

  ngOnInit(){
    this.cart = this.cart || {} as Cart;
  }
}
