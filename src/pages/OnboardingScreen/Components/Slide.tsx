import { IonSlide } from '@ionic/react';

function Slide (props: any) {
  return (
        <>
            <IonSlide class={props.class}>
                {props.children}
            </IonSlide>
        </>
  );
}

export default Slide;
