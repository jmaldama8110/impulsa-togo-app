import { IonBackButton, IonButton, IonButtons, IonCol, IonContent, IonFooter, IonGrid, IonHeader, IonImg, IonLabel, IonLoading, IonPage, IonRow, IonToolbar, useIonAlert } from '@ionic/react';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import Input from '../Components/input';
import './RestorePassword.css';
import '../../Policies/Styles/Onboarding_7.css';
import UserService from '../../../Services/UserService';
import { HttpStatusCode } from '../../../constants/HttpStatusCode';
import { SmsRetriever } from '@awesome-cordova-plugins/sms-retriever';

const RecoverPassword : React.FC = () => {
  const smsRetriever = SmsRetriever;
  const history = useHistory();
  const [present] = useIonAlert();
  const [tokenSMS, setTokenSMS] = useState();
  const [showLoading, setShowLoading] = useState(false);
  const [phoneIsOK, setphoneIsOK] = useState(false);
  const [fullNameIsOk, setFullNameIsOk] = useState(false);
  const [dataUser, setDataUser] = useState({
    fullName: '',
    phone: '',
    password: '',
    verifyPassword: ''
  });
  let btnVisible = true;

  document.addEventListener('ionBackButton', (ev: any) => {
    ev.detail.register(100, () => {
      history.replace('/signIn');
    });
  });

  const patternName = /^([a-zA-Z-ñÑáÁéÉiÍóÓúÚ ]){3,60}$/i;
  const patternPhone = /^[0-9]{10}$/i;
  useEffect(() => {
    smsRetriever.getAppHash()
      .then((res: any) => { console.log(`tokenSMSGenerado: ${res}`); setTokenSMS(res); })
      .catch((error: any) => console.log(`getError: ${error}`));
  }, []);

  const EnviarDatos = async (event:any) => {
    event.preventDefault();
    const data = JSON.stringify({
      fullName: dataUser.fullName.toUpperCase(),
      phoneNumber: dataUser.phone,
      tokenSMS: tokenSMS
    });

    setShowLoading(true);
    // console.log(data);

    await UserService.restorePassword(data).then(res => res.data)
      .then(response => {
        setShowLoading(false);
        if (response.status === HttpStatusCode.Success) {
          // console.log('esto responde', response.data);
          localStorage.setItem('phoneUser', response.data.phoneNumber);
          localStorage.setItem('idUser', response.data._id);
          history.replace('/verificationCodeRecover');
        } else if (response.status === HttpStatusCode.InvalidData) {
          present(response.message);
        }
      })
      .catch(error => {
        setShowLoading(false);
        present('Error de conexión', [{ text: 'Aceptar' }]);
        console.error('Error:', error);
      });
  };

  const InputChange = (event:any) => {
    setDataUser({
      ...dataUser, [event.target.name]: event.target.value
    });

    if (event.target.name === 'fullName') {
      if (patternName.test(event.target.value)) {
        setFullNameIsOk(false);
      } else {
        setFullNameIsOk(true);
      }
    }

    if (event.target.name === 'phone') {
      if (patternPhone.test(event.target.value)) {
        setphoneIsOK(false);
      } else {
        setphoneIsOK(true);
      }
    }
  };

  if (dataUser.phone !== '' && !phoneIsOK && dataUser.fullName !== '' && !fullNameIsOk) {
    btnVisible = false;
  } else {
    btnVisible = true;
  }

  return <IonPage>

      <IonHeader>
          <IonToolbar class='tool-R'>
              <IonButtons slot='start' onClick={() => history.replace('/signIn')}>
                  <IonBackButton color='primary' defaultHref='/signIn'></IonBackButton>
              </IonButtons>
          </IonToolbar>
      </IonHeader>

      <IonContent>
          <IonGrid>
              <IonRow>
                  <IonCol size="1"></IonCol>
                  <IonCol size="10">
                        <IonImg class='Img-R' src='assets/img/recoverPassword.svg' />

                       <form onSubmit={EnviarDatos}>
                            <div className='Label-R'>
                                <IonLabel className="label">Nombre Completo</IonLabel>
                                <Input
                                  className="label" change={InputChange}
                                  type='text' name='fullName'
                                  placeHolder='Introducir nombre completo'
                                  nameIsOk='undefined'
                                  firstSurnameIsOk='undefined'
                                  secondSurnameIsOk='undefined'
                                  emailIsOK='undefined'
                                  phoneIsOK='undefined'
                                  title={(e: any) => e.target.name}
                                />
                                <IonLabel class=''>Número de teléfono</IonLabel>
                                <Input change={InputChange}
                                    type='tel' name='phone' placeHolder='Introducir número teléfono'
                                    nameRequerido='undefined'
                                    emailIsOK='undefined'
                                    phoneIsOK={phoneIsOK}
                                    maxlength={10}
                                />
                            </div>

                            <IonFooter class="ion-no-border">
                                <IonToolbar color="secondary">
                                    <IonButton expand="block" class="btn-D btn-R" type='submit' disabled={btnVisible}>Continuar</IonButton>
                                </IonToolbar>
                            </IonFooter>
                       </form>

                       <IonLoading
                          cssClass='my-custom-class'
                          isOpen={showLoading}
                          onDidDismiss={() => setShowLoading(showLoading)}
                          message={'Por favor espere...'}
                        />

                  </IonCol>
                  <IonCol size="1"></IonCol>
              </IonRow>
          </IonGrid>
      </IonContent>

    </IonPage>;
};

export default RecoverPassword;
