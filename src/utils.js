import dayjs from 'dayjs';
import minMax from 'dayjs/plugin/minMax.js';
import {
  DATE_FORMAT,
  HOURS_IN_DAY,
  MILLISECONDS_IN_MINUTES,
  SECONDS_IN_MINUTES
} from './constants.js';

dayjs.extend(minMax);

//генерация рандомного эл-та массива
function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

//генерация рандомного натурального числа числа
function getRandomNumber(number) {
  const randomNumber = Math.floor(Math.random() * number) + 1;
  return Number(randomNumber);
}

//генерация рандомного булевого значения
function getRandomBoolean() {
  const randomNumber = Math.random();
  return randomNumber >= 0.5;
}

//получение случайного количества элементов массива из массива
function getRandomElementsFromArray(array) {
  const elementsLength = Math.floor(Math.random() * array.length);
  return array.slice(0, elementsLength);
}

//фильтрация элемента по айди
function getElementById(elements, itemsId) {
  if (Array.isArray(itemsId)) {
    return elements.filter((element) => itemsId.find((id) => element.id === id));
  }
  return elements.find((element) => element.id === itemsId);
}

//получение элементов по типу
const getElementByType = (elements, type) => elements.find((element) => element.type === type);

function humanizeTaskDueDate(date, format) {
  return date ? dayjs(date).format(format) : '';
}
//получение разницы времени
function getDifferenceInTime(start, end) {
  const difference = dayjs(end).diff(start) / MILLISECONDS_IN_MINUTES;

  switch (difference) {
    case difference < SECONDS_IN_MINUTES:
      return dayjs(difference).format(DATE_FORMAT.MINUTES_WITH_POSTFIX);

    case difference > SECONDS_IN_MINUTES && difference < SECONDS_IN_MINUTES * HOURS_IN_DAY:
      return dayjs(difference).format(DATE_FORMAT.HOUR_MINUTES_WITH_POSTFIX);

    default:
      return dayjs(difference).format(DATE_FORMAT.DAY_HOUR_MINUTES_WITH_POSTFIX);
  }
}

//счетчик
function incrementCounter(startFrom) {
  let counterStart = startFrom;
  return function () {
    return counterStart++;
  };
}

//получение случайнго числа из диапазона начиная с 01
function randomNumberOfRange(range) {
  const rangeNumber = Math.floor(Math.random() * range) + 1;
  return rangeNumber < 10 ? `0${rangeNumber}` : `${rangeNumber}`;
}

function toUpperCaseFirstSign (item) {
  return item.charAt(0).toUpperCase() + item.substring(1);
}
export {
  getRandomArrayElement,
  incrementCounter,
  getRandomNumber,
  getRandomBoolean,
  getRandomElementsFromArray,
  getElementByType,
  getElementById,
  humanizeTaskDueDate,
  randomNumberOfRange,
  getDifferenceInTime,
  toUpperCaseFirstSign
};
