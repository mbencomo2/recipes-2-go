import { unstable_noStore } from 'next/cache';
import clientPromise from './mongodb';
import { Ingredient, Recipe, ShoppingList } from './definitions';
import { z } from 'zod';
import { ObjectId } from 'mongodb';
import { notFound } from 'next/navigation';
import { sumDuplicateIngredients } from './utils';

export const fetchRecipeCount = async (id: string) => {
  unstable_noStore();
  try {
    const mongoClient = await clientPromise;
    const db = mongoClient.db(process.env.DB_NAME);
    const result = await db
      .collection('recipes')
      .aggregate([
        {
          $match: {
            userId: id,
          },
        },
        {
          $count: 'count',
        },
      ])
      .toArray();
    if (!result[0].count) return 0;
    return result[0].count as number;
  } catch (error) {
    console.log('Server error: ', error);
    return 0;
  }
};

export const fetchRecipes = async (userId: string) => {
  unstable_noStore();
  try {
    const mongoClient = await clientPromise;
    const db = mongoClient.db(process.env.DB_NAME);
    const result = await db
      .collection('recipes')
      .aggregate([
        {
          $match: {
            userId: userId,
          },
        },
        {
          $project: {
            id: { $toString: '$_id' },
            name: '$name',
          },
        },
        {
          $sort: {
            name: 1,
          },
        },
        {
          $unset: ['_id'],
        },
      ])
      .toArray();

    return result as Recipe[];
  } catch (error) {
    console.log('Server Error: ', error);
    return [];
  }
};

export const fetchFavorites = async (id: string) => {
  unstable_noStore();
  try {
    const mongoClient = await clientPromise;
    const db = mongoClient.db(process.env.DB_NAME);
    const result = (await db
      .collection('recipes')
      .aggregate([
        {
          $match: {
            userId: id,
          },
        },
        {
          $match: {
            favorite: true,
          },
        },
        {
          $sort: {
            dateAdded: -1,
          },
        },
      ])
      .toArray()) as Recipe[];
    return result;
  } catch (error) {
    console.log('Server Error: ', error);
    return [];
  }
};

export const fetchFavoritesOverview = async (id: string) => {
  unstable_noStore();
  try {
    const mongoClient = await clientPromise;
    const db = mongoClient.db(process.env.DB_NAME);
    const result = (await db
      .collection('recipes')
      .aggregate([
        {
          $match: {
            userId: id,
          },
        },
        {
          $match: {
            favorite: true,
          },
        },
        {
          $sort: {
            dateAdded: -1,
          },
        },
        {
          $limit: 6,
        },
      ])
      .toArray()) as Recipe[];
    return result;
  } catch (error) {
    console.log('Server Error: ', error);
    return [];
  }
};

export const fetchFavoritesCount = async (id: string) => {
  unstable_noStore();
  try {
    const mongoClient = await clientPromise;
    const db = mongoClient.db(process.env.DB_NAME);
    const result = await db
      .collection('recipes')
      .aggregate([
        {
          $match: {
            userId: id,
          },
        },
        {
          $match: {
            favorite: true,
          },
        },
        {
          $count: 'count',
        },
      ])
      .toArray();
    if (!result[0]) return 0;
    return result[0].count as number;
  } catch (error) {
    console.log('Server Error: ', error);
    return 0;
  }
};

/**
 * Validate and Sanitize query parameters
 */
const filterSchema = z.object({
  userId: z.string(),
  sortBy: z.string().optional(),
  sort: z.string().optional(),
  ingredient: z.string().optional(),
  cookTime: z.coerce.number().optional(),
  favorite: z.boolean().optional(),
  rating: z.coerce.number().optional(),
  pageSize: z.coerce.number().optional(),
  page: z.coerce.number().optional(),
});

export const fetchFilteredRecipes = async (
  userId: string,
  query: string,
  currentPage: number,
  favoritesOnly: boolean,
) => {
  unstable_noStore();
  try {
    let matchCriteria: any = {
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { instructions: { $regex: query, $options: 'i' } },
        { 'ingredients.name': { $regex: query, $options: 'i' } },
      ],
    };

    if (Number(query) > 0)
      matchCriteria = { cookTime: { $lte: Number(query) * 60 } };
    if (favoritesOnly) matchCriteria['favorite'] = true;
    const offset = currentPage >= 1 ? (currentPage - 1) * 5 : 0;

    const mongoClient = await clientPromise;
    const db = mongoClient.db(process.env.DB_NAME);
    const result = await db
      .collection('recipes')
      .aggregate([
        {
          $match: {
            userId: userId,
          },
        },
        {
          $match: matchCriteria,
        },
        {
          $sort: { dateAdded: -1 },
        },
        {
          $project: {
            id: { $toString: '$_id' },
            name: '$name',
            cookTime: '$cookTime',
            favorite: '$favorite',
            thumbnail: '$thumbnail',
          },
        },
        {
          $skip: offset,
        },
        {
          $limit: 5,
        },
        {
          $unset: '_id',
        },
      ])
      .toArray();
    return result as Recipe[];
  } catch (error) {
    console.log('Server Error:', error);
    return [];
  }
};

