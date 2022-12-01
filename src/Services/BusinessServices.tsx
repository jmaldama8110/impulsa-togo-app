import axios from 'axios';
import { Endpoints } from '../constants/Endpoints';

class BusinessService {
  getBusiness () : Promise<any> {
    const res = axios.get(`${Endpoints.GetBusiness}`, {
    });
    return res;
  };

  SendEmailSiniestro (data:any) : Promise<any> {
    const { fullName, insurance } = data;

    const res = axios.post(Endpoints.sendEmailSiniestro, {
      fullName: fullName,
      insurance: insurance
    });

    return res;
  };
}
export default new BusinessService();
