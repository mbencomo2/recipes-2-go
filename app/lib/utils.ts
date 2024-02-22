import { Ingredient } from './definitions';

export const formatDateToLocal = (
  dateStr: string,
  locale: string = 'en-US',
) => {
  const date = new Date(dateStr);
  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  };
  const formatter = new Intl.DateTimeFormat(locale, options);
  return formatter.format(date);
};

export const generatePagination = (currentPage: number, totalPages: number) => {
  // If the total number of pages is 7 or less,
  // display all pages without any ellipsis.
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // If the current page is among the first 3 pages,
  // show the first 3, an ellipsis, and the last 2 pages.
  if (currentPage <= 3) {
    return [1, 2, 3, '...', totalPages - 1, totalPages];
  }

  // If the current page is among the last 3 pages,
  // show the first 2, an ellipsis, and the last 3 pages.
  if (currentPage >= totalPages - 2) {
    return [1, 2, '...', totalPages - 2, totalPages - 1, totalPages];
  }

  // If the current page is somewhere in the middle,
  // show the first page, an ellipsis, the current page and its neighbors,
  // another ellipsis, and the last page.
  return [
    1,
    '...',
    currentPage - 1,
    currentPage,
    currentPage + 1,
    '...',
    totalPages,
  ];
};

export function sanitizeInput(input: string | number | undefined) {
  if (input) return input.toString().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return '';
}

export function sumDuplicateIngredients(array: Array<any>) {
  const sumMap = new Map();

  // Iterate through the array and sum up amounts for each unique name
  array.forEach((subArray) => {
    subArray.forEach((obj: Ingredient) => {
      const { name, amount, unit } = obj;
      //Convert amount to grams
      const convertedAmount = convertUnits(amount, unit, 'g');
      if (sumMap.has(name)) {
        sumMap.set(name, {
          name,
          amount: sumMap.get(name).amount + convertedAmount,
          unit,
        });
      } else {
        // Convert amount to grams
        const convertedAmount = convertUnits(amount, unit, 'g');
        sumMap.set(name, { name, amount: convertedAmount, unit });
      }
    });
  });

  // Convert from grams to the unit last saved
  sumMap.forEach((obj: Ingredient) => {
    const { name, amount, unit } = obj;
    sumMap.set(name, {
      name,
      amount: round(convertUnits(amount, 'g', unit), 2),
      unit,
    });
  });

  // Convert the map back to an array of objects
  const resultArray = Array.from(sumMap.values());
  return resultArray;
}

// Conversion values for various units
const unitsInGrams: { [key: string]: number } = {
  Whole: 1,
  'fl oz': 30,
  cup: 240,
  pt: 475,
  qt: 950,
  gal: 3800,
  ml: 1,
  l: 1000,
  g: 1,
  kg: 1000,
  oz: 28,
  lb: 455,
  tsp: 5,
  tbsp: 15,
  dash: 0.6,
  pinch: 0.3,
};

export const convertUnits = (
  ingredientAmount: number,
  fromUnit: string,
  toUnit: string,
) => {
  if (
    !unitsInGrams.hasOwnProperty(fromUnit) ||
    !unitsInGrams.hasOwnProperty(toUnit)
  ) {
    throw new Error('Invalid units provided');
  }

  const amountInGrams = ingredientAmount * unitsInGrams[fromUnit];
  const convertedAmount = amountInGrams / unitsInGrams[toUnit];

  return convertedAmount;
};

const round = (value: number, significantFigures: number) => {
  const exponent = Math.floor(Math.log10(value));
  const nIntegers = exponent + 1;
  const precision = 10 ** (nIntegers - significantFigures);
  const newValue = Math.round(value / precision) * precision;
  if (newValue.toString().split('.')[1]?.length > 2) return newValue.toFixed(2);
  return newValue;
};
export const capitalize = (str: string) => {
  // Split the string into an array of words
  let words = str.split(' ');

  // Iterate through the array and capitalize the first letter of each word
  for (let i = 0; i < words.length; i++) {
    words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
  }

  // Join the words back into a string and return
  return words.join(' ');
};
