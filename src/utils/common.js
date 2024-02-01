import {calcDuration, isDatesEqual} from "./events";

const updateItem = (items, update) => items.map((item) => item.id === update.id ? update : item);

const isMinorChange = (pointA, pointB) =>isDatesEqual(pointA, pointB)
  || pointA.basePrice !== pointB.basePrice
  || calcDuration(pointA.dateFrom, pointA.dateTo) !== calcDuration(pointB.dateFrom, pointB.dateTo);

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
};

const adaptToServer = (point) => {
  const adaptedPoint = {
    ...point,
    ['date_from']: new Date(point.dateFrom).toISOString(),
    ['date_to']: new Date(point.dateTo).toISOString(),
    ['base_price']: parseInt(point.basePrice, 10),
    ['is_favorite']: point.isFavorite,
  };

  delete adaptedPoint.dateFrom;
  delete adaptedPoint.dateTo;
  delete adaptedPoint.basePrice;
  delete adaptedPoint.isFavorite;

  return adaptedPoint;
};

export {
  updateItem,
  isMinorChange,
  adaptToClient,
  adaptToServer
};
