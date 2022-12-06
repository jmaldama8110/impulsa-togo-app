import { IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonLoading, IonPage, IonRow, IonToolbar, useIonAlert } from '@ionic/react';
import { useHistory } from 'react-router';
import { useEffect, useState } from 'react';
import './Styles/VerificationCode.css';
import VerificationCodeForm from '../../components/VerificationCodeForm';
import UserService from '../../Services/UserService';
import { HttpStatusCode } from '../../constants/HttpStatusCode';
import { PushNotifications, Token } from '@capacitor/push-notifications';
import { Firebase } from '@ionic-native/firebase';
import { Toast } from '@capacitor/toast';

const VerificationCode: React.FC = () => {
  let [seg, setSeg] = useState(59);
  let [min, setMin] = useState(4);
  const history = useHistory();
  const [present] = useIonAlert();
  const [showLoading, setShowLoading] = useState(false);
  const idUser = localStorage.getItem('Id');
  const dataUsuario = JSON.parse(localStorage.getItem('dataUser') as any);
  const [token1, setToken1] = useState<any>();
  // console.log(dataUsuario);
  const [code, setCode] = useState({
    num1: '',
    num2: '',
    num3: '',
    num4: ''
  });

  const showToast = async (msg: string) => {
    await Toast.show({
      text: msg
    });
  };

  useEffect(() => {
    PushNotifications.checkPermissions().then((res) => {
      if (res.receive !== 'granted') {
        PushNotifications.requestPermissions().then((res) => {
          if (res.receive === 'denied') {
            showToast('Permiso de notificación push denegado');
          } else {
            showToast('Permiso de notificación push concedido');
            register();
          }
        });
      } else {
        register();
      }
    });
  }, []);

  const register = () => {
    PushNotifications.createChannel({
      id: 'testchannel1',
      name: 'ChannelPush',
      description: 'Channel custom',
      importance: 5,
      sound: 'default',
      vibration: true,
      visibility: -1,
      lights: true
    }).then(() => {
      console.log('Channel created');
      PushNotifications.listChannels().then((channels) => console.log('List of channels' + JSON.stringify(channels)));
    });
    console.log('Token iOS: ', Firebase.getToken());
    // Register with Apple / Google to receive push via APNS/FCM
    PushNotifications.register();

    // On success, we should be able to receive notifications
    PushNotifications.addListener('registration',
      (token: Token) => {
        // showToast('Push registration success');
        setToken1(JSON.stringify(token.value));
        console.log('Token-Firebase: ', token.value);
      }
    );

    // Some issue with our setup and push will not work
    PushNotifications.addListener('registrationError',
      (error: any) => {
        present('Error on registration: ' + JSON.stringify(error));
      }
    );
  };


  const resendCode = async (event: any) => {
    event.preventDefault();

    if (seg === 0 && min === 0) {
      setShowLoading(true);
      await UserService.resendCode(idUser!).then(res => res.data)
        .catch(error => {
          setShowLoading(false);
          present(`${error}`, [{ text: 'Ok' }]);
          console.error('Error:', error);
        }).then(response => {
          console.log('Success:', response);
          setShowLoading(false);
          if (response.status === HttpStatusCode.InvalidData) {
            present(`${response.message}`, [{ text: 'Ok' }]);
          } else if (response.status === HttpStatusCode.Success) {
            present('Reenviado con exito', [{ text: 'Ok' }]);
          }
        });
    } else {
      present(`Por favor espere 0${min}:${seg}`, [{ text: 'Ok' }]);
    }
  };

  // console.log(code);

  const SendDataRegisUser = async (event: any) => {
    event.preventDefault();

    // const code4D = code.num1 + code.num2 + code.num3 + code.num4;
    const code4D = code.num1 + code.num2 + code.num3 + code.num4;
    if (code4D.length !== 4) {
      present('Por favor introduzca todos los caracteres', [{ text: 'Ok' }]);
    } else {
      event.preventDefault();
      // const idUser = localStorage.getItem('Id');
      const data = JSON.stringify({
        id: idUser,
        code: code4D
      });
      const dataSignIn = JSON.stringify({
        phoneNumber: dataUsuario.phoneNumber,
        password: dataUsuario.password,
        tokenFirebase: token1
      });
      setShowLoading(true);

      await UserService.VerifyCodeRegister(data).then(res => res.data)
        .catch(error => {
          setShowLoading(false);
          present(`${error}`, [{ text: 'Ok' }]);
          console.error('Error:', error);
        }).then(response => {
          console.log('Success:', response);
          if (response.status === HttpStatusCode.InvalidData) {
            setShowLoading(false);
            present(`${response.message}`, [{ text: 'Ok' }]);
          } else if (response.status === HttpStatusCode.Success) {
            localStorage.clear();
            UserService.SignIn(dataSignIn).then(res => res.data)
              .catch(error => {
                setShowLoading(false);
                present('Error de conexión', [{ text: 'Ok' }]);
                console.error('Error:', error);
              }).then(response => {
                console.log('Success:', response);
                setShowLoading(false);
                if (response.status === HttpStatusCode.InvalidData) {
                  present(`${response.message}`, [{ text: 'Ok' }]);
                } else if (response.status === HttpStatusCode.Success) {
                  history.replace('/home');

                  localStorage.setItem('token', response.data.token);
                  localStorage.setItem('nameUser', response.name);
                  localStorage.setItem('idUser', response.id);
                  localStorage.setItem('phoneUser', response.phoneNumber);
                  localStorage.setItem('externalId', response.external_id);
                }
              });
          }
        });
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setSeg(seg = seg - 1);
      if (seg < 0) {
        setSeg(seg = seg + 59);
        setMin(min = min - 1);
        if (min === -1) {
          console.log('Terminar');
          clearInterval(interval);
          setSeg(seg = seg = 0);
          setMin(min = min = 0);
        }
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <IonPage>
      <IonHeader id='header'>
        <IonToolbar id='toolbar'>
          <IonButtons slot="start">
            <IonBackButton color='primary' defaultHref='/signUp' />
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent >
        <IonRow className='ion-justify-content-center ion-align-items-center' style={{ width: '100%', height: '100%', marginBuottom: '250px' }}>

          <VerificationCodeForm
            numberPhone={dataUsuario?.phoneNumber}
            funcResendCode={resendCode}
            min={min} seg={seg}
            valueInputs={code}
            addCode={setCode}
          />
          <IonButton expand="block" className='btnVerify' onClick={SendDataRegisUser} size='large' >Verificar y crear</IonButton>
        </IonRow>
        <IonLoading
          cssClass='my-custom-class'
          isOpen={showLoading}
          onDidDismiss={() => setShowLoading(showLoading)}
          message={'Por favor espere...'}
        />

      </IonContent>
    </IonPage>
  );
};

export default VerificationCode;
