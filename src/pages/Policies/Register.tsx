import { useIonViewDidEnter, IonPage, IonContent, IonLoading, IonButton, IonCol, IonLabel, IonRow, IonImg, useIonAlert, IonText, IonFooter, IonToolbar } from '@ionic/react';
import { useState } from 'react';
import { useHistory } from 'react-router';
import { HttpStatusCode } from '../../constants/HttpStatusCode';
import PolicyService from '../../Services/PolicyService';
import Input from '../Login/Components/input';
import './Styles/RegisterPolicy.css';

const RegisterPolice: React.FC = () => {
  const history = useHistory();
  const [showLoading, setShowLoading] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [phoneUser, setPhoneUser] = useState('');
  const [idUser, setidUser] = useState('');
  const [numPolice, setNumPolice] = useState('');
  const [present] = useIonAlert();
  const [deactivateButton, setDeactivateButton] = useState(true);

  useIonViewDidEnter(() => {
    setPhoneUser(localStorage.getItem('phoneUser') as string);
    setidUser(localStorage.getItem('idUser') as string);
  });

  // console.log(numPolice + phoneUser);

  document.addEventListener('ionBackButton', (ev: any) => {
    ev.detail.register(100, () => {
      history.replace('/Onboarding7');
    });
  });

  const handleInputChange = (event: any) => {
    setNumPolice(event.target.value);
    if (event.target.value.length > 4) {
      setDeactivateButton(false);
    } else {
      setDeactivateButton(true);
    }
  };

  const SendPolice = async (event: any) => {
    event.preventDefault();
    const data = JSON.stringify({
      idClient: idUser,
      numPolice: numPolice
    });
    setShowLoading(true);

    PolicyService.getPolice(data).then(res => res.data)
      .catch(error => {
        setShowLoading(false);
        present(`${error}`, [{ text: 'Ok' }]);
        console.error('Error:', error);
      }).then(response => {
        console.log('Success:', response);
        setShowLoading(false);
        if (response.status === HttpStatusCode.DataNotFound) {
          present(`${response.message}`, [{ text: 'Ok' }]);
        } else if (response.status === HttpStatusCode.Success) {
          history.replace(`/verificationCodePolicies/${idUser}`);
          localStorage.setItem('externalIdClientPolice', response.clientExternalId);
          localStorage.setItem('externalPhoneNumber', response.phoneNumber);
        } else if (response.status === HttpStatusCode.InvalidData) {
          present(`${response.message}`, [{ text: 'Aceptar' }]);
          // history.replace('/myPolicies');
        }
      });
  };

  return (
    <IonPage>
      <IonContent>
        <IonImg src='assets/img/LogoSign.svg' className='imgLogoRPolicy' />
        <IonRow>
          <IonCol size='1' ></IonCol>
          <IonCol size='10' >
            <form method="">
              <IonLabel className="label">Número de póliza</IonLabel>
              <Input className="label" change={handleInputChange}
                type='text' name='numPolice' placeHolder='Introducir número de póliza.'
                nameRequerido='undefined'
                emailIsOK='undefined'
                phoneIsOK='undefined'
              />
              <IonText className="txt" color='danger' hidden={!deactivateButton}>Mínimo 5 caracteres</IonText>
            </form>
          </IonCol>
          <IonCol size='1' ></IonCol>
        </IonRow>

        <IonLoading
          cssClass='my-custom-class'
          isOpen={showLoading}
          onDidDismiss={() => setShowLoading(showLoading)}
          message={'Por favor espere...'}
        />
      </IonContent>
      <IonFooter className="ion-no-border">
          <IonToolbar>
            <IonRow>
              <IonCol size='1'> </IonCol>
              <IonCol size='10'>
              <IonButton expand="block" className='btnContinuar btnSubmit' color='primary' size='large' onClick={(e) => SendPolice(e)} disabled={deactivateButton} >Continuar</IonButton>
              <IonButton expand="block" className='btnContinuar btnBack' fill='outline' color='primary' size='large' onClick={() => history.replace('/Onboarding7')}>Regresar</IonButton>
              {/* <IonButton expand="block" className='btnContinuar btnBack' fill='outline' color='primary' size='large' onClick={() => history.push(`/verificationCodePolicies/${idUser}`)}>IR</IonButton> */}
              </IonCol>
              <IonCol size='1'></IonCol>
            </IonRow>
          </IonToolbar>
        </IonFooter>
    </IonPage>
  );
};

export default RegisterPolice;
