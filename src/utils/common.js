//генерация рандомного эл-та массива
import {getDifferenceInTime} from './events.js';

function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

//генерация рандомного натурального числа числа
function getRandomNumber(number) {
  const randomNumber = Math.floor(Math.random() * number) + 1;
  return Number(randomNumber);
}

//счетчик
function incrementCounter(startFrom) {
  let counterStart = startFrom;
  return function () {
    return counterStart++;
  };
}

const getRandomIntFromDuration = (min, max) => Math.floor(Math.random() * (max - min)) + min;

const updateItem = (items, update) => items.map((item) => item.id === update.id ? update : item);

const isMinorChange = (pointA, pointB) => pointA.dateFrom !== pointB.dateFrom
  || pointA.basePrice !== pointB.basePrice
  || getDifferenceInTime(pointA.dateFrom, pointA.dateTo) !== getDifferenceInTime(pointB.dateFrom, pointB.dateTo);

const adaptToClient = (point) => {
  const adaptedPoint = {
    ...point,
    dateFrom: point['date_from'],
    dateTo: point['date_to'],
    basePrice: point['base_price'],
    isFavorite: point['is_favorite'],
  };

  delete adaptedPoint['date_from'];
  delete adaptedPoint['date_to'];
  delete adaptedPoint['base_price'];
  delete adaptedPoint['is_favorite'];

    return adaptedPoint;
}

const adaptToServer = (point) => {
  const adaptedPoint = {
    ...point,
    ['date_from']: new Date(point.dateFrom).toISOString(),
    ['date_to']: new Date(point.dateTo).toISOString(),
    ['base_price']: point.basePrice,
    ['is_favorite']: point.isFavorite,
  };

  delete adaptedPoint.dateFrom;
  delete adaptedPoint.dateTo;
  delete adaptedPoint.basePrice;
  delete adaptedPoint.isFavorite;

  return adaptedPoint;
}

export {
  getRandomArrayElement,
  incrementCounter,
  getRandomNumber,
  getRandomIntFromDuration,
  updateItem,
  isMinorChange,
  adaptToClient,
  adaptToServer
};
