import { IonRow, IonCol, IonIcon, IonToggle } from '@ionic/react';
import { documentOutline } from 'ionicons/icons';
import { useState } from 'react';
import '../../OnboardingScreen/Styles/OnboardingScreen.css';
import '../Styles/Onboarding_7.css';

function Toggle (props: any) {
  const [checkedd, setCheckedd] = useState(true);
  //   const [num, setCode] = useState([...Array(props.num)].map(() => ''));

  return <>
        <IonRow>
            <IonCol class="w" size="2">
                <IonIcon class="icon-D" icon={documentOutline} />
            </IonCol>
            <IonCol size="7.5" class="col2-D">
                {/* {Num} */}
                {props.alias}
            </IonCol>
            <IonCol size="2.5" class="Col3-D">
                <IonToggle checked={checkedd} onIonChange={e => { setCheckedd(e.detail.checked); props.addPoliceFunc(e, props.idx, props.id); }} />
            </IonCol>
        </IonRow>
    </>;
}

export default Toggle;
