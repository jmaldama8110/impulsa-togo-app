import { IonButton, IonCheckbox, IonCol, IonItem, IonLabel, IonLoading, IonRow, IonText, useIonAlert } from '@ionic/react';
import { eye, eyeOff } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import './../Styles/SignUp.css';
import Input from './input';
import InputWithIcon from './inputwithIcon';
// import CryptoJS from 'crypto-js';
import UserService from '../../../Services/UserService';
import { HttpStatusCode } from '../../../constants/HttpStatusCode';
import { SmsRetriever } from '@awesome-cordova-plugins/sms-retriever';
import { FileOpener } from '@awesome-cordova-plugins/file-opener';
import { File } from '@ionic-native/file';
import PolicyService from '../../../Services/PolicyService';

function Form (props: any) {
  const history = useHistory();
  const [present] = useIonAlert();
  const smsRetriever = SmsRetriever;
  let iconPassword = eye;
  let typeInput = 'password';
  const [nameIsOk, setNameIsOk] = useState(false);
  const [firstSurnameIsOk, setFirstsurnameIsOk] = useState(false);
  const [secondSurnameIsOk, setSecondSurnameIsOk] = useState(false);
  const [emailIsOK, setemailIsOK] = useState(false);
  const [phoneIsOK, setphoneIsOK] = useState(false);
  const [passwordIsOK, setPasswordIsOK] = useState(false);
  const [passwordVerifyIsOK, setPasswordVerifyIsOK] = useState(false);
  const [acceptTerm, setAcceptTerm] = useState(false);
  const [clickPassword, setClickPassword] = useState(true);
  const [showLoading, setShowLoading] = useState(false);
  const [tokenSMS, setTokenSMS] = useState();
  let btnVisible = true;

  const patternPhone = /^[0-9]{10}$/i;
  const patternName = /^([a-zA-Z-ñÑáÁéÉiÍóÓúÚ ]){3,60}$/i;
  const patternEmail = /^(?:[^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*|"[^\n"]+")@(?:[^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{1,63}$/i;
  const patternPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/i;
  // const patternPassword = /^(?=.*\d)(?=.*[@!#$%&*])(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/i;

  if (clickPassword) {
    iconPassword = eye;
    typeInput = 'password';
  } else {
    iconPassword = eyeOff;
    typeInput = 'text';
  }

  const [dataUser, setDataUser] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    birthday: '',
    email: '',
    phone: '',
    password: '',
    verifypassword: ''
  });

  useEffect(() => {
    smsRetriever.getAppHash()
      .then((res: any) => { console.log(`tokenSMSGenerado: ${res}`); setTokenSMS(res); })
      .catch((error: any) => console.log(`getError: ${error}`));
  }, []);

  const CapturarDatos = async (event: any) => {
    event.preventDefault();
    const data = JSON.stringify({
      firstName: dataUser.firstName,
      middleName: dataUser.middleName,
      lastName: dataUser.lastName,
      birthday: dataUser.birthday,
      email: dataUser.email,
      phoneNumber: dataUser.phone,
      password: dataUser.verifypassword,
      tokenSMS: tokenSMS
    });
    setShowLoading(true);

    await UserService.SignUp(data).then(res => res.data)
      .catch(error => {
        setShowLoading(false);
        present('Error de conexión', [{ text: 'Aceptar' }]);
        console.error('Error:', error);
      }).then(response => {
        console.log('Success:', response);
        setShowLoading(false);
        if (response.status === HttpStatusCode.ExistsData) {
          present(`${response.message}`, [{ text: 'Aceptar' }]);
          history.replace('/signIn');
        } else if (response.status === HttpStatusCode.NotFound) {
          present(`${response.message}`, [{ text: 'Aceptar' }]);
        } else if (response.status === HttpStatusCode.InvalidData) {
          present(`${response.message}`, [{ text: 'Aceptar' }]);
        } else if (response.status === HttpStatusCode.Success) {
          history.replace('/verficationCode');
          localStorage.setItem('Id', response.data);
          localStorage.setItem('dataUser', data);
        }
      });
  };

  const handleInputChange = (event: any) => {
    setDataUser({
      ...dataUser, [event.target.name]: event.target.value
    });

    if (event.target.name === 'firstName') {
      if (patternName.test(event.target.value)) {
        setNameIsOk(false);
      } else {
        setNameIsOk(true);
      }
    }
    if (event.target.name === 'middleName') {
      if (patternName.test(event.target.value)) {
        setFirstsurnameIsOk(false);
      } else {
        setFirstsurnameIsOk(true);
      }
    }
    if (event.target.name === 'lastName') {
      if (patternName.test(event.target.value)) {
        setSecondSurnameIsOk(false);
      } else {
        setSecondSurnameIsOk(true);
      }
    }

    if (event.target.name === 'email') {
      if (patternEmail.test(event.target.value)) {
        setemailIsOK(false);
      } else {
        setemailIsOK(true);
      }
    }

    if (event.target.name === 'phone') {
      if (patternPhone.test(event.target.value)) {
        setphoneIsOK(false);
      } else {
        setphoneIsOK(true);
      }
    }

    if (event.target.name === 'password') {
      if (patternPassword.test(event.target.value)) {
        setPasswordIsOK(false);
        console.log(passwordIsOK);
      } else {
        setPasswordIsOK(true);
      }
    }

    if (event.target.name === 'verifypassword') {
      if (event.target.value === dataUser.password) {
        setPasswordVerifyIsOK(false);
      } else {
        setPasswordVerifyIsOK(true);
      }
    }

    if (event.target.checked !== undefined) {
      if (event.target.checked) {
        setAcceptTerm(true);
      } else {
        setAcceptTerm(false);
      }
    }
  };
  if (dataUser.firstName !== '' && dataUser.middleName !== '' && dataUser.lastName !== '' && dataUser.email !== '' && dataUser.phone !== '' && dataUser.password !== '' && dataUser.verifypassword !== '' && dataUser.password === dataUser.verifypassword && !nameIsOk && !emailIsOK && !phoneIsOK && !passwordIsOK && !passwordVerifyIsOK && acceptTerm) {
    btnVisible = false;
  } else {
    btnVisible = true;
  }

  // eslint-disable-next-line no-unused-vars
  const downloadPdf = async () => {
    File.createDir(
      File.externalApplicationStorageDirectory,
      'Pólizas Impulsa',
      true
    ).then(() => {
      File.checkFile(
        File.externalApplicationStorageDirectory + '/Pólizas Impulsa/',
        'PrivacyPolicie.pdf'
      ).then(() => {
        try {
          FileOpener.open(File.externalApplicationStorageDirectory + '/Pólizas Impulsa/PrivacyPolicie.pdf',
            'application/pdf').then(() => { })
            .catch(e => alert('Error opening file' + JSON.stringify(e)));
        } catch (err) {
          present('No encontrado');
        }
      })
        .catch(async () => {
          setShowLoading(true);

          try {
            await PolicyService.GetPrivacyPolicie().then(res => res.data)
              .then(
                response => {
                  console.log('Respuesta', response);
                  setShowLoading(false);

                  try {
                    // ----Descarga----
                    File.writeFile(
                      File.externalApplicationStorageDirectory + '/Pólizas Impulsa',
                      'PrivacyPolicie.pdf',
                      response
                    ).then(() => {
                      FileOpener.open(File.externalApplicationStorageDirectory + '/Pólizas Impulsa/PrivacyPolicie.pdf',
                        'application/pdf').then(() => { })
                        .catch(e => alert('Error opening file' + JSON.stringify(e)));
                    })
                      .catch((error) => {
                        console.log(error);
                      });
                  } catch (e) {
                    setShowLoading(false);
                    present('El error es: ' + e);
                  }
                })
              .catch((e) => {
                console.log(e);
                setShowLoading(false);
                present('El archivo no se encuentra almacenado en el servidor.', [{ text: 'Aceptar' }]);
              });
          } catch (e) {
            setShowLoading(false);
            present('Error de conexión', [{ text: 'Aceptar' }]);
            console.log(e);
          }
        });
    });
  };

  return (
    <form method="" id="fromSignUp" onSubmit={CapturarDatos}>

      <IonRow className="row">
        <IonCol size='1'></IonCol>
        <IonCol size='10'>

          <IonLabel className="label">Nombre(s)</IonLabel>
          <Input
            className="label" change={handleInputChange}
            type='text' name='firstName'
            placeHolder='Introducir nombre'
            nameIsOk={nameIsOk}
            firstSurnameIsOk='undefined'
            secondSurnameIsOk='undefined'
            emailIsOK='undefined'
            phoneIsOK='undefined'
            title={(e: any) => e.target.name}
          />

          <IonLabel className="label">Primer Apellido</IonLabel>
          <Input
            className="label" change={handleInputChange}
            type='text' name='middleName'
            placeHolder='Introducir apellido'
            nameIsOk='undefined'
            firstSurnameIsOk={firstSurnameIsOk}
            secondSurnameIsOk='undefined'
            emailIsOK='undefined'
            phoneIsOK='undefined'
            title={(event: any) => event.target.name}
          />

          <IonLabel className="label">Segundo Apellido</IonLabel>
          <Input
            className="label" change={handleInputChange}
            type='text' name='lastName'
            placeHolder='Introducir apellido'
            nameIsOk='undefined'
            firstSurnameIsOk='undefined'
            secondSurnameIsOk={secondSurnameIsOk}
            emailIsOK='undefined'
            phoneIsOK='undefined'
            title={(e: any) => e.target.name}
          />
          <IonLabel className="label">Fecha de nacimiento</IonLabel>
          <Input
            className="label" change={handleInputChange}
            type='date' name='birthday'
            nameIsOk='undefined'
            firstSurnameIsOk='undefined'
            secondSurnameIsOk='undefined'
            emailIsOK='undefined'
            phoneIsOK='undefined'
            title={(e: any) => e.target.name}
          />

          <IonLabel className="label">Correo electronico</IonLabel>
          <Input className="label" change={handleInputChange}
            type='email' name='email' placeHolder='Introducir Correo'

            nameRequerido='undefined'
            firstSurnameIsOk='undefined'
            secondSurnameIsOk='undefined'
            emailIsOK={emailIsOK}
            phoneIsOK='undefined'
            title={(e: any) => e.target.name}
          />

          <IonLabel className="label">Número Teléfonico</IonLabel>
          <Input
            className="label" change={handleInputChange}
            type='tel' name='phone'
            placeHolder='Número de teléfono'
            nameRequerido='undefined'
            firstSurnameIsOk='undefined'
            secondSurnameIsOk='undefined'
            emailIsOK='undefined'
            phoneIsOK={phoneIsOK}
            maxlength={10}
            title={(e: any) => e.target.name}
          />

          <IonLabel className="label">Contraseña</IonLabel>
          <InputWithIcon passwordIsOK={passwordIsOK}
            passwordverifyIsOK='undefined'
            change={handleInputChange} type={typeInput}
            name='password' placeHolder='Introducir contraseña'
            icon={iconPassword}
            clicIcon={() => setClickPassword(!clickPassword)} />

          <IonLabel className="label">Verificar contraseña</IonLabel>
          <InputWithIcon
            passwordIsOK='undefined'
            passwordverifyIsOK={passwordVerifyIsOK}
            change={handleInputChange} type={typeInput}
            name='verifypassword' placeHolder='Verifica la contraseña'
            icon={iconPassword}
            clicIcon={() => setClickPassword(!clickPassword)} />

          <IonItem lines="none" className='ion-no-border'>
            <IonCheckbox onIonChange={handleInputChange} slot="start" color="primary" className='checkBoxTerminos' />
            <IonText className='textCheckBox' >Acepto los <a onClick={() => history.push('/privacyPolicie')}>Términos y condiciones del Servicio</a></IonText>
          </IonItem>

          <IonButton expand="block" style={{ marginTop: '25px' }} className='btnContinuar' color='primary' size='large' type="submit" disabled={btnVisible}>Continuar</IonButton>
          <IonLoading
            cssClass='my-custom-class'
            isOpen={showLoading}
            onDidDismiss={() => setShowLoading(showLoading)}
            message={'Por favor espere...'}
          />

        </IonCol>
        <IonCol size='1'></IonCol>
      </IonRow>
    </form>
  );
}

export default Form;
