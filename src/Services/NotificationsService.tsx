import axios from 'axios';
import { Endpoints } from '../constants/Endpoints';

class NotificationsService {
  getNotifications (externalId:string) : Promise<any> {
    const res = axios.get(`${Endpoints.GetNotifications}/${externalId}`, {
    });
    return res;
  };
}
export default new NotificationsService();
