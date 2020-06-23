import { Product } from './product';

export class CartItem {
    key : string;
    name : string;
    imageUrl : string;
    price : number;
    quantity : number;

    constructor(init?: Partial<CartItem>) {
        Object.assign(this, init);
    }

    get totalPrice() {
        return this.price * this.quantity;
    }
}