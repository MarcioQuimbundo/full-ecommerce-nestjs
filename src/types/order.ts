import { Document } from 'mongoose';
import { Product } from './product';
import { User } from './user';

interface ProductOrder {
    product: Product;
    quantity: number
}

export interface Order extends Document {
  owner: User;
  totalPrice: number;
  products: ProductOrder[];
  created: Date;
}
