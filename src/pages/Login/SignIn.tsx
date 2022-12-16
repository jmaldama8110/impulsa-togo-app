import { IonBackButton, IonButton, IonButtons, IonCol, IonContent, IonHeader, IonLabel, IonLoading, IonPage, IonRow, IonText, IonToolbar, useIonAlert } from '@ionic/react';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import './Styles/SignIn.css';
import Input from './Components/input';
import InputWithIcon from './Components/inputwithIcon';
import UserService from '../../Services/UserService';
import { HttpStatusCode } from '../../constants/HttpStatusCode';
import { Firebase } from '@ionic-native/firebase';

import { PushNotifications, Token } from '@capacitor/push-notifications';
import { Toast } from '@capacitor/toast';

const SignIn: React.FC = () => {
  const history = useHistory();

  const [showLoading, setShowLoading] = useState(false);
  const [present] = useIonAlert();

  const nullEntry: any[] = [];
  // eslint-disable-next-line no-unused-vars
  const [notifications, setnotifications] = useState(nullEntry);
  const [token1, setToken1] = useState<any>();

  document.addEventListener('ionBackButton', (ev: any) => {
    ev.detail.register(100, () => {
      history.replace('/Login-Register');
    });
  });
  /// ////////////////////////////////////////////////////////////

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

  const showToast = async (msg: string) => {
    await Toast.show({
      text: msg
    });
  };

  /// //////////////////////////////////////////////////////////////

  const [dataUser, setDataUser] = useState({
    phone: '',
    password: ''
  });

  const CapturarDatos = async (event: any) => {
    event.preventDefault();
    const data = JSON.stringify({
      phoneNumber: dataUser.phone,
      password: dataUser.password,
      tokenFirebase: token1
    });
    setShowLoading(true);

    await UserService.SignIn(data).then(res => res.data)
      .catch(error => {
        setShowLoading(false);
        present('Error de conexión', [{ text: 'Ok' }]);
        console.error('Error:', error);
      }).then(response => {
        // console.log('Success:', response);
        setShowLoading(false);
        if (response.status === HttpStatusCode.InvalidData) {
          present(`${response.message}`, [{ text: 'Ok' }]);
        } else if (response.status === HttpStatusCode.Success) {
          // localStorage.clear();
          history.replace('/home');

          localStorage.setItem('token', response.data.token);
          localStorage.setItem('nameUser', response.name);
          localStorage.setItem('idUser', response.id);
          localStorage.setItem('phoneUser', response.phoneNumber);
          localStorage.setItem('externalId', response.external_id);
        }
      });
  };

  const handleInputChange = (event: any) => {
    setDataUser({
      ...dataUser, [event.target.name]: event.target.value
    });
  };

  return (
    <IonPage>
      <IonHeader id='header'>
        <IonToolbar id='toolbar'>
          <IonButtons slot="start">
            <IonBackButton color='primary' defaultHref='/Login-Register' />
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <div className="Centrado">
          <img src='assets/img/LogoSign.svg' className='imgLogoSignIn2' />
          {/* {
            !imgDidLoad
              ? <IonSkeletonText animated className='imgLogoSignIn2Skeleton' style={{ width: '249px', height: '90px' }} />
              : <></>
          } */}
        </div>

        <IonRow className='row'>
          <IonCol size='1'> </IonCol>
          <IonCol size='10'>
            <form onSubmit={CapturarDatos} method="">
              <IonLabel className="label">Número de teléfono</IonLabel>
              <Input className="label" change={handleInputChange}
                type='tel' name='phone' placeHolder='Introducir número teléfono'
                nameRequerido='undefined'
                emailIsOK='undefined'
                phoneIsOK='undefined'
                maxlength={10}
              />

              <IonLabel className="label">Contraseña</IonLabel>
              <InputWithIcon passwordIsOK='undefined'
                change={handleInputChange}
                name='password' placeHolder='Introducir contraseña'
                // clicIcon={() => setClickPassword(!clickPassword)}
              />

              <IonButton expand="block" className='btnsignIn' color='primary' size='large' type="submit">Iniciar sesión</IonButton>
              <IonLoading
                cssClass='my-custom-class'
                isOpen={showLoading}
                onDidDismiss={() => setShowLoading(showLoading)}
                message={'Por favor espere...'}
              />
            </form>
          </IonCol>
          <IonCol size='1'></IonCol>

          <IonCol size='1'> </IonCol>
          <IonCol size='10' className='textOptions1'>
            <div className='ion-text-center'>
              <IonText color='primary' onClick={() => history.replace('/recoverPassword')}>
                ¿Olvidaste la contraseña?
              </IonText>
            </div>
          </IonCol>
          <IonCol size='1'></IonCol>

          <IonCol size='1'> </IonCol>
          <IonCol size='10' className='textOptions2'>
            <div className='ion-text-center'>
              <IonText>
                ¿Nuevo usuario? <b><IonText color='primary' onClick={() => history.replace('/signUp')}>Crear una cuenta</IonText></b>
              </IonText>
            </div>
          </IonCol>
          <IonCol size='1'></IonCol>

        </IonRow>
      </IonContent>
    </IonPage >
  );
};

export default SignIn;
