import {
  incrementCounter,
  getRandomArrayElement,
  getRandomNumber,
  getRandomBoolean,
  randomNumberOfRange
} from '../utils.js';
import {START_ID_COUNTER, CITIES, EVENTS_TYPES, MAX_PRICE_VALUE, MONTH_COUNT,} from '../constants.js';

const getPointEventId = incrementCounter(START_ID_COUNTER);

const setupEventPoint = () => {
  const ID = getPointEventId();

  return {
    id: ID.toString(),
    basePrice: getRandomNumber(MAX_PRICE_VALUE),
    dateFrom: `2019-${randomNumberOfRange(MONTH_COUNT)}-10T22:55:56.845Z`,
    dateTo: `2019-${randomNumberOfRange(MONTH_COUNT)}-11T11:22:13.375Z`,
    destination: getRandomNumber(CITIES.length).toString(),
    isFavorite: getRandomBoolean(),
    offers: ['1', '2', '3', '4', '10', '15', '7', '25', '34'],
    type: getRandomArrayElement(EVENTS_TYPES),
  };
};
export const getEventPoints = () => Array.from({length: EVENTS_TYPES.length,}, setupEventPoint
);
