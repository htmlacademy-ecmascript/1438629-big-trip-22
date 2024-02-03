import {render, remove, replace, RenderPosition} from '../framework/render.js';
import HeaderTripInfoView from '../view/header-trip-info-view.js';

export default class TripInfoPresenter {
  #container = null;
  #eventPointsModel = null;
  #destinationsModel = null;
  #offersModel = null;
  #eventPoints = null;
  #tripInfoComponent = null;

  constructor({container, eventPointsModel, destinationsModel, offersModel}) {
    this.#container = container;
    this.#eventPointsModel = eventPointsModel;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#eventPoints = this.#eventPointsModel.get();

    this.#eventPointsModel.addObserver(this.#modelEventHandler);
  }

  init() {
    const prevTripInfoComponent = this.#tripInfoComponent;
    this.#tripInfoComponent = new HeaderTripInfoView({
      destinations: this.#destinationsModel.get(),
      offers: this.#offersModel.get(),
      eventPoints: this.#eventPointsModel.get(),
    });
    if (!prevTripInfoComponent) {
      render(this.#tripInfoComponent, this.#container, RenderPosition.AFTERBEGIN);
      return;
    }

    replace(this.#tripInfoComponent, prevTripInfoComponent);
    remove(prevTripInfoComponent);

    render(this.#tripInfoComponent, this.#container);
  }

  #modelEventHandler = () => {
    this.init()
  }
}
