import { FILTERS_TYPE } from '../constants.js';
import dayjs from 'dayjs';

function isPointFuture(dateFrom) {
  return dayjs().isBefore(dateFrom, 'day');
}

function isPointPresent(dateFrom, dateTo) {
  return !isPointFuture(dateFrom) && !isPointPast(dateTo);
}

function isPointPast(dateTo) {
  return dayjs().isAfter(dateTo, 'day');
}

export const filter = {
  [FILTERS_TYPE.EVERYTHING]: (eventPoints) => eventPoints.filter((eventPoint) => eventPoint),
  [FILTERS_TYPE.FUTURE]: (eventPoints) => eventPoints.filter((eventPoint) => isPointFuture (eventPoint.dateFrom)),
  [FILTERS_TYPE.PRESENT]: (eventPoints) => eventPoints.filter((eventPoint) => isPointPresent (eventPoint.dateFrom, eventPoint.dateTo)),
  [FILTERS_TYPE.PAST]: (eventPoints) => eventPoints.filter((eventPoint) => isPointPast (eventPoint.dateTo))
};
