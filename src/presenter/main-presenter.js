import {render} from '../render.js';
import ListSortView from '../view/list-sort-view.js';
import TripListView from '../view/trip-list-view.js';
import TripItemView from '../view/trip-item-view.js';
import AddItemView from '../view/add-item-view.js';
import EditItemView from '../view/edit-item-view.js';

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
    this.eventArray = this.eventPointsModel.get();
    this.offersArray = this.offersModel.get();
    this.destinationArray = this.destinationModel.get();

    render(this.sortComponent, this.tripContainer);
    render(this.tripListComponent, this.tripContainer);
    render(
      new EditItemView({
        destinations: this.destinationModel.get(),
        eventPoints: this.eventArray[0],
        selectedOffers: this.offersModel.getByType(this.eventArray[0].type, this.eventArray[0].offers),
        selectedDestination: this.destinationModel.getById(this.eventArray[0].destination),
        offers: this.offersModel.getByType(this.eventArray[0].type, this.eventArray[0].offers),
      }), this.tripListComponent.getElement());
    for (let i = 0; i < this.offersArray.length; i++) {
      const destination = this.destinationModel.getById(this.eventArray[i].destination);
      render(
        new TripItemView({
          destination,
          eventPoints: this.eventArray[i],
          offersModel: this.offersArray[i],
        }), this.tripListComponent.getElement()
      );
    }
    render(new AddItemView(), this.tripListComponent.getElement());
  }
}
