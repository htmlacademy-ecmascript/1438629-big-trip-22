import { FILTERS_TYPE } from '../constants.js';
import dayjs from 'dayjs';

const isPointFuture = (point) => dayjs().isAfter(point.dateFrom);
const isPointPresent = (point) => dayjs().isAfter(point.dateFrom) && dayjs().isBefore(point.dateFrom);
const isPointPast = (point) => dayjs().isBefore(point.dateFrom);


export const filter = {
  [FILTERS_TYPE.EVERYTHING]: (eventPoints) => eventPoints,
  [FILTERS_TYPE.FUTURE]: (eventPoints) => eventPoints.filter(isPointFuture),
  [FILTERS_TYPE.PRESENT]: (eventPoints) => eventPoints.filter(isPointPresent),
  [FILTERS_TYPE.PAST]: (eventPoints) => eventPoints.filter(isPointPast),
};
