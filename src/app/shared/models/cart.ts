import { CartItem } from './cart-item';
import { Product } from './product';

export class Cart {

    items: CartItem[] = [];
    
    constructor(private key: string, private itemsMap: { [productId : string] : CartItem }) {
        this.itemsMap = itemsMap || {};
        for(let productId in itemsMap) {
            let item = itemsMap[productId];
            this.items.push(new CartItem({ ...item, key : productId })); 
        }
    }

    get totalItemsCount() {
        let count = 0;
        for (const productId in this.items) {
            count += this.items[productId].quantity;
        }
        return count;
    }

    get totalPrice() {
        let total = 0;
        for(let productId in this.items)
            total += this.items[productId].totalPrice;
        return total;
    }

    getQuantity(product : Product) {
        let item = this.itemsMap[product.key];
        return item ? item.quantity : 0;
    }
}