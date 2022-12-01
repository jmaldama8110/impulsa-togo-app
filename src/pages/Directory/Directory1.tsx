import { IonPage, IonHeader, IonToolbar, IonButtons, IonBackButton, IonText, IonContent, IonCol, IonRow, IonButton, IonFooter, IonImg, IonSkeletonText } from '@ionic/react';
import { useState } from 'react';
import { useHistory } from 'react-router';
import './Styles/Directory1.css';
const Directory1: React.FC = () => {
  const history = useHistory();
  const [imgDidLoad, setImgDidLoad] = useState(false);

  document.addEventListener('ionBackButton', (ev: any) => {
    ev.detail.register(100, () => {
      history.replace('/home');
    });
  });

  return (
        <IonPage>
            <IonHeader color='primary' className='ion-no-border'>
                <IonToolbar color='primary'>
                    <IonButtons slot="start">
                        <IonBackButton color='secondary' defaultHref='/home' />
                    </IonButtons>
                </IonToolbar>
            </IonHeader>

            <IonContent color='primary' fullscreen>
                <IonRow>
                    <IonCol size='1'></IonCol>
                    <IonCol size='10'>
                        <div className='ion-text-center'>
                            <IonImg onIonImgDidLoad={() => setImgDidLoad(true)} className='imgPhone' src='assets/icon/newIcons/Call.svg' />
                            {
                                !imgDidLoad
                                  ? <IonSkeletonText animated className='imgPhoneSkeleton' />
                                  : <></>
                            }
                            <br />
                            <IonText className='textTitle ion-margin-top'>¡Llama a tu aseguradora!</IonText>
                            <br />
                            <IonText className='textSubtitle ion-margin-top'>Es importante que conozcas la aseguradora de tu póliza, o si lo prefieres puedes reportar tu siniestro directamente desde la sección <b>Mis Pólizas</b>, escogiendo la póliza correspondiente y en detalles pulsando el botón reportar siniestro.</IonText>
                            <IonImg className='imgPasos' src='assets/img/Directory/imgCentral3.png' />
                            {
                                !imgDidLoad
                                  ? <IonSkeletonText animated className='imgPasosSkeleton' />
                                  : <></>
                            }

                        </div>
                    </IonCol>
                    <IonCol size='1'></IonCol>
                </IonRow>

            </IonContent>

            <IonFooter className="ion-no-border">
                <IonToolbar color='primary'>
                    <IonRow>
                        <IonCol size='1'> </IonCol>
                        <IonCol size='10'>
                            <IonButton onClick={() => history.replace('/myPolicies')} className='btns' size='large' color='secondary' fill='solid' expand='block'><IonText color='primary'>Mis pólizas</IonText></IonButton>
                            <IonButton onClick={() => history.replace('/directory')} className='btns ion-margin-top ion-margin-bottom' size='large' color='secondary' fill='outline' expand='block'>Ver el directorio</IonButton>
                        </IonCol>
                        <IonCol size='1'></IonCol>
                    </IonRow>
                </IonToolbar>
            </IonFooter>

        </IonPage>
  );
};

export default Directory1;
