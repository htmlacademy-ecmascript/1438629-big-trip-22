import {render, RenderPosition} from '../framework/render.js';
import HeaderTripInfoView from '../view/header-trip-info-view';

export default class HeaderPresenter {
  #headerTripInfo = null;
  #eventPoints = null;

  constructor({headerTripInfo, eventPointsModel}) {
    this.#headerTripInfo = headerTripInfo;
    this.#eventPoints = eventPointsModel.eventPoints;
  }

  init() {
    render(new HeaderTripInfoView(), this.#headerTripInfo, RenderPosition.AFTERBEGIN);
  }
}
