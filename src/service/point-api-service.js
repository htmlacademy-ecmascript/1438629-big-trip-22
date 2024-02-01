import ApiService from "../framework/api-service";
import {METHOD, SOURCE_URL} from "../constants";

export default class PointApiService extends ApiService {
  get points() {
    return this._load({url: SOURCE_URL.POINTS}).then(ApiService.parseResponse);
  }

  get destinations() {
    return this._load({url: SOURCE_URL.DESTINATIONS}).then(ApiService.parseResponse);
  }

  get offers() {
    return this._load({url: SOURCE_URL.OFFERS}).then(ApiService.parseResponse);
  }

  async updatePoint(point) {
    const response = await this._load({
      url: `${SOURCE_URL.POINTS}/${point.id}`,
      method: METHOD.PUT,
      body: JSON.stringify(point),
      headers: new Headers({'content-type': 'application/json'}),
    });
    const parsedResponse = await ApiService.parseResponse(response);
    return parsedResponse;
  }

  async addPoint(point) {
    const response = await this._load({
      url: SOURCE_URL.POINTS,
      method: METHOD.POST,
      body: JSON.stringify(point),
      headers: new Headers({'content-type': 'application/json'}),
    });
    const parsedResponse = await ApiService.parseResponse(response);
    return parsedResponse;
  }

  async deletePoint(point) {
    await this._load({
      url: `${SOURCE_URL.POINTS}/${point.id}`,
      method: METHOD.DELETE,
      body: JSON.stringify(point),
      headers: new Headers({'content-type': 'application/json'}),
    });
  }
}
