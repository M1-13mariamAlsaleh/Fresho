import { CartItem } from './cart-item';

export class Cart {
    constructor(public key: string, public items: CartItem[]) {}

    get totalItemsCount() {
        let count = 0;
        for (const productId in this.items) {
            count += this.items[productId].quantity;
        }
        return count;
    }
}