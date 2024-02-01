import dayjs from 'dayjs';
import minMax from 'dayjs/plugin/minMax';
import duration from 'dayjs/plugin/duration';
import {
  DATE_FORMAT,
} from '../constants.js';

dayjs.extend(minMax);
dayjs.extend(duration);

export function humanizeEventDate (eventDate) {
  return eventDate ? dayjs(eventDate).format(DATE_FORMAT.MONTH_DAY) : '';
}

export function humanizeEventTime (eventDateTime) {
  return eventDateTime ? dayjs(eventDateTime).format(DATE_FORMAT.HOUR_MINUTE) : '';
}

export function humanizeEventDateTime (eventDateTime) {
  return eventDateTime ? dayjs(eventDateTime).format(DATE_FORMAT.DATE_TIME_FORMAT) : '';
}

export function isDatesEqual (dateA, dateB) {
  return (dateA === null && dateB === null) || dayjs(dateA).isSame(dateB, 'D');
}

const calcDuration = (dateFrom, dateTo) => {
  const diff = dayjs(dateTo).diff(dayjs(dateFrom));
  const eventDuration = dayjs.duration(diff);

  if (eventDuration.days()) {
    return eventDuration.format('DD[D] HH[H] mm[m]');
  }

  if (eventDuration.hours()) {
    return eventDuration.format('HH[H] mm[m]');
  }

  return eventDuration.format('mm[m]');
};

function toUpperCaseFirstSign(item) {
  return item.charAt(0).toUpperCase() + item.substring(1);
}

const checkPriceIsNumber = (price) => /^\d+$/.test(price);

export {
  toUpperCaseFirstSign,
  checkPriceIsNumber,
  calcDuration,
};
