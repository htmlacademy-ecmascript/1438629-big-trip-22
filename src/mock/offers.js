import {incrementCounter, getRandomNumber, getRandomArrayElement,} from '../utils.js';
import {START_ID_COUNTER, EVENTS_TYPES, OFFERS, OFFERS_TITLE, MAX_PRICE_OFFER} from '../constants.js';

const getOfferId = incrementCounter(START_ID_COUNTER);

const setupOffers = () => {
  const ID = getOfferId();

  return {
    id: ID.toString(),
    title: getRandomArrayElement(OFFERS_TITLE),
    price: getRandomNumber(MAX_PRICE_OFFER),
  };
};

export const getOffers = () =>
  EVENTS_TYPES.map((type) => {
    const offers = Array.from({length: getRandomNumber(OFFERS.length)}, setupOffers);

    return {
      type,
      offers,
    };
  });
