import {getEventPoints} from '../mock/event-points.js';

export default class EventPointsModel {
  #eventPoints = [];

  constructor() {
    this.#eventPoints = getEventPoints();
  }

  get() {
    return this.#eventPoints;
  }
}