export const fetchFilteredRecipesCount = async (
  userId: string,
  query: string,
  favoritesOnly: boolean,
) => {
  unstable_noStore();
  try {
    let matchCriteria: any = {
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { instructions: { $regex: query, $options: 'i' } },
        { 'ingredients.name': { $regex: query, $options: 'i' } },
      ],
    };
    if (favoritesOnly) matchCriteria['favorite'] = true;

    const mongoClient = await clientPromise;
    const db = mongoClient.db(process.env.DB_NAME);
    const result = await db
      .collection('recipes')
      .aggregate([
        {
          $match: {
            userId: userId,
          },
        },
        {
          $match: matchCriteria,
        },
        {
          $count: 'count',
        },
      ])
      .toArray();

    if (result.length > 0) {
      const totalPages = Math.ceil(Number(result[0].count) / 5);
      return totalPages;
    } else {
      return 1;
    }
  } catch (error) {
    console.log('Server Error:', error);
    return 0;
  }
};

export const fetchRecipeById = async (id: string) => {
  unstable_noStore();
  try {
    const mongoClient = await clientPromise;
    const db = mongoClient.db(process.env.DB_NAME);
    const result = (await db
      .collection('recipes')
      .aggregate([
        {
          $match: { _id: new ObjectId(id) },
        },
        {
          $set: { id: { $toString: '$_id' } },
        },
        {
          $unset: '_id',
        },
      ])
      .toArray()) as Recipe[];
    if (!result[0].id) throw new Error('Recipe not found');
    if (result) return result[0] as Recipe;
  } catch (error) {
    console.log('Server error: ', error);
    notFound();
  }
};

export const fetchShoppingLists = async (userId: string) => {
  unstable_noStore();
  try {
    const mongoClient = await clientPromise;
    const db = mongoClient.db(process.env.DB_NAME);
    const result = (await db
      .collection('shopping-lists')
      .aggregate([
        {
          $match: {
            userId: userId,
          },
        },
        {
          $set: {
            id: { $toString: '$_id' },
          },
        },
        {
          $unset: '_id',
        },
      ])
      .toArray()) as ShoppingList[];
    return result;
  } catch (error) {
    console.log('Server Error: ', error);
    return [];
  }
};

export const fetchFilteredShoppingLists = async (
  userId: string,
  query: string,
  currentPage: number,
) => {
  unstable_noStore();
  try {
    const offset = currentPage >= 1 ? (currentPage - 1) * 5 : 0;

    const mongoClient = await clientPromise;
    const db = mongoClient.db(process.env.DB_NAME);
    const result = (await db
      .collection('shopping-lists')
      .aggregate([
        {
          $match: {
            userId: userId,
          },
        },
        {
          $match: { name: { $regex: query, $options: 'i' } },
        },
        {
          $skip: offset,
        },
        {
          $limit: 5,
        },
        {
          $set: {
            id: { $toString: '$_id' },
          },
        },
        {
          $unset: '_id',
        },
      ])
      .toArray()) as ShoppingList[];

    return result;
  } catch (error) {
    console.log('Server Error:', error);
    return [];
  }
};

export const fetchFilteredShoppingListCount = async (
  userId: string,
  query: string,
) => {
  unstable_noStore();
  try {
    const mongoClient = await clientPromise;
    const db = mongoClient.db(process.env.DB_NAME);
    const result = await db
      .collection('shopping-lists')
      .aggregate([
        {
          $match: {
            userId: userId,
          },
        },
        {
          $match: { name: { $regex: query, $options: 'i' } },
        },
        {
          $count: 'count',
        },
      ])
      .toArray();

    if (result.length > 0) {
      const totalPages = Math.ceil(Number(result[0].count) / 5);
      return totalPages;
    } else {
      return 1;
    }
  } catch (error) {
    console.log('Server Error:', error);
    return 0;
  }
};

export const fetchShoppingListById = async (id: string) => {
  unstable_noStore();
  try {
    const mongoClient = await clientPromise;
    const db = mongoClient.db(process.env.DB_NAME);
    const shoppingList = await db
      .collection('shopping-lists')
      .aggregate([
        {
          $match: { _id: new ObjectId(id) },
        },
        {
          $set: { id: { $toString: '$_id' } },
        },
        {
          $unset: '_id',
        },
      ])
      .toArray();

    if (!shoppingList) throw new Error('Shopping List Not Found');

    const promises = shoppingList[0].recipes.map(async (recipeId: string) => {
      const recipe = (await db.collection('recipes').findOne({
        _id: new ObjectId(recipeId),
      })) as Recipe;
      if (recipe) {
        return {
          ingredients: recipe.ingredients,
          matched_recipe: { id: recipe._id.toString(), name: recipe.name },
        };
      }
      return {
        ingredients: [],
        matched_recipe: { id: '', name: 'This Recipe Was Deleted' },
      };
    });

    const results = await Promise.all(promises);

    const ingredientsArray = results.map((result) => result?.ingredients);
    const matched_recipes = results.map((result) => result?.matched_recipe);

    const summedIngredients = sumDuplicateIngredients(ingredientsArray);
    const completeList = {
      ...shoppingList[0],
      matched_recipes: matched_recipes,
      ingredients: summedIngredients,
    };

    return completeList as ShoppingList;
  } catch (error) {
    console.log('Server error: ', error);
    notFound();
  }
};

// export async function updateDates() {
//   unstable_noStore()
//   try {
//     const mongoClient = await clientPromise;
//     const db = mongoClient.db(process.env.DB_NAME);
//     const collection = db.collection('recipes');
//     const docs = await collection.find({}).toArray();
//     docs.forEach(async (doc) => {

//       await collection.updateOne({ _id: doc._id }, {
//         $set: { dateAdded: new Date(doc.dateAdded).toISOString().split('T')[0] }
//       });
//     });
//   } catch (error) {
//     console.log("Error updating dates")
//   }
// }
