import { Category } from "./category.model";

export interface Product {
    id: number;
    images: string[];
    title: string;
    price: number;
    creationAt: string;
    category: Category
}