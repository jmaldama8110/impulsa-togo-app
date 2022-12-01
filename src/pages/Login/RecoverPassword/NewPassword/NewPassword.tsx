import { IonBackButton, IonButton, IonButtons, IonCol, IonContent, IonGrid, IonHeader, IonImg, IonLabel, IonPage, IonRow, IonToolbar, useIonAlert } from '@ionic/react';
import { eye, eyeOff } from 'ionicons/icons';
import { useState } from 'react';
import { useHistory } from 'react-router';
import InputWithIcon from '../../Components/inputwithIcon';
import '../RestorePassword.css';
import '../../../Policies/Styles/Onboarding_7.css';
import UserService from '../../../../Services/UserService';
import { HttpStatusCode } from '../../../../constants/HttpStatusCode';

const NewPassword : React.FC = () => {
  const history = useHistory();
  let typeInput = 'password';
  let iconPassword = eye;
  const [passwordIsOK, setPasswordIsOK] = useState(false);
  const [passwordVerifyIsOK, setPasswordVerifyIsOK] = useState(false);
  const [clickPassword, setClickPassword] = useState(true);
  const [present] = useIonAlert();

  const [dataUser, setDataUser] = useState({
    password: '',
    verifyPassword: ''
  });
  let btnVisible = true;

  document.addEventListener('ionBackButton', (ev: any) => {
    ev.detail.register(100, () => {
      history.replace('/signIn');
    });
  });

  const patternPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/i;

  if (clickPassword) {
    iconPassword = eye;
    typeInput = 'password';
  } else {
    iconPassword = eyeOff;
    typeInput = 'text';
  }

  const EnviarDatos = async (event:any) => {
    event.preventDefault();
    const data = JSON.stringify({
      idUser: localStorage.getItem('idUser'),
      password: dataUser.verifyPassword
    });

    await UserService.newPassword(data).then(res => res.data)
      .then(response => {
        console.log(response);
        if (response.status === HttpStatusCode.Success) {
          present(response.message, [{ text: 'Aceptar' }]);
          localStorage.clear();
          history.replace('/signIn');
        } else if (response.status === HttpStatusCode.InvalidData) {
          present(`${response.message}`, [{ text: 'Aceptar' }]);
        }
      })
      .catch(error => {
        present('Error de conexión', [{ text: 'Aceptar' }]);
        console.error('Error:', error);
      });
  };

  const InputChange = (event:any) => {
    setDataUser({
      ...dataUser, [event.target.name]: event.target.value
    });

    if (event.target.name === 'password') {
      if (patternPassword.test(event.target.value)) {
        setPasswordIsOK(false);
      } else {
        setPasswordIsOK(true);
      }
    }

    if (event.target.name === 'verifyPassword') {
      if (event.target.value === dataUser.password) {
        setPasswordVerifyIsOK(false);
      } else {
        setPasswordVerifyIsOK(true);
      }
    }
  };

  if (dataUser.password !== '' && dataUser.verifyPassword !== '' && !passwordIsOK && !passwordVerifyIsOK) {
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
                                <IonLabel class=''>Nueva Contraseña</IonLabel>
                                <InputWithIcon placeHolder='Introduce tu nueva contraseña' change={InputChange}
                                    passwordIsOK={passwordIsOK} passwordVerifyIsOK='undefined'
                                    type={typeInput} name='password' icon={iconPassword}
                                    clicIcon = {() => setClickPassword(!clickPassword)}
                                />
                            </div>

                            <div className='Label2-R'>
                                <IonLabel class=''>Confirmar nueva contraseña</IonLabel>
                                <InputWithIcon placeHolder='Confirma tu nueva contraseña' change={InputChange}
                                    passwordIsOK='undefined' passwordverifyIsOK={passwordVerifyIsOK}
                                    type={typeInput} name='verifyPassword' icon={iconPassword}
                                    clicIcon = {() => setClickPassword(!clickPassword)}
                                />
                            </div>

                            <IonButton expand="block" class="btn-D btn-R" type='submit' disabled={btnVisible}>Continuar</IonButton>
                       </form>

                  </IonCol>
                  <IonCol size="1"></IonCol>
              </IonRow>
          </IonGrid>
      </IonContent>

    </IonPage>;
};

export default NewPassword;
