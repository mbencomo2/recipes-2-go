'use server';

import { AuthError } from 'next-auth';
import { getUser, signIn, signOut } from '@/auth';
import { revalidatePath, unstable_noStore } from 'next/cache';
import { z } from 'zod';
import sharp from 'sharp';
import clientPromise from './mongodb';
import * as bcrypt from 'bcrypt';
import { notFound, redirect } from 'next/navigation';
import { Binary, ObjectId } from 'mongodb';

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}

const registerSchema = z.object({
  name: z.string(),
  email: z.string().email().toLowerCase(),
  password: z.string().min(8),
});

const editUserSchema = z.object({
  userId: z.string(),
  name: z.string(),
  email: z.string().email().toLowerCase(),
  password: z.string().min(8),
  verify: z.string().min(8),
});

const editPasswordSchema = editUserSchema.omit({ name: true, email: true });
const editNameSchema = editUserSchema.omit({
  email: true,
  password: true,
  verify: true,
});
const editEmailSchema = editUserSchema.omit({
  name: true,
  password: true,
  verify: true,
});

export async function CreateUser(prevState: any, formData: FormData) {
  unstable_noStore();
  try {
    const validatedFields = registerSchema.safeParse({
      name: formData.get('name'),
      email: formData.get('email'),
      password: formData.get('password'),
    });

    if (!validatedFields.success) return 'Invalid email or password.';

    const { name, email, password } = validatedFields.data;
    const emailExists = await getUser(email).then((result) => result?.email);
    if (emailExists) return 'User with Email already exists';

    const hashedPass = await bcrypt.hash(password, 10);
    const user = {
      name: name,
      email: email,
      password: hashedPass,
    };

    const mongoClient = await clientPromise;
    const db = mongoClient.db(process.env.DB_NAME);
    const result = await db.collection('users').insertOne(user);

    if (!result.acknowledged) return 'Something went wrong, try again later';
  } catch (error) {
    console.log('Server error: ', error);
    return 'We encountered a server error, sorry for the inconvenience';
  }

  revalidatePath('/register');
  await signOut({ redirectTo: '/login' });
}

export async function updatePassword(prevState: any, formData: FormData) {
  unstable_noStore();
  try {
    const validatedFields = editPasswordSchema.safeParse({
      userId: formData.get('userId'),
      password: formData.get('password'),
      verify: formData.get('verify'),
    });

    if (!validatedFields.success) return 'Invalid password';

    const { userId, password, verify } = validatedFields.data;
    const passwordsMatch = password !== verify;

    if (passwordsMatch) return "Passwords don't match";
    const hashedPass = await bcrypt.hash(verify, 10);

    const mongoClient = await clientPromise;
    const db = mongoClient.db(process.env.DB_NAME);
    const result = await db
      .collection('users')
      .updateOne(
        { _id: new ObjectId(userId) },
        { $set: { password: hashedPass } },
      );

    if (result.modifiedCount === 0) return 'Could not update password';
  } catch (error) {
    console.log('Server error: ', error);
    return 'Server error, please contact us to get it fixed.';
  }

  revalidatePath('/dashboard/account');
  await signOut({ redirectTo: '/dashboard/account' });
}

export async function updateName(prevState: any, formData: FormData) {
  unstable_noStore();
  try {
    const validatedFields = editNameSchema.safeParse({
      userId: formData.get('userId'),
      name: formData.get('name'),
    });

    if (!validatedFields.success) return 'Enter a valid name';

    const { userId, name } = validatedFields.data;
    if (name === '') return 'Did not enter a name';

    const mongoClient = await clientPromise;
    const db = mongoClient.db(process.env.DB_NAME);
    const result = await db
      .collection('users')
      .updateOne({ _id: new ObjectId(userId) }, { $set: { name: name } });

    if (result.acknowledged && result.modifiedCount === 0)
      return 'Could not update name';
  } catch (error) {
    console.log('Server error: ', error);
    return 'Server error, please contact us to get it fixed.';
  }

  revalidatePath('/dashboard/account');
  redirect('/dashboard/account');
}

