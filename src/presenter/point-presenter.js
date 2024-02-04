import {render, replace, remove} from '../framework/render.js';
import {EDIT_TYPE, MODE, UPDATE_TYPE, USER_ACTION,} from '../constants.js';
import EditPointView from '../view/edit-point-view.js';
import TripPointView from '../view/trip-point-view.js';
import {isMinorChange} from '../utils/common.js';

export default class PointPresenter {
  #pointListContainer = null;
  #destinationModel = null;
  #offersModel = null;
  #point = null;
  #pointComponent = null;
  #editPointComponent = null;
  #handleDataChange = null;
  #handleModeChange = null;
  #mode = MODE.DEFAULT;

  constructor({pointListContainer, destinationModel, offersModel, onPointChange, onModeChange}) {
    this.#pointListContainer = pointListContainer;
    this.#destinationModel = destinationModel;
    this.#offersModel = offersModel;
    this.#handleDataChange = onPointChange;
    this.#handleModeChange = onModeChange;
  }

  init(point) {
    this.#point = point;
    const prevPointComponent = this.#pointComponent;
    const prevEditPointComponent = this.#editPointComponent;

    this.#pointComponent = new TripPointView({
      destination: this.#destinationModel.getById(point.destination),
      eventPoint: this.#point,
      offers: this.#offersModel.getByType(point.type),
      onEditClick: this.#pointEditClickHandler,
      onFavoriteClick: this.#onFavoriteClickHandler
    });
    this.#editPointComponent = new EditPointView({
      destinations: this.#destinationModel.get(),
      eventPoint: this.#point,
      offers: this.#offersModel.get(),
      editorMode: EDIT_TYPE.EDITING,
      onCloseClick: this.#pointEditCloseCLickHandler,
      onSaveEdit: this.#pointEditSaveClickHandler,
      onDeleteClick: this.#pointDeleteClickHandler,
    });

    if (!prevPointComponent || !prevEditPointComponent) {
      render(this.#pointComponent, this.#pointListContainer);
      return;
    }

    if (this.#mode === MODE.DEFAULT) {
      replace(this.#pointComponent, prevPointComponent);
    }

    if (this.#mode === MODE.EDITING) {
      replace(this.#editPointComponent, prevEditPointComponent);
    }

    remove(prevPointComponent);
    remove(prevEditPointComponent);
  }

  destroy() {
    remove(this.#pointComponent);
    remove(this.#editPointComponent);
  }

  resetView() {
    if (this.#mode !== MODE.DEFAULT) {
      this.#editPointComponent.reset(this.#point);
      this.#replaceEditFormToPoint();
    }
  }

  #pointDeleteClickHandler = (point) => {
    this.#handleDataChange(USER_ACTION.DELETE_POINT, UPDATE_TYPE.MINOR, point);
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#replaceEditFormToPoint();
      document.removeEventListener('keydown', this.#escKeyDownHandler);
    }
  };

  #replacePointToEditForm() {
    replace(this.#editPointComponent, this.#pointComponent);
    this.#handleModeChange();
    this.#mode = MODE.EDITING;
  }

  #replaceEditFormToPoint() {
    this.#editPointComponent.reset(this.#point);
    replace(this.#pointComponent, this.#editPointComponent);
    this.#mode = MODE.DEFAULT;
  }

  #pointEditClickHandler = () => {
    this.#replacePointToEditForm();
    document.addEventListener('keydown', this.#escKeyDownHandler);
  };

  #pointEditCloseCLickHandler = () => {
    this.#replaceEditFormToPoint();
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  };

  #pointEditSaveClickHandler = (point) => {
    const currentTypeChange = isMinorChange(point, this.#point) ? UPDATE_TYPE.MINOR : UPDATE_TYPE.PATCH;
    this.#handleDataChange(
      USER_ACTION.UPDATE_POINT,
      currentTypeChange,
      point,
    );
  };

  #onFavoriteClickHandler = () => {
    this.#handleDataChange(USER_ACTION.UPDATE_POINT, UPDATE_TYPE.PATCH, {
      ...this.#point,
      isFavorite: !this.#point.isFavorite
    });
  };

  setSaving = () => {
    if (this.#mode === MODE.EDITING) {
      this.#editPointComponent.updateElement({
        isDisabled: true,
        isSaving: true
      });
    }
  };

  setAborting = () => {
    if (this.#mode === MODE.DEFAULT) {
      this.#editPointComponent.shake();
      this.#pointComponent.shake();
      return;
    }

    if (this.#mode === MODE.EDITING) {
      const resetFormState = () => {
        this.#editPointComponent.updateElement({
          isDisabled: false,
          isSaving: false,
          isDeleting: false,
        });
      };

      this.#editPointComponent.shake(resetFormState);
    }
  };

  setRemove = () => {
    if (this.#mode === MODE.EDITING) {
      this.#editPointComponent.updateElement({
        isDisabled: true,
        isDeleting: true,
      });
    }
  };
}
