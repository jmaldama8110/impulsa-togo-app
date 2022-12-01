import CryptoJS from 'crypto-js';
import axios from 'axios';
import { Endpoints } from '../constants/Endpoints';

class UserService {
  SignIn (data:any) : Promise<any> {
    data = JSON.parse(data);

    const res = axios.post(Endpoints.Login, {
      phoneNumber: parseInt(data.phoneNumber),
      password: CryptoJS.SHA256(data.password).toString(),
      tokenFirebase: data.tokenFirebase
    });

    return res;
  };

  SignUp (data:any) : Promise<any> {
    data = JSON.parse(data);

    const res = axios.post(Endpoints.Register, {
      firstName: data.firstName,
      middleName: data.middleName,
      lastName: data.lastName,
      birthday: data.birthday,
      email: data.email,
      phoneNumber: parseInt(data.phoneNumber),
      password: CryptoJS.SHA256(data.password).toString(),
      tokenSMS: data.tokenSMS
    });

    return res;
  }

  VerifyCodeRegister (data:any) : Promise<any> {
    data = JSON.parse(data);

    const res = axios.post(Endpoints.VerifyCodeRegister, {
      id: [data.id].toString(),
      Code: data.code
    });
    return res;
  }

  resendCode (id:string) : Promise<any> {
    const res = axios.get(`${Endpoints.ResendCodeRegister}/${id}`, {
    });
    return res;
  }

  restorePassword (data:any) : Promise<any> {
    data = JSON.parse(data);

    const res = axios.get(`${Endpoints.RestorePassword}/${data.phoneNumber}/${data.tokenSMS}/${data.fullName}`);
    return res;
  }

  restoreVerificationCode (data:any) : Promise<any> {
    data = JSON.parse(data);

    // console.log(`Datoosss ${data.code}`);

    const res = axios.post(`${Endpoints.RestoreVerifcationCode}`, {
      id: data.id,
      code: data.code
    });
    return res;
  }

  resendRestoreCode (data:any) : Promise<any> {
    data = JSON.parse(data);
    // console.log('enviarrrrr', data.id);
    const res = axios.get(`${Endpoints.ResendRestoreCode}/${data.id}`);
    return res;
  }

  newPassword (data:any) : Promise<any> {
    data = JSON.parse(data);

    const res = axios.put(`${Endpoints.NewPassword}`, {
      id: data.idUser,
      password: CryptoJS.SHA256(data.password).toString()
    });
    return res;
  }
}
export default new UserService();