export async function updateEmail(prevState: any, formData: FormData) {
  unstable_noStore();
  try {
    const validatedFields = editEmailSchema.safeParse({
      userId: formData.get('userId'),
      email: formData.get('email'),
    });

    if (!validatedFields.success) return 'Enter a valid email';

    const { userId, email } = validatedFields.data;
    const emailExists = await getUser(email).then((result) => result?.email);
    if (emailExists) return 'User with Email already exists';

    const mongoClient = await clientPromise;
    const db = mongoClient.db(process.env.DB_NAME);
    const result = await db
      .collection('users')
      .updateOne({ _id: new ObjectId(userId) }, { $set: { email: email } });

    if (result.modifiedCount === 0) return 'Could not update email';
  } catch (error) {
    console.log('Server error: ', error);
    return 'Server error, please contact us to get it fixed.';
  }

  revalidatePath('/dashboard/account');
  await signOut({ redirectTo: '/login' });
}

export async function deleteAccount(id: string) {
  unstable_noStore();
  try {
    const mongoClient = await clientPromise;
    const db = mongoClient.db(process.env.DB_NAME);
    const result = await db
      .collection('users')
      .deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) return 'Could not delete account';
    await db.collection('recipes').deleteMany({ userId: id });
    await db.collection('shopping-lists').deleteMany({ userId: id });
  } catch (error) {
    console.log('Server error: ', error);
    return 'Server error, please contact us to get it fixed.';
  }

  revalidatePath('/dashboard/account');
  await signOut({ redirectTo: '/login' });
}

const recipeSchema = z.object({
  id: z.string(),
  userId: z.string(),
  name: z.string(),
  dateAdded: z.date(),
  ingredients: z
    .object({ name: z.string(), amount: z.coerce.number(), unit: z.string() })
    .array()
    .nonempty(),
  cookTime: z.coerce.number(),
  instructions: z.string(),
  servings: z.coerce.number(),
  favorite: z.boolean(),
  rating: z.coerce.number().optional(),
});

const createRecipeSchema = recipeSchema.omit({ id: true, dateAdded: true });
const editRecipeSchema = recipeSchema.omit({ userId: true, dateAdded: true });

export async function createRecipe(prevState: any, formData: FormData) {
  unstable_noStore();
  try {
    const validatedFields = createRecipeSchema.safeParse({
      userId: formData.get('userId'),
      name: formData.get('name'),
      ingredients: JSON.parse(formData.get('ingredients')?.toString() || '[]'),
      cookTime: Number(formData.get('cookTime')),
      instructions: formData.get('instructions'),
      servings: Number(formData.get('servings')),
      favorite: Boolean(formData.get('favorite')),
      rating: Number(formData.get('rating')),
    });

    if (!validatedFields.success) return 'One or more fields are missing';

    const {
      userId,
      name,
      ingredients,
      cookTime,
      instructions,
      servings,
      favorite,
      rating,
    } = validatedFields.data;
    const date = new Date().toISOString().split('T')[0];

    const allowedTypes = ['image/png', 'image/jpeg', 'image/webp'];
    let resizedImage = null;
    let thumbnail = null;
    const file = formData.get('image');
    const maxSizeInBytes = 16 * 1024 * 1024;
    if (file instanceof File && file.name !== 'undefined') {
      if (file.size > maxSizeInBytes)
        return 'Selected Image is too big! Keep it below 16mb.';
      if (!allowedTypes.includes(file.type))
        return 'Please upload only a png, jpeg, or webp.';
      const fileBuffer = await file.arrayBuffer();
      const resizedImageBuffer = await sharp(Buffer.from(fileBuffer))
        .resize({
          width: 800,
          fit: 'cover',
          withoutEnlargement: true,
          background: 'transparent',
        })
        .toFormat('webp', { quality: 80 })
        .toBuffer();

      const thumbnailBuffer = await sharp(Buffer.from(fileBuffer))
        .resize({ width: 120, height: 120, fit: 'cover' })
        .toFormat('webp', { quality: 80 })
        .toBuffer();

      resizedImage = {
        type: 'image/webp',
        data: new Binary(resizedImageBuffer),
      };

      thumbnail = {
        type: 'image/webp',
        data: new Binary(thumbnailBuffer),
      };
    }

    const newRecipe = {
      userId: userId,
      name: name,
      dateAdded: date,
      ingredients: ingredients,
      cookTime: cookTime * 60,
      instructions: instructions,
      servings: servings,
      favorite: favorite,
      rating: rating || false,
      image: resizedImage || null,
      thumbnail: thumbnail || null,
    };

    const mongoClient = await clientPromise;
    const db = mongoClient.db(process.env.DB_NAME);
    const result = await db.collection('recipes').insertOne(newRecipe);

    if (!result.acknowledged) return 'Sorry, could not create new recipe.';
    formData.append('id', result.insertedId.toString());
  } catch (error) {
    console.log('Server error: ', error);
    return 'We encountered a server error, please try again later.';
  }
  revalidatePath('/dashboard/recipes/create');
  redirect(`/dashboard/recipes/${formData.get('id')}`);
}

