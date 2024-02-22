import { Binary, Document, WithId } from 'mongodb';

export interface Recipe extends WithId<Document> {
  id: string;
  userId: string;
  name: string;
  dateAdded: string;
  ingredients: Ingredient[];
  cookTime: number;
  instructions: string;
  servings: number;
  favorite?: boolean;
  rating?: number;
  image: ImageData;
}

export type Ingredient = {
  unit: string;
  amount: number;
  name: string;
};

export type User = {
  id: string;
  email: string;
  name?: string;
  password?: string;
};

export interface ShoppingList extends WithId<Document> {
  id: string;
  userId: string;
  name: string;
  dateAdded: string;
  recipes: string[];
  matched_recipes?: { id: string; name: string }[];
  ingredients: Ingredient[];
}

export type ImageData = {
  type: string;
  data: Binary | string;
};
