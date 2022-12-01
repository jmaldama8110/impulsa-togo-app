// import { Fragment } from "react";

import { IonRow, IonCol, IonImg, IonText, IonItem, IonIcon } from '@ionic/react';
import * as icon from 'ionicons/icons';
import { CallNumber } from '@awesome-cordova-plugins/call-number';
import { useState } from 'react';
import businessServices from '../../../Services/BusinessServices';

function CardBusiness (props: any) {
  const [imgExists, setImgExists] = useState(true);
  const callNumber = CallNumber;
  function failedImageLoad (e: any) {
    console.log(e);
    setImgExists(false);
  }

  const call = (phoneNumber: string) => {
    callNumber.callNumber(phoneNumber, true)
      .then(res => console.log('Llamando!', res))
      .catch(err => console.log('Error', err));
  };

  const sendEmail = (insurance:string) => {
    const fullName = localStorage.getItem('nameUser');
    const bodyRequest = {
      fullName: fullName,
      insurance: insurance
    };

    businessServices.SendEmailSiniestro(bodyRequest).then(() => {
      console.log('Email enviado con exito');
      // alert('Email enviado con exito');
    }).catch(() => {
      console.log('Error');
    });
  };

  return <div onClick={() => { sendEmail(props.dato.name); call(props.dato.phoneNumber); }} className='contents' key={props.dato.name} style={{ background: `${props.dato.colorCode}` }} >
  <IonRow className='ion-justify-content-center'>
    <IonCol size='3'>
      <div className="imgContents ion-text-center">
        <IonImg onIonError={(e) => failedImageLoad(e)} className='logoEnterprise' src={imgExists ? `assets/company-logos/${props.dato.iconCode || 'DEFAULT'}.png` : 'assets/company-logos/DEFAULT.png'} />
      </div>

    </IonCol>
    <IonCol size='7' className='ion-margin-vertical ion-padding-top' style={{ marginTop: 'auto', marginBottom: 'auto' }}>
      <div className='ion-text-center divText'>
        <IonText className='name'>{props.dato.name}</IonText>
      </div>
    </IonCol>
    <IonCol className='colItem' size='2'>
      <div className="iconsArrow">
        <IonItem slot='start' className="" lines='none' color='transparent'>
          <IonIcon size='large' color='secondary' icon={icon.chevronForward}></IonIcon>
        </IonItem>
      </div>
    </IonCol>
  </IonRow>
</div>;
}

export default CardBusiness;
