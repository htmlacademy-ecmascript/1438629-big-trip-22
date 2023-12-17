import {render} from '../render.js';
import ListSortView from '../view/list-sort-view.js';
import TripListView from '../view/trip-list-view.js';
import TripItemView from '../view/trip-item-view.js';
import AddItemView from '../view/add-item-view.js';
import EditItemView from '../view/edit-item-view.js';
import {MAX_EVENT_COUNT} from '../constants.js';

export default class MainPresenter {
  sortComponent = new ListSortView();
  tripListComponent = new TripListView();

  constructor({tripContainer, destinationModel, eventPointsModel, offersModel}) {
    this.tripContainer = tripContainer;
    this.destinationModel = destinationModel;
    this.eventPointsModel = eventPointsModel;
    this.offersModel = offersModel;
  }

  init() {
    this.eventPointsModel = this.eventPointsModel.get();
    this.offersModel = this.offersModel.get();

    render(this.sortComponent, this.tripContainer);
    render(this.tripListComponent, this.tripContainer);
    render(
      new EditItemView({
        destinations: this.destinationModel.get(),
        eventPoints: this.eventPointsModel[0],
        offers: this.offersModel,
      }), this.tripListComponent.getElement());

    for (let i = 0; i < MAX_EVENT_COUNT; i++) {
      const destination = this.destinationModel.getById(this.eventPointsModel[i].id);
      render(
        new TripItemView({
          destination,
          eventPoints: this.eventPointsModel[i],
          offersModel: this.offersModel[i],
        }), this.tripListComponent.getElement()
      );
    }
    render(new AddItemView(), this.tripListComponent.getElement());
  }
}
