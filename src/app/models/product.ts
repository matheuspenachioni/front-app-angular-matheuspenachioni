import { Category } from "./category";

export interface Product {
    id?: any;
    name: string;
    price: any;
    amount: any;
    categories: Category[];
}