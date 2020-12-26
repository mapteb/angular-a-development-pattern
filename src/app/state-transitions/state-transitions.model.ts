import { Product } from '../product/product.model';
import { User } from './user.model';

export class AppData {
    user: User = new User();
    products: Product[] = [];
    cartProducts: Product[] = [];
    product: Product = new Product();
}

export class StateTransitionData {
    user: User;
    productId: number;
    product: Product;
    initState: string;
    finalState: string;
    preEvent: string;
    postEvent: string;
}
