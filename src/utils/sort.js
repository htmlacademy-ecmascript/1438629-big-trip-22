import {SORT_TYPES} from '../constants.js';
import dayjs from 'dayjs';

const getPointsByDate = (pointA, pointB) =>
  dayjs(pointB.dateFrom).diff(dayjs(pointA.dateFrom));

const getPointsByTime = (pointA, pointB) => {
  const pointADuration = dayjs(pointA.dateTo).diff(dayjs(pointA.dateFrom));
  const pointBDuration = dayjs(pointB.dateTo).diff(dayjs(pointB.dateFrom));

  return pointBDuration - pointADuration;
};

const getPointByPrice = (pointA, pointB) => pointB.basePrice - pointA.basePrice;

export const sorting = {
  [SORT_TYPES.DAY]: (eventPoints) => [...eventPoints].sort(getPointsByDate),
  [SORT_TYPES.EVENT]: () => {
    throw new Error(`Sort by ${SORT_TYPES.EVENT} is disabled`);
  },
  [SORT_TYPES.TIME]: (eventPoints) => [...eventPoints].sort(getPointsByTime),
  [SORT_TYPES.PRICE]: (eventPoints) => [...eventPoints].sort(getPointByPrice),
  [SORT_TYPES.OFFER]: () => {
    throw new Error(`Sort by ${SORT_TYPES.OFFER} is disabled`);
  },
};
