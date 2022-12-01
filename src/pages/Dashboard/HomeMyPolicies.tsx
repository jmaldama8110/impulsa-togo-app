import { IonAlert, IonCol, IonContent, IonGrid, IonImg, IonPage, IonRow, useIonViewDidEnter } from '@ionic/react';
import { useEffect, useRef, useState } from 'react';
import PolicyService from '../../Services/PolicyService';
import { useHistory } from 'react-router';
import HomeTop from '../../components/HomeTop';
import SkeletonAcordion from './Components/Skeleton/SkeletonAcordion';
import '../Policies/Styles/Onboarding_7.css';
import './../../components/Styles/HomeTop.css';
import '../OnboardingScreen/Styles/OnboardingScreen.css';
import './Styles/HomeMyPolicies.css';
import Acordion from './Components/Acordion';

const MyPolicies: React.FC = () => {
  const [Datos, setDatos] = useState([] as any);
  const [showAlert1, setShowAlert1] = useState(false);
  const history = useHistory();
  const [viewMenu, setViewMenu] = useState(false);
  const [mostrar, setMostrar] = useState(true);

  // const { condi }: any = useParams();

  const slideRef = useRef<any>(document.createElement('ion-slides'));
  const idUser = localStorage.getItem('idUser');

  const obtener = async () => {
    const data = JSON.stringify({
      idUser
    });
    try {
      await PolicyService.MyPolicies(data).then(res => res.data)
        .then(response => {
          setDatos(response);
        });
    } catch (e) {
      console.log(e);
      setShowAlert1(true);
    }
  };

  useIonViewDidEnter(() => {
    obtener();
  });

  useEffect(() => {
    setDatos(([] as any));
  }, [history.location.pathname]);

  const cambiar = async () => {
    const url = localStorage.getItem('url');
    // const swiper = await slideRef.current.getSwiper();
    if (url != null) {
      slideRef.current.slideTo(Datos.length - 1);
      // setPos(Datos.length - 1);
      setMostrar(false);
      setTimeout(() => {
        setMostrar(true);
        localStorage.removeItem('url');
      }, 6000);
    } else {
      slideRef.current.slideTo(0);
    }
  };

  useEffect(() => {
    setViewMenu(false);
  }, [history.location.pathname]);

  document.addEventListener('ionBackButton', (ev: any) => {
    ev.detail.register(100, () => {
      history.replace('/home');
    });
  });

  return <IonPage>
    <IonContent>
        <IonGrid >
          <HomeTop avatar='assets/img/avatarHome.png' subtitle='¡Es bueno tenerte de vuelta!' hidden={false} viewMenu={viewMenu} setViewMenu={setViewMenu} />
            <IonRow className={viewMenu ? 'conetentOpen' : 'conetentClose'}>
              <IonCol size="0.5"></IonCol>
              <IonCol size="11">

                  <div className='btn-ContainerH'>
                      <IonImg onClick={() => history.replace('/Onboarding7')} class='btn-Add' src='assets/icon/addIcon.png'></IonImg>
                  </div>

                {Datos.length !== 0
                  ? <Acordion datos={Datos} obtener={obtener} mostrar={mostrar} refe={slideRef} cambiar={cambiar}/>
                  : <SkeletonAcordion/>}

              </IonCol>
              <IonAlert
                isOpen={showAlert1}
                onDidDismiss={() => setShowAlert1(false)}
                backdropDismiss = {false}
                subHeader={'Verifica tu conexión'}
                buttons={[
                  {
                    text: 'Aceptar',
                    handler: () => {
                      history.replace('/home');
                    }
                  }
                ]}
              />
              <IonCol size="0.5"></IonCol>
            </IonRow>
        </IonGrid>

    </IonContent>

  </IonPage>;
};

export default MyPolicies;
