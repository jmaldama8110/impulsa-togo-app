import { IonRow, IonCol } from '@ionic/react';
import { useState, useRef } from 'react';
import './Styles/InputCode.css';

const InputCode = (props:any) => {
  const [code, setCode] = useState([...Array(props.length)].map(() => ''));
  const inputs = useRef([]);
  // Typescript
  // useRef<(HTMLInputElement | null)[]>([])

  const processInput = (e: any, slot: any) => {
    const num = e.target.value;
    console.log(inputs);

    if (/[^0-9]/.test(num)) return;
    const newCode = [...code];
    newCode[slot] = num;
    setCode(newCode);
    if (slot !== props.length - 1) {
      const qwe = inputs.current[slot + 1] as HTMLInputElement;
      qwe.focus();
    }
    if (newCode.every(num => num !== '')) {
      props.onComplete(newCode.join(''));
    }
    props.change(e);
  };

  const onKeyUp = (e:any, slot:any) => {
    console.log(e.keyCode);
    console.log('code: ' + code);
    if (e.keyCode === 8 && !code[slot] && slot !== 0) {
      const newCode = [...code];
      newCode[slot - 1] = '';
      setCode(newCode);
      console.log('newCode: ' + newCode + slot);
      const rty = inputs.current[slot - 1] as HTMLInputElement;
      rty.focus();
    }
  };

  return (
    <div className="code-input">
      <label className="code-label">{props.label}</label>
      <IonRow>
        <IonCol size='1'></IonCol>
        <IonCol size='10'>
        <div className="code-inputs ion-text-center">
        {code.map((num, idx) => {
          return (
            <input
            className='inputs code-inputs ion-text-center'
              key={idx}
              type="text"
              inputMode="numeric"
              maxLength={1}
              name={`num${idx + 1}`}
              value={num}
              autoFocus={!code[0].length && idx === 0}
              readOnly={props.loading}
              onChange={e => processInput(e, idx)}
              onKeyUp={e => onKeyUp(e, idx)}
              ref={ref => inputs.current.push(ref as never)}
            />
          );
        })}
      </div>
        </IonCol>
        <IonCol size='1'></IonCol>
      </IonRow>

    </div>
  );
};

export default InputCode;