export async function editRecipe(prevState: any, formData: FormData) {
  unstable_noStore();
  try {
    const validatedFields = editRecipeSchema.safeParse({
      id: formData.get('id'),
      name: formData.get('name'),
      ingredients: JSON.parse(formData.get('ingredients')?.toString() || '[]'),
      cookTime: Number(formData.get('cookTime')),
      instructions: formData.get('instructions'),
      servings: Number(formData.get('servings')),
      favorite: Boolean(formData.get('favorite')),
      rating: Number(formData.get('rating')),
    });

    if (!validatedFields.success) return 'One or more fields are missing';

    const {
      id,
      name,
      ingredients,
      cookTime,
      instructions,
      servings,
      favorite,
      rating,
    } = validatedFields.data;

    const newRecipe = {
      name: name,
      ingredients: ingredients,
      cookTime: cookTime * 60,
      instructions: instructions,
      servings: servings,
      favorite: favorite,
      rating: rating || false,
    };

    const mongoClient = await clientPromise;
    const db = mongoClient.db(process.env.DB_NAME);
    const result = await db
      .collection('recipes')
      .updateOne({ _id: new ObjectId(id) }, { $set: newRecipe });

    const file = formData.get('image');
    if (file instanceof File && file.name != 'undefined') {
      const allowedTypes = ['image/png', 'image/jpeg', 'image/webp'];
      const maxSizeInBytes = 16 * 1024 * 1024;

      if (file.size > maxSizeInBytes)
        return 'Selected Image is too big! Keep it below 16mb.';

      if (!allowedTypes.includes(file.type))
        return 'Please upload only a png, jpeg, or webp.';

      const fileBuffer = await file.arrayBuffer();
      const resizedImageBuffer = await sharp(Buffer.from(fileBuffer))
        .resize({
          width: 800,
          fit: 'cover',
          withoutEnlargement: true,
          background: 'transparent',
        })
        .toFormat('webp', { quality: 80 })
        .toBuffer();

      const thumbnail = await sharp(Buffer.from(fileBuffer))
        .resize({ width: 120, height: 120, fit: 'cover' })
        .toFormat('webp', { quality: 80 })
        .toBuffer();

      const resizedImage = {
        type: 'image/webp',
        data: new Binary(resizedImageBuffer),
      };
      await db.collection('recipes').updateOne(
        { _id: new ObjectId(id) },
        {
          $set: {
            image: resizedImage,
            thumbnail: { type: 'image/webp', data: new Binary(thumbnail) },
          },
        },
        {
          upsert: true,
        },
      );
    }

    if (!result.acknowledged) return 'Sorry, could not update recipe.';
  } catch (error) {
    console.log('Server error: ', error);
    return 'We encountered a server error, please try again later.';
  }
  revalidatePath(`/dashboard/recipes/${formData.get('id')}/edit`);
  redirect(`/dashboard/recipes/${formData.get('id')}`);
}

