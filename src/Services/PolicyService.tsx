import axios from 'axios';
import { Endpoints } from '../constants/Endpoints';

class PolicyService {
  getPolice (data:any) : Promise<any> {
    data = JSON.parse(data);
    console.log(data);
    const res = axios.get(`${Endpoints.GetPolice}/${data.idClient}/${data.numPolice}`, {
    });

    return res;
  };

  VerifyCode (data:any) : Promise<any> {
    data = JSON.parse(data);
    console.log(data);

    const res = axios.post(Endpoints.VerifyCodePolice, {
      externalIdClient: data.externalIdClient,
      code: data.code,
      id: data.idUser
    });
    return res;
  }

  resendCode (data:any) : Promise<any> {
    console.log('data: ', data);
    data = JSON.parse(data);
    console.log('External: ', data.externalId);

    const res = axios.get(`${Endpoints.ResendCodePolice}/${data.externalId}/${data.idUser}`, {
    });
    return res;
  }

  ExternalPolicies (data:any) : Promise<any> {
    data = JSON.parse(data);
    const res = axios.get(`${Endpoints.ExternalPolicies}/${data.idUserLog}/${data.idUser}`, {
    });
    return res;
  }

  Select (data:any) {
    data = JSON.parse(data);
    console.log('Recibe: ', data.idUser);

    const res = axios.post(Endpoints.SelectPolicies, {
      // idClient: data.idUser,
      idClient: data.idUser,
      data: data.idsPolices
    });

    return res;
  }

  MyPolicies (data:any) : Promise<any> {
    data = JSON.parse(data);
    // console.log(`id que recibo ${data.idUser}`);
    const res = axios.get(`${Endpoints.MyPolicies}/${data.idUser}`, {
    });
    return res;
  }

  PolicyDetail (data:any) : Promise<any> {
    data = JSON.parse(data);
    const res = axios.get(`${Endpoints.DetailPolicy}/${data.idPolicie}`, {
    });
    return res;
  }

  DownloadPDF (data:any) : Promise<any> {
    data = JSON.parse(data);
    const res = axios.get(`${Endpoints.DownloadPolicy}/${data.idPolicie}`, {
      responseType: 'blob'
    });
    return res;
  }

  EditAlias (data:any) : Promise<any> {
    data = JSON.parse(data);
    const res = axios.put(Endpoints.EditAlias, {
      id: data.Id,
      alias: data.alias
    });
    return res;
  }

  GetPrivacyPolicie (): Promise<any> {
    const res = axios.get(`${Endpoints.GetPrivacyPolicie}`, { responseType: 'blob' });

    return res;
  }
}
export default new PolicyService();
