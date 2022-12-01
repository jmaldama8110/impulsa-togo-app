
import { IonPage, IonHeader, IonToolbar, IonButtons, IonBackButton, IonContent, IonLoading, IonButton, IonRow, useIonAlert, useIonViewDidEnter } from '@ionic/react';
import { useEffect, useState } from 'react';
import '../../Styles/VerificationCode.css';
import { useHistory } from 'react-router';
import { HttpStatusCode } from '../../../../constants/HttpStatusCode';
import VerificationCodeForm from '../../../../components/VerificationCodeForm';
import UserService from '../../../../Services/UserService';

const VerificacionCodeRecover: React.FC = () => {
  let [seg, setSeg] = useState(59);
  let [min, setMin] = useState(4);
  const history = useHistory();
  const [present] = useIonAlert();
  const [showLoading, setShowLoading] = useState(false);
  const [phone, setPhone] = useState('');
  const [id, setId] = useState('');
  // const dataUsuario = JSON.parse(localStorage.getItem('dataUser') as any);

  document.addEventListener('ionBackButton', (ev: any) => {
    ev.detail.register(100, () => {
      history.replace('/recoverPassword');
    });
  });

  const [code, setCode] = useState({
    num1: '',
    num2: '',
    num3: '',
    num4: ''
  });

  useIonViewDidEnter(() => {
    setId(localStorage.getItem('idUser') as string);
    setPhone(localStorage.getItem('phoneUser') as string);
  });

  const resendCode = async (event:any) => {
    event.preventDefault();
    const data = JSON.stringify({
      id: id,
      phoneNumber: phone
    });
    if (seg === 0 && min === 0) {
      setShowLoading(true);
      await UserService.resendRestoreCode(data).then(res => res.data)
        .then(response => {
          console.log('Success:', response);
          setShowLoading(false);
          if (response.status === HttpStatusCode.InvalidData) {
            present(`${response.message}`, [{ text: 'Aceptar' }]);
          } else if (response.status === HttpStatusCode.Success) {
            present('Reenviado con éxito', [{ text: 'Aceptar' }]);
            setSeg(seg = 59);
            setMin(min = 4);
          }
        })
        .catch(error => {
          setShowLoading(false);
          present(`${error}`, [{ text: 'Ok' }]);
          console.error('Error:', error);
        });
    } else {
      present(`Por favor espere 0${min}:${seg}`, [{ text: 'Ok' }]);
    }
  };

  const SendDataRestore = async (event: any) => {
    event.preventDefault();
    const code4D = code.num1 + code.num2 + code.num3 + code.num4;
    if (code4D.length !== 4) {
      present('Por favor introduzca todos los caracteres', [{ text: 'Ok' }]);
    } else {
      event.preventDefault();

      const data = JSON.stringify({
        id: id,
        code: code4D
      });
      setShowLoading(true);

      await UserService.restoreVerificationCode(data).then(res => res.data)
        .then(response => {
          setShowLoading(false);
          if (response.status === HttpStatusCode.InvalidData) {
            present(`${response.message}`, [{ text: 'Aceptar' }]);
          } else if (response.status === HttpStatusCode.Success) {
            // localStorage.setItem('idUser', response.data);
            // console.log('Success:', response);
            history.replace('/newPassword');
          }
        })
        .catch(error => {
          setShowLoading(false);
          present('Error de conexión', [{ text: 'Aceptar' }]);
          console.error('Error:', error);
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
  }, [resendCode]);

  return (
    <IonPage>
      <IonHeader id='header'>
        <IonToolbar id='toolbar'>
          <IonButtons slot="start">
            <IonBackButton color='primary' defaultHref='/recoverPassword' />
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent>
      <IonRow className='ion-justify-content-center ion-align-items-center' style={{ width: '100%', height: '100%', marginBuottom: '250px' }}>

        <VerificationCodeForm
          numberPhone={phone}
          min={min} seg={seg}
          valueInputs={code}
          addCode={setCode}
          funcResendCode={resendCode}
        />

<IonButton expand="block" className='btnVerify' onClick={SendDataRestore} size='large' >Verificar y crear</IonButton>

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

export default VerificacionCodeRecover;
