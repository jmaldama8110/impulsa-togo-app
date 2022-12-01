import { IonPage, IonHeader, IonToolbar, IonButtons, IonBackButton, IonContent, IonLoading, IonButton, IonRow, useIonAlert, useIonViewDidEnter } from '@ionic/react';
import { useEffect, useState } from 'react';
import './Styles/VerificationCode.css';
import { useHistory } from 'react-router';
import VerificationCodeForm from '../../components/VerificationCodeForm';
import PolicyService from '../../Services/PolicyService';
import { HttpStatusCode } from '../../constants/HttpStatusCode';

const VerificacionCodePolicy: React.FC = () => {
  let [seg, setSeg] = useState(59);
  let [min, setMin] = useState(4);
  const history = useHistory();
  const [present] = useIonAlert();
  const [showLoading, setShowLoading] = useState(false);
  const [externalIdClientPolice, setExternalClientIdPolice] = useState('');
  const [idUser, setIdUser] = useState('');
  // const dataUsuario = JSON.parse(localStorage.getItem('dataUser') as any);

  const [code, setCode] = useState({
    num1: '',
    num2: '',
    num3: '',
    num4: ''
  });

  useIonViewDidEnter(() => {
    setExternalClientIdPolice(localStorage.getItem('externalIdClientPolice') as string);
    setIdUser(localStorage.getItem('idUser') as string);
  });

  const resendCode = async (event:any) => {
    event.preventDefault();
    const data = JSON.stringify({
      idUser: idUser,
      externalId: externalIdClientPolice
    });
    if (seg === 0 && min === 0) {
      setShowLoading(true);
      await PolicyService.resendCode(data).then(res => res.data)
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

  const SendDataRegisUser = async (event: any) => {
    event.preventDefault();
    const code4D = code.num1 + code.num2 + code.num3 + code.num4;
    if (code4D.length !== 4) {
      present('Por favor introduzca todos los caracteres', [{ text: 'Ok' }]);
    } else {
      event.preventDefault();

      const data = JSON.stringify({
        externalIdClient: externalIdClientPolice,
        code: code4D,
        idUser: idUser
      });
      setShowLoading(true);

      await PolicyService.VerifyCode(data).then(res => res.data)
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
            history.replace('/autodownload');
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
            <IonBackButton color='primary' defaultHref='/registerPolicy' />
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent>
      <IonRow className='ion-justify-content-center ion-align-items-center' style={{ width: '100%', height: '100%', marginBuottom: '250px' }}>

        <VerificationCodeForm
          numberPhone={localStorage.getItem('externalPhoneNumber')}
          min={min} seg={seg}
          valueInputs={code}
          addCode={setCode}
          funcResendCode={resendCode}
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

export default VerificacionCodePolicy;
