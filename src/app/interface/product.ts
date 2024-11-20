import { Category } from "./category"
import { Review } from "./review"
import { Color } from "./color"

export interface AdditionalImage {
  images: string;
}

export interface Product {
  id: number;
  name: string;
  image: string; 
  additionalImages: AdditionalImage[];
  price: number;
  detail: string;
  description: string;
  discount: number;
  category_id: number;
  color_id: number;
  color: Color;
  category: Category;
  reviews_count: number;
  average_rating: number;
  reviews: Review[];
}
