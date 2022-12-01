import { IonButton, IonCol, IonContent, IonHeader, IonImg, IonItemDivider, IonRow, IonText, IonToolbar } from '@ionic/react';
import { CallNumber } from '@awesome-cordova-plugins/call-number';

import './Styles/ModalBody.css';

const callNumber = CallNumber;

const call = (phoneNumber: string) => {
  callNumber.callNumber(phoneNumber, true)
    .then(res => console.log('Llamando!', res))
    .catch(err => console.log('Error', err));
};

const ModalBody = ({ dato, dismiss }: any) => (
  // {console.log(props)}
  <>
  {console.log(dato)}

    <IonContent style={{ '--background': `${dato.colorCode}` }}>
      <IonHeader className='ion-no-border' style={{ '--background': `${dato.colorCode}` }}>
        <IonToolbar className='ion-margin-right'>
          <IonButton style={{ '--background': `${dato.colorCode}`, '--margin-right': '15px' }} slot='end' className='ion-margin-end' onClick={() => { dismiss(); dato.openModal(false); }}>
            Cerrar
          </IonButton>
        </IonToolbar>
      </IonHeader>
      <IonRow>
        <IonCol size='1'></IonCol>
        <IonCol size='4'>
          <div className="imgContentsModal ion-text-center">
            <IonImg className='logoModal' src={`assets/company-logos/${dato.iconCode || 'DEFAULT'}.png`} />
          </div>

        </IonCol>
        <IonCol size='7'>
          <div className='ion-text-left'>
            <IonText className='NameEnterprise'>{dato.name}</IonText>
          </div>
        </IonCol>
      </IonRow>

      <IonItemDivider className='divider' color='light'> </IonItemDivider>

      <IonRow className='ion-padding-top'>
        <IonCol size='1'></IonCol>
        <IonCol size='10'>
          <div className='ion-text-center'>
            <IonText className='titleInstructions'>Datos necesarios para reportar el accidente:</IonText>
          </div>

          <div className='ion-text-left instrucctions'>
            {dato.instructions.map((item: any, idx: any) => (
              <p key={item.order}>{item.order}.- {item.label}</p>
            ))}
          </div>

          <IonButton onClick={() => call(dato.phoneNumber)} expand="block" className='btnContinuar btnBack' fill='solid' color='light' size='large'><IonText color='primary'>Llamar</IonText></IonButton>

        </IonCol>
        <IonCol size='1'></IonCol>
      </IonRow>

    </IonContent>
    </>
);

export default ModalBody;
