import '../../OnboardingScreen/Styles/OnboardingScreen.css';
import '../Styles/Onboarding_7.css';
import { IonContent, IonImg, IonText } from '@ionic/react';

function Onboarding8 (props:any) {
  return <>
        <IonContent color="primary">
            <div className="Centrado">
                <IonImg class="img-O8" src="assets/icon/newIcons/Sync.svg" />
                <IonText class="txtimgS1 txt1-O8">Se están sincronizando tus pólizas</IonText>
                <div className="txt-ani">
                    <IonText class="txtimgS1 txt2-O8 ">__</IonText>
                </div>
            </div>
        </IonContent>
    </>;
}

export default Onboarding8;
