import { IonItem, IonInput, IonText } from '@ionic/react';
import { Fragment } from 'react';

import './../Styles/SignUp.css';

function Input (props: any) {
  return (

        <Fragment>
            <IonItem id='itemLabel'>
                <IonInput
                    className="label"
                    onIonChange={props.change}
                    name={props.name} type={props.type}
                    placeholder={props.placeHolder}
                    color={'quinary'}
                    title={props.title}
                    maxlength={props.maxlength}
                    >
                </IonInput>

            </IonItem>

            {props.nameIsOk !== 'undefined'
              ? props.nameIsOk
                ? <IonText className="txt" color="danger">Minimo 3 carácteres, solo letras <br /></IonText>
                : <></>
              : <></>

            }
            {props.firstSurnameIsOk !== 'undefined'
              ? props.firstSurnameIsOk
                ? <IonText className="txt" color="danger">Minimo 3 carácteres, solo letras <br /> </IonText>
                : <></>
              : <></>

            }
            {props.secondSurnameIsOk !== 'undefined'
              ? props.secondSurnameIsOk
                ? <IonText className="txt" color="danger">Minimo 3 carácteres, solo letras <br /></IonText>
                : <></>
              : <></>

            }
            { props.emailIsOK !== 'undefined'
              ? props.emailIsOK
                ? <IonText className="txt" color="danger">Formato Invalido <br /></IonText>
                : <></>
              : <></>
            }
            {
                props.phoneIsOK !== 'undefined'
                  ? props.phoneIsOK
                    ? <IonText className="txt" color="danger">Minimo 10 carácteres <br /></IonText>
                    : <></>
                  : <></>
            }
        </Fragment>
  );
}

export default Input;
