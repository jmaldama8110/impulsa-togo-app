import { IonRow, IonCol, IonItem, IonSelect, IonSelectOption, IonInput } from '@ionic/react';

function SelectOptionsPhone (props: any) {
  return (
        <IonRow>
            <IonCol size='5'>
                <IonItem>
                    <IonSelect name={props.nameCode} className='ionSelect' onIonChange={props.change}>
                        <IonSelectOption value="🇲🇽">🇲🇽 +52</IonSelectOption>
                        <IonSelectOption value="🇺🇸🇱🇷">🇱🇷 +01</IonSelectOption>
                        <IonSelectOption value="🇦🇷">🇦🇷 +54</IonSelectOption>
                        <IonSelectOption value="🇪🇨">🇪🇨 +593</IonSelectOption>
                    </IonSelect>
                </IonItem>
            </IonCol>
            <IonCol size='7'>
                <IonItem>
                    <IonInput name={props.name} onIonChange={props.change} placeholder={props.placeHolder}color={'dark'} type={props.type} max={10} maxlength={10}></IonInput>
                </IonItem>
            </IonCol>
        </IonRow>
  );
}

export default SelectOptionsPhone;
