import { IonButton } from '@ionic/react';

function Button (props : any) {
  return (
        <IonButton ref={props.refe} expand={props.expand} color={props.color} class={props.class} onClick={props.onClick} href={props.href} disabled={props.disabled} strong={undefined} size={undefined} fill={undefined} mode={undefined} onIonBlur={undefined} onIonFocus={undefined} type={undefined} routerAnimation={undefined} rel={undefined} target={undefined} buttonType={undefined} download={undefined} shape={undefined}> {props.children} </IonButton>
  );
}

export default Button;
