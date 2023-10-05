const PROPORTION_THRESHOLD = 1.65;

const TYPES = {
  SMALL: 0,
  MEDIUM: 1,
  LARGE: 2
};

const SIZES = [
  { max: 33, min: 20 },
  { max: 82.5, min: 50 },
  { max: 132, min: 80 }
];

const PRICES = [
  { 1: 100, 2: 200, 3: 300, minPrice: 1250, maxPrice: 3500 },
  { 1: 100, 2: 200, 3: 300, minPrice: 3500, maxPrice: 7000 },
  { 1: 100, 2: 200, 3: 300, minPrice: 7000, maxPrice: Number.MAX_VALUE }
];

const UNITS = [
  { 1: 250 },
  { 1: 150, 2: 100 },
  { 1: 100, 2: 88, 3: 62 },
];

function getPrice(edition, originalPrice) {
  if (originalPrice < PRICES[TYPES.SMALL].minPrice) {
    throw new Error('Limited editions not available');
  }
  if (originalPrice >= PRICES[TYPES.SMALL].minPrice && originalPrice < PRICES[TYPES.SMALL].maxPrice) {
    return PRICES[TYPES.SMALL][edition];
  }
  if (originalPrice >= PRICES[TYPES.MEDIUM].minPrice && originalPrice < PRICES[TYPES.MEDIUM].maxPrice) {
    return PRICES[TYPES.MEDIUM][edition];
  }
  if (originalPrice >= PRICES[TYPES.LARGE].minPrice) {
    return PRICES[TYPES.LARGE][edition];
  }
}

function calculateLimitedEditionsPriceAndUnits(editions, originalPrice) {
  for (let i = 0; i < editions.length; i++) {
    editions[i].name = i === 0 ? 'Small' : i === 1 ? 'Medium' : 'Large';
    editions[i].price = getPrice(i + 1, originalPrice);
    editions[i].unidades = UNITS[editions.length - 1][i + 1];
  }
}

function calculateMaxBenefit(editions) {
  let maxBenefit = 0;
  for (let i = 0; i < editions.length; i++) {
    maxBenefit += editions[i].price * editions[i].unidades;
  }
  return maxBenefit * 0.3;
}

function areLimitedEditionsPossible(height, width, price) {
  if (height < SIZES[TYPES.SMALL].min || width < SIZES[TYPES.SMALL].min) {
    return false;
  }
  if (price < PRICES[TYPES.SMALL].minPrice) {
    return false;
  }
  return true;
}

function formatSize(number) {
  number = parseFloat(number).toFixed(1);
  number = number % 1 === 0 ? parseFloat(number).toFixed(0) : number;
  return parseFloat(number);
}

// If the proportion is greater than 1.65, the max size is the max size of the range
// If the proportion is less than 1.65, the max size is the min size of the range multiplied by the proportion
// We return an object with widht and height
function calculateLimitedEditionSize(height, width, sizes) {

  // If the image has less than min size in one of the dimensions, 
  // We can't generate limited editions of that size
  if(height < sizes.min || width < sizes.min) {
    return null;
  }

  // Calculate the proportion between height and width
  // And get the max and min size of the limited edition
  const proportion = Math.max(height, width) / Math.min(height, width);
  let max = proportion > PROPORTION_THRESHOLD ? sizes.max : sizes.min * proportion;
  let min = proportion > PROPORTION_THRESHOLD ? sizes.max / proportion : sizes.min;

  min = formatSize(min);
  max = formatSize(max);

  // The limited edition cannot be the same size as the original
  if (Math.max(height, width) === max && Math.min(height, width) === min) {
    return null;
  }

  // If the height is greater than the width, the limited edition is vertical
  // and because of the proportion, we may print like it was horizontal
  if (height > width) {
    return { height: max, width: min };
  } else {
    return { height: min, width: max };
  }
}

function calculateLimitedEditions(height, width, price) {
  height = parseFloat(height);
  width = parseFloat(width);

  if(!areLimitedEditionsPossible(height, width, price)) {
    return { 
      error: true,
      reason: 'Limited editions not available'
    };
  }

  const editions = [];
  let editionSmall, editionMedium, editionLarge;
  editionSmall =  calculateLimitedEditionSize(height, width, SIZES[TYPES.SMALL]);
  editionMedium = calculateLimitedEditionSize(height, width, SIZES[TYPES.MEDIUM]);
  editionLarge =  calculateLimitedEditionSize(height, width, SIZES[TYPES.LARGE]);

  if(editionSmall)  editions.push(editionSmall);
  if(editionMedium) editions.push(editionMedium);
  if(editionLarge)  editions.push(editionLarge);

  if(editions.length === 0) {
    return { 
      error: true,
      reason: 'No editions were generated'
    };
  }

  calculateLimitedEditionsPriceAndUnits(editions, price);
  let maxBenefit = calculateMaxBenefit(editions);

  return {
    editions,
    maxBenefit
  };

}

export default calculateLimitedEditions;