import { date } from 'ngx-custom-validators/src/app/date/validator';
import { Cart } from './cart';

export class Order {
    datePlaced : number;
    items: any[];

    constructor(public userId : string, public shipping, cart : Cart) {
        this.datePlaced = new Date().getTime();
        this.items = cart.items.map(item => {
            return {
                product : {
                    name : item.name,
                    imageUrl : item.imageUrl,
                    price : item.price
                },
                quantity : item.quantity,
                totalPrice : item.totalPrice
            }
        });
    }
}