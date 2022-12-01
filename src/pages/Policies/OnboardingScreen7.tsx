import { IonBackButton, IonButtons, IonCol, IonContent, IonFooter, IonHeader, IonImg, IonPage, IonRow, IonText, IonToolbar } from '@ionic/react';
import { useHistory } from 'react-router';
import Button from '../../components/Button';
import '../OnboardingScreen/Styles/OnboardingScreen.css';
import './Styles/Onboarding_7.css';

const Onboarding7: React.FC = () => {
  const history = useHistory();
  document.addEventListener('ionBackButton', (ev: any) => {
    ev.detail.register(100, () => {
      history.replace('/myPolicies');
    });
  });
  return <IonPage>

        <IonHeader id='header'>
            <IonToolbar id='toolbar'>
                <IonButtons slot="start">
                    <IonBackButton color='secondary' defaultHref='/myPolicies' />
                    {/* <IonText>Regresar</IonText> */}
                </IonButtons>
            </IonToolbar>
        </IonHeader>

        <IonContent color="primary" fullscreen>

            <IonImg class="img-O7" src="assets/icon/newIcons/Alert.svg" />

            <IonRow>
                <IonCol size="1"></IonCol>
                <IonCol size="10">
                    <div className="Centrado">
                        <IonText class="txtimgS1 txt1-O7">Sincronizar pólizas de terceros.</IonText>
                        <IonText class="txt2-O7">
                          Recuerda que esta opción es para agregar pólizas de terceros, las tuyas aparecen automáticamente. Las pólizas de terceros se asocian
                          con su número de teléfono, la persona cuyas pólizas estás solicitando sincronizar recibirá un código de verificación que te tendrá que proporcionar.
                        </IonText>

                    </div>
                </IonCol>
                <IonCol size="1"></IonCol>
            </IonRow>
        </IonContent>

        <IonFooter class="ion-no-border">
          <IonToolbar color="primary">
            <IonRow>
              <IonCol size="1"></IonCol>
                <IonCol size="10">
                    <Button expand="block" class="btn-D btn-O7" onClick={() => history.replace('/registerPolicy')}>Asociar pólizas</Button>
                </IonCol>
              <IonCol size="1"></IonCol>
              </IonRow>
            </IonToolbar>
        </IonFooter>

    </IonPage>;
};

export default Onboarding7;
