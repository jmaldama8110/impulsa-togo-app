import { IonRow, IonCol, IonText, IonInput, IonIcon, IonLabel } from '@ionic/react';
import { reload } from 'ionicons/icons';
import { Fragment, useEffect, useRef, useState } from 'react';
import { SmsRetriever } from '@awesome-cordova-plugins/sms-retriever';

function VerificationCodeForm (props: any) {
  const inputs = useRef([]);
  const [keyCodeEvent, setKeyCodeEvent] = useState<number>();
  const smsRetriever = SmsRetriever;
  const [codeRecivied, setCodeRecivied] = useState() as any;

  smsRetriever.startWatching()
    .then((res: any) => {
      console.log(`start: ${JSON.stringify(res)}`); setCodeRecivied(res.Message.toString().substr(4, 4));
    })
    .catch((error: any) => console.warn(`startError: ${error}`));

  useEffect(() => {
    const arr = Object.assign([], codeRecivied);
    for (const idx in arr) {
      const inputSig = inputs.current[parseInt(idx)] as HTMLIonInputElement;
      inputSig.value = codeRecivied[idx];
    }
  }, [codeRecivied]);

  const processInput = (e: any, slot: any) => {
    e.preventDefault();
    const inputSig = inputs.current[slot + 1] as HTMLIonInputElement;

    if (props.valueInputs.num1 === '' && props.valueInputs.num2 === '' && props.valueInputs.num3 === '' && props.valueInputs.num4 === '') {
      setKeyCodeEvent(0);
    }
    props.addCode({
      ...props.valueInputs, [e.target.name]: e.target.value
    });

    if (slot < 3 && keyCodeEvent !== 8) {
      inputSig.setFocus();
    }

    if (slot === 0 && keyCodeEvent === 8 && props.valueInputs.num1 === '') {
      inputSig.setFocus();
    }
  };

  const onKeyUp = (e: any, slot: number) => {
    e.preventDefault();
    const inputAnt = inputs.current[slot - 1] as HTMLIonInputElement;
    const inputSig = inputs.current[slot + 1] as HTMLIonInputElement;
    const inputActive = document.activeElement as HTMLIonInputElement;
    console.log('Valor Activo: ' + typeof inputActive.value + inputActive.value);
    console.log(slot);

    const isNum = /[0-9]/.test(e.key);

    if (e.keyCode === 8 && slot !== 0) {
      inputAnt.setFocus();
    }

    // if (isNum && inputActive.value !== '' && slot !== 0 && slot <= 3 && e.keyCode !== 8 && inputSig.value !== '') {
    //   inputSig.setFocus();
    // }

    if (isNum && inputActive.value !== '' && slot !== 0 && slot < 3 && e.keyCode !== 8) {
      inputSig.setFocus();
    }

    // if (inputActive.value === '' && isNum && inputSig.value === '') {
    //   inputSig.setFocus();
    //   inputSig.value = e.key;
    // }

    if (inputActive.value !== '' && isNum && slot < 3) {
      inputSig.setFocus();
    }

    setKeyCodeEvent(e.keyCode);
  };

  return (
    <Fragment>
      <IonRow>
        <IonCol size='1'></IonCol>
        <IonCol className='title2' size='10'>
          <IonText >Por favor, introduce la verificación</IonText>
        </IonCol>
        <IonCol size='1'></IonCol>

        <IonCol size='1'></IonCol>
        <IonCol size='10'>
          <IonText>
            El código fue enviado al <b>******{props.numberPhone ? props.numberPhone.toString().substr(6, 4) : ''}</b>
            <br /> Este código expirará en <IonText color='danger'><b>0{props.min + ':' + (props.seg < 10 ? `0${props.seg}` : props.seg)}</b></IonText>
          </IonText>
        </IonCol>
        <IonCol size='1'></IonCol>
      </IonRow>

      <form style={{ marginTop: '10%' }}>
        <IonRow id=''>
          <IonCol size='3' id='col'><IonInput autofocus onKeyUp={e => onKeyUp(e, 0)} ref={ref => inputs.current.push(ref as never)} id='num1' name='num1' className='inputs' inputMode='numeric' max={1} maxlength={1} enterkeyhint='next' onIonChange={(e) => { processInput(e, 0); }} ></IonInput></IonCol>
          <IonCol size='3' id='col'><IonInput onKeyUp={e => onKeyUp(e, 1)} ref={ref => inputs.current.push(ref as never)} id='num2' name='num2' className='inputs' inputMode='numeric' max={1} maxlength={1} enterkeyhint='next' onIonChange={(e) => { processInput(e, 1); }} ></IonInput></IonCol>
          <IonCol size='3' id='col'><IonInput onKeyUp={e => onKeyUp(e, 2)} ref={ref => inputs.current.push(ref as never)} id='num3' name='num3' className='inputs' inputMode='numeric' max={1} maxlength={1} enterkeyhint='next' onIonChange={(e) => { processInput(e, 2); }}></IonInput></IonCol>
          <IonCol size='3' id='col'><IonInput onKeyUp={e => onKeyUp(e, 3)} ref={ref => inputs.current.push(ref as never)} id='num4' name='num4' className='inputs' inputMode='numeric' max={1} maxlength={1} enterkeyhint='next' onIonChange={(e) => { processInput(e, 3); }} ></IonInput></IonCol>
        </IonRow>

        <IonRow id='rowOptions'>
          <IonCol size='1'></IonCol>
          <IonCol size='6'><IonText>¿No has recibido un código?</IonText></IonCol>
          <IonCol size='4'><b><IonIcon color='primary' icon={reload} size='default'></IonIcon><IonLabel onClick={props.funcResendCode} color='primary'>   Reenviar</IonLabel></b></IonCol>
          <IonCol size='1'></IonCol>
        </IonRow>
      </form>
    </Fragment>
  );
}
export default VerificationCodeForm;
