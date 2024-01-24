import {render} from '../framework/render.js';
import {filter} from '../utils/filter.js';
import ListFilterView from '../view/list-filter-view.js';

const filterContainer = document.querySelector('.trip-controls__filters');

export default class FilterPresenter {
  #eventPointsModel = [];
  #filters = [];

  constructor(eventPointsModel) {
    this.#eventPointsModel = eventPointsModel;
    this.#filters = Object.entries(filter).map(([filterType, filterPoints], index) =>
      ({
        type: filterType,
        isChecked: index === 0,
        isDisabled: !filterPoints(this.#eventPointsModel.eventPoints).length,
      })
    );
  }

  init() {
    render(new ListFilterView({items: this.#filters}), filterContainer);
  }
}
