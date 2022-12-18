import { useEffect, useRef, useState } from 'react';
import { IonCol, IonContent, IonFooter, IonPage, IonRow, IonToolbar, useIonAlert } from '@ionic/react';
import { useHistory } from 'react-router';

import Button from '../../components/Button';
import Slide from './Components/Slides';
import './Styles/OnboardingScreen.css';
import { App } from '@capacitor/app';

const slideOpts = {
  initialSlide: 0,
  speed: 400
};

// interface Contenido {
//     id: number;
//     img: string;
//     imgclass: string,
//     txt: string,
//     txtclass: string,
// }

const OnboardingScreen: React.FC = () => {
  const history = useHistory();
  const [alert] = useIonAlert();
  const datos = [
    {
      id: 1,
      img: 'assets/icon/newIcons/Policies.svg',
      imgclass: 'img-O',
      txt: 'Agrega tus pólizas',
      txtclass: 'txtimgS1 txt1imgO',
      txt2: 'Agrégalas sin importar tu aseguradora, de manera rápida y segura.',
      txtclass2: 'txt2O'
    },
    {
      id: 2,
      img: 'assets/icon/newIcons/Search.svg',
      imgclass: 'img-O',
      txt: 'Tus pólizas siempre contigo',
      txtclass: 'txtimgS1 txt2imgO',
      txt2: 'Podrás administrar y revisar el detalle de tus pólizas en cualquier momento.',
      txtclass2: 'txt2O'
    },
    {
      id: 3,
      img: 'assets/icon/newIcons/Notifications.svg',
      imgclass: 'img-O',
      txt: 'Reporta tu siniestro desde la app',
      txtclass: 'txtimgS1 txt3imgO',
      txt2: 'Contacta a cualquiera de tus aseguradoras en caso de siniestro.',
      txtclass2: 'txt2O'
    }
  ];
  document.addEventListener('ionBackButton', (ev: any) => {
    ev.detail.register(100, () => {
      alert({
        cssClass: 'my-css',
        header: '¿Desea salir? ',
        message: 'Se cerrará la aplicación',
        buttons: [
          { text: 'Cancelar', handler: () => console.log('Cancel pressed') },
          { text: 'Aceptar', handler: () => App.exitApp() }
        ]
      });
    });
  });

  const slideRef = useRef<any>(null);
  const siguiente = async () => {
    const swiper = await slideRef.current.getSwiper();
    if (swiper.activeIndex + 1 === swiper.slides.length) {
      localStorage.setItem('Onboarding', 'No mostrar');
      history.replace('/Login-Register');
    } else {
      swiper.slideNext();
    }
  };

  const LogIn = () => {
    localStorage.setItem('Onboarding', 'No mostrar');
    history.replace('/signIn');
  };

  return <IonPage color="primary">

        <IonContent color="primary">
            <div>
              <Slide datos={datos} class="slideS1" pager={true} options={slideOpts} refe={slideRef}/>
          </div>
        </IonContent>

        <IonFooter class="ion-no-border">
          <IonToolbar color="primary">
            <IonRow>
              <IonCol size="1"></IonCol>
              <IonCol size="10">
                  {/* <Button class="btn boton" onClick={() => { slideRef.current.slideNext(); }} >Siguiente</Button> */}
                  <Button class="btn boton" onClick={() => { siguiente(); }} >Siguiente</Button>
                  <Button color="primary" class="btn boton2" onClick={() => LogIn()}>Iniciar Sesión</Button>
                  </IonCol>
              <IonCol size="1"></IonCol>
              </IonRow>
            </IonToolbar>
        </IonFooter>

    </IonPage>;
};

export default OnboardingScreen;
