import { IonBackButton, IonButtons, IonContent, IonHeader, IonImg, IonPage, IonToolbar } from '@ionic/react';
import { useHistory } from 'react-router';
import Form from './Components/form';

// CSS
import './Styles/SignUp.css';

const SignUp: React.FC = () => {
  const history = useHistory();
  document.addEventListener('ionBackButton', (ev: any) => {
    ev.detail.register(100, () => {
      history.replace('/Login-Register');
    });
  });
  return (
    <IonPage id='tab-1'>
      <IonHeader id='header'>
      <IonToolbar id='toolbar'>
        <IonButtons slot="start">
          <IonBackButton color='primary' defaultHref='/Login-Register' />
        </IonButtons>
      </IonToolbar>
    </IonHeader>
      <IonContent fullscreen>
        <IonImg src='assets/img/LogoSign.svg' className='imgLogo' />

            <Form />

      </IonContent>
    </IonPage>
  );
};

export default SignUp;
