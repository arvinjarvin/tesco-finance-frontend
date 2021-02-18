import * as axios from 'axios';
import { BASE_URL, PRODUCTION_SERVICES } from './constants';

class FinanceService {
  constructor() {
    axios.defaults.headers.common['Authorization'] = localStorage.getItem(
      'access_token'
    );
    axios.get(PRODUCTION_SERVICES).then((res) => {
      this.services = res.data;
      this.services.forEach((service) => {
        this[`${service.name.toLowerCase()}API`] = axios.create({
          baseURL: `http://${service.accessPoints[0].replace(
            '%PUBLIC_URL%',
            BASE_URL
          )}`,
          validateStatus: function (status) {
            return status >= 200 && status < 300;
          },
          xsrfCookieName: 'XSRF-TOKEN',
        });
      });
    });
  }

  build() {
    return new Promise((resolve, reject) => {
      axios.get(PRODUCTION_SERVICES).then((res) => {
        this.services = res.data;
        this.services.forEach(async (service) => {
          this[`${service.name.toLowerCase()}API`] = axios.create({
            baseURL: `http://${service.accessPoints[0].replace(
              '%PUBLIC_URL%',
              BASE_URL
            )}`,
            validateStatus: function (status) {
              return status >= 200 && status < 300;
            },
            xsrfCookieName: 'XSRF-TOKEN',
          });
        });
        resolve(this);
      });
    });
  }

  setDefaults(token) {
    this.services.forEach((service) => {
      this[`${service.name.toLowerCase()}API`].defaults.headers.common[
        'Authorization'
      ] = `Bearer ${token}`;
    });
  }
}

export default new FinanceService();
