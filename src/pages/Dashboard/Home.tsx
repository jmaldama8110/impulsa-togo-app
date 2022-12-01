import { IonCol, IonContent, IonGrid, IonImg, IonPage, IonRow, IonSkeletonText, IonText, useIonAlert, useIonViewWillEnter } from '@ionic/react';
import { useHistory } from 'react-router';
import HomeTop from './../../components/HomeTop';
// import './../../components/Styles/HomeTop.css';

import './Styles/Home.css';
import { App } from '@capacitor/app';
import { useEffect, useState } from 'react';
import { ActionPerformed, PushNotifications, PushNotificationSchema } from '@capacitor/push-notifications';

const Home: React.FC = () => {
  const history = useHistory();
  const [alert] = useIonAlert();
  const [imgDidLoad, setImgDidLoad] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [viewMenu, setViewMenu] = useState(false);
  const [countNotifications, setCountNotifications] = useState(0);

  useIonViewWillEnter(() => {
    setCountNotifications(parseInt(localStorage.getItem('countNotifications')!));
  });

  const signOff = () => {
    setViewMenu(false);
    localStorage.removeItem('idUser');
    localStorage.removeItem('externalId');
    localStorage.removeItem('nameUser');
    localStorage.removeItem('token');
    localStorage.removeItem('phoneUser');
    localStorage.removeItem('idPolicy');
    localStorage.removeItem('aliasPolicy');
    localStorage.removeItem('externalIdClientPolice');
    localStorage.removeItem('externalPhoneNumber');
    localStorage.removeItem('fechaUpdate');
    sessionStorage.clear();
    App.exitApp();
  };

  useEffect(() => {
    console.log('count: ', countNotifications);
    PushNotifications.addListener('pushNotificationReceived',
      (notification: PushNotificationSchema) => {
        console.log('Entregada');
        localStorage.setItem('countNotifications', localStorage.getItem('countNotifications') ? (parseInt(localStorage.getItem('countNotifications')!) + 1).toString() : (0 + 1).toString());
        setCountNotifications(parseInt(localStorage.getItem('countNotifications')!));
      }
    );

    PushNotifications.addListener('pushNotificationActionPerformed',
      (notification: ActionPerformed) => {
        console.log('Tap');
        localStorage.setItem('countNotifications', localStorage.getItem('countNotifications') ? (parseInt(localStorage.getItem('countNotifications')!) + 1).toString() : (0 + 1).toString());
        history.replace('/notify');
      }
    );
    console.log('count: ', countNotifications);
  }, []);

  useEffect(() => {
    setViewMenu(false);
  }, [history.location.pathname]);

  document.addEventListener('ionBackButton', (ev: any) => {
    if (history.location.pathname === '/home') {
      ev.detail.register(100, () => {
        alert({
          cssClass: 'my-css',
          header: '¿Desea salir? ',
          message: 'Se cerrará la sesión',
          buttons: [
            { text: 'Cancelar', handler: () => console.log('Cancel pressed') },
            { text: 'Aceptar', handler: () => signOff() }
          ]
        });
      });
    }
  });

  return (
        <IonPage>
            <IonContent fullscreen>
                <IonGrid>
                    <HomeTop avatar='assets/img/avatarHome.png' subtitle='¡Es bueno tenerte de vuelta!' hidden={false} viewMenu={viewMenu} setViewMenu={setViewMenu} />
                    <IonRow id='qwerty' className={viewMenu ? 'conetentOpen' : 'conetentClose ion-justify-content-center'}>

                        <IonCol size="11" >
                            <div className="ion-content-center" onClick={() => { history.replace('/myPolicies'); setViewMenu(false); }}>
                                <div id="content1">
                                    <IonRow>
                                        <IonCol size="5">
                                            <div className="ion-text-center" id="imgConten">
                                                <IonImg onIonImgDidLoad={() => setImgDidLoad(true)} src={'assets/img/Home/imgContent1.png'} />
                                                {
                                                    !imgDidLoad
                                                      ? <IonSkeletonText animated className='SkeletonImg' />
                                                      : <></>
                                                }

                                            </div>
                                        </IonCol>
                                        <IonCol size="7" className="textContent1">
                                            <IonText className="textContent1">
                                                <b>Mis Pólizas</b> <br /> Revisa toda la información de tus pólizas
                                            </IonText>
                                        </IonCol>
                                    </IonRow>
                                </div>
                            </div>
                        </IonCol>

                        <IonCol size="11" >
                            <div className="ion-content-center" onClick={() => history.replace('/directory1')} >
                                <div id="content2">
                                    <IonRow>
                                        <IonCol size="5">
                                            <div className="ion-text-center" id="imgConten">
                                                <IonImg src="assets/img/Home/imgContent2.png" />
                                                {
                                                    !imgDidLoad
                                                      ? <IonSkeletonText animated className='SkeletonImg' />
                                                      : <></>
                                                }
                                            </div>
                                        </IonCol>
                                        <IonCol size="7" className="textContent2">
                                            <IonText >
                                                <b>¿Tuviste un siniestro?</b> <br /> Déjanos ayudarte
                                            </IonText>
                                        </IonCol>
                                    </IonRow>
                                </div>
                            </div>
                        </IonCol>
                        <IonCol size="11" >
                            <div className="ion-content-center" onClick={() => { history.replace('/notify'); setViewMenu(false); }}>
                                {

                                    (countNotifications === 0)
                                      ? <></>
                                      : (countNotifications < 10) ? <></> : <></>
                                        //   ? <IonBadge color='danger' style={{ borderRadius: '50%', position: 'absolute', padding: '7px 9px 7px 9px', top: '7px', left: '94%' }}>{localStorage.getItem('countNotifications')}</IonBadge>
                                        //   : <IonBadge color='danger' style={{ borderRadius: '50%', position: 'absolute', padding: '7px', top: '7px', left: '94%' }}>{localStorage.getItem('countNotifications')}</IonBadge>
                                }
                                <div id="content3">
                                    <IonRow>
                                        <IonCol size="5">
                                            <div className="ion-text-center" id="imgConten">
                                                <IonImg src="assets/img/Home/imgContent3.png" />
                                                {
                                                    !imgDidLoad
                                                      ? <IonSkeletonText animated className='SkeletonImg' />
                                                      : <></>
                                                }
                                            </div>
                                        </IonCol>
                                        <IonCol size="7" className="textContent3">
                                            <IonText >
                                                <b>Notificaciones</b> <br /> Revisa tus avisos
                                            </IonText>
                                        </IonCol>
                                    </IonRow>
                                </div>
                            </div>
                        </IonCol>
                        {/* options1 */}
                        {/* <IonCol size="12" className="Options1">
                            <div className="Options">
                                <IonRow>
                                    <IonCol size="2" className="col">
                                        <div className="ion-text-center itemOptions">
                                            <IonIcon icon={wallet} color='primary'></IonIcon>
                                        </div>
                                    </IonCol>
                                    <IonCol size="8" className="col">
                                        <div className="ion-text-center">
                                            <IonText>Notificaciones</IonText>
                                        </div>
                                    </IonCol>
                                    <IonCol size="2 ">
                                        <div className="ion-text-center itemRightOptions">

                                            <IonIcon icon={chevronForward}></IonIcon>
                                        </div>
                                    </IonCol>
                                </IonRow>
                            </div>
                        </IonCol> */}
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage >
  );
};

export default Home;
