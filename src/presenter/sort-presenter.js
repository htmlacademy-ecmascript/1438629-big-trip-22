import { render } from '../framework/render.js';
import { SORT_TYPES, ENABLED_SORT_TYPES} from '../constants.js';
import ListSortView from '../view/list-sort-view.js';

export default class SortPresenter {
  #container = null;
  #sortTypes = [];
  #currentSortType = SORT_TYPES.DAY;
  #sortTypesChangeHandler = null;

  constructor({ container, sortTypeHandler}) {
    this.#container = container;
    this.#sortTypes = Object.values(SORT_TYPES).map((type) => ({
      type,
      isChecked: type === this.#currentSortType,
      isDisabled: !ENABLED_SORT_TYPES[type],
    }));
    this.#sortTypesChangeHandler = sortTypeHandler;
  }

  init() {
    render(
      new ListSortView ({
        items: this.#sortTypes,
        onItemChange: this.#sortTypesChangeHandler,
      }),
      this.#container
    );
  }
}
