import {incrementCounter, getRandomArrayElement, getRandomNumber} from '../utils.js';
import {START_ID_COUNTER, DESCRIPTIONS, CITIES, MAX_IMAGES_COUNT, START_CITY_COUNTER} from '../constants.js';

const getCityId = incrementCounter(START_ID_COUNTER);
const getPictureId = incrementCounter(START_ID_COUNTER);
const citi = incrementCounter(START_CITY_COUNTER);

const setupDestination = () => {
  const ID = getCityId();
  const citiId = citi();

  return {
    id: ID.toString(),
    description: getRandomArrayElement(DESCRIPTIONS),
    name: CITIES[citiId],
    pictures: Array.from({length: getRandomNumber(MAX_IMAGES_COUNT)}, () => ({
      src: `https://loremflickr.com/248/152?${getPictureId()}`,
      description: getRandomArrayElement(DESCRIPTIONS),
    }))
  };
};

export const getDestinations = () => Array.from({length: CITIES.length,}, setupDestination
);