export async function markFavorite(id: string, isFavorite: boolean) {
  unstable_noStore();
  try {
    const mongoClient = await clientPromise;
    const db = mongoClient.db(process.env.DB_NAME);
    const result = await db.collection('recipes').updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          favorite: isFavorite,
          dateAdded: new Date().toISOString().split('T')[0],
        },
      },
    );
  } catch (error) {
    console.log('Server error: ', error);
    throw new Error('Error updating recipe');
  }
  revalidatePath(`dashboard/recipes/[id]`, 'page');
}

export async function deleteRecipe(id: string) {
  unstable_noStore();
  try {
    const mongoClient = await clientPromise;
    const db = mongoClient.db(process.env.DB_NAME);
    await db.collection('recipes').deleteOne({ _id: new ObjectId(id) });
  } catch (error) {
    console.log('Server error: ', error);
    return 'Could not delete recipe';
  }
  revalidatePath('/dashboard/recipes/[id]', 'page');
  redirect('/dashboard/recipes');
}

const shoppingListSchema = z.object({
  id: z.string(),
  userId: z.string(),
  name: z.string(),
  date: z.string(),
  recipes: z.string().array().nonempty(),
});

const createShoppingListSchema = shoppingListSchema.omit({
  id: true,
});
const editShoppingListSchema = shoppingListSchema.omit({
  userId: true,
});

export async function createShoppingList(
  prevState: string,
  formData: FormData,
) {
  unstable_noStore();
  try {
    const validatedFields = createShoppingListSchema.safeParse({
      userId: formData.get('userId'),
      name: formData.get('name'),
      recipes: JSON.parse(formData.get('recipes')?.toString() || '[]'),
      date: formData.get('date'),
    });

    if (!validatedFields.success) return 'Invalid fields, please check again.';

    const { userId, name, recipes, date } = validatedFields.data;

    const mongoClient = await clientPromise;
    const db = mongoClient.db(process.env.DB_NAME);
    const result = await db.collection('shopping-lists').insertOne({
      userId: userId,
      name: name,
      recipes: recipes,
      dateAdded: date,
    });

    if (!result.insertedId)
      return 'We encountered a problem, please try again later';

    formData.append('id', result.insertedId.toString());
  } catch (error) {
    console.log('Server Error: ', error);
    return 'There was a server error, please let us know about it.';
  }

  revalidatePath('/dashboard/shopping-list/create');
  redirect(`/dashboard/shopping-list/${formData.get('id')}`);
}

export const editShoppingList = async (
  prevState: string,
  formData: FormData,
) => {
  unstable_noStore();
  try {
    const validatedFields = editShoppingListSchema.safeParse({
      id: formData.get('id'),
      date: formData.get('date'),
      name: formData.get('name'),
      recipes: JSON.parse(formData.get('recipes')?.toString() || '[]'),
    });

    if (!validatedFields.success) return 'Check for empty fields.';

    const { id, name, date, recipes } = validatedFields.data;
    const mongoClient = await clientPromise;
    const db = mongoClient.db(process.env.DB_NAME);
    const result = await db.collection('shopping-lists').updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          name: name,
          recipes: recipes,
          dateAdded: new Date(date).toISOString().split('T')[0],
        },
      },
    );

    if (!result.acknowledged)
      return 'Could not edit your shopping list at this time, try again later';
  } catch (error) {
    console.log('Server Error: ', error);
    return 'We encountered a problem, please contact us.';
  }

  revalidatePath(`/dashboard/shopping-list/${formData.get('id')}/edit`);
  redirect(`/dashboard/shopping-list/${formData.get('id')}`);
};

export const deleteShoppingList = async (id: string) => {
  unstable_noStore();
  try {
    const mongoClient = await clientPromise;
    const db = mongoClient.db(process.env.DB_NAME);
    const result = await db
      .collection('shopping-lists')
      .deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) notFound();
  } catch (error) {
    console.log('Server Error: ', error);
    return 'We encountered a problem, please contact us.';
  }

  revalidatePath(`/dashboard/shopping-list/${id}/edit`);
  redirect(`/dashboard/shopping-list`);
};
