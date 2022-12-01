import { TextFieldTypes } from '@ionic/core';
import { IonItem, IonInput, IonIcon, IonText } from '@ionic/react';
import { eye, eyeOff } from 'ionicons/icons';
import { Fragment, useEffect, useState } from 'react';

function InputWithIcon (props: any) {
  const [clickPassword, setClickPassword] = useState(true);
  const [iconPassword, setIconPassword] = useState<any>(eye);
  const [typeInput, setTypeInput] = useState<TextFieldTypes>('password');
  // let iconPassword = eye;
  // let typeInput = 'password';

  useEffect(() => {
    if (clickPassword) {
      setIconPassword(eye);
      setTypeInput('password');
    } else {
      setIconPassword(eyeOff);
      setTypeInput('text');
    }
  }, [clickPassword]);

  return (
        <Fragment>
            <IonItem id='itemLabel'>
              <IonInput onIonChange={props.change} type={typeInput} placeholder={props.placeHolder} name={props.name} color={'dark'} required={props.required}></IonInput>
              <IonIcon icon={iconPassword} onClick={() => { setClickPassword(!clickPassword); }} />
            </IonItem>
            {props.passwordIsOK !== 'undefined'
              ? props.passwordIsOK
                ? <IonText className="txt" color="danger">La contraseña debe contener una mayúscula, una minúscula, una letra y al menos 8 carácteres <br /> </IonText>
                : <></>
              : <></>

            }
            {props.passwordverifyIsOK !== 'undefined'
              ? props.passwordverifyIsOK
                ? <IonText className="txt" color="danger">Las contraseñas no coinciden <br /></IonText>
                : <></>
              : <></>

            }
        </Fragment>
  );
}

export default InputWithIcon;
