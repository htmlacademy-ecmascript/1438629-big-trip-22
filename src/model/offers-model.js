import {getOffers} from '../mock/offers.js';

export default class OffersModel {
  #offers = [];

  constructor() {
    this.#offers = getOffers();
  }

  get() {
    return this.#offers;
  }

  getByType(type) {
    return (
      this.#offers.find((offer) => offer.type === type.toString()) || null
    );
  }
}
