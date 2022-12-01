import { IonSlides, IonText } from '@ionic/react';
import Slide from './Slide';
import '../Styles/OnboardingScreen.css';

function Slides (props: any) {
  const data = props.datos;
  //   const [ske, setSke] = useState(false);

  return (
        <>
            <IonSlides pager={props.pager} class={props.class} options={props.options} ref={props.refe}>

                {data.map((dat:any) => (
                    <Slide key={dat.id}>
                        <div className="Centrado" >
                            {/* <IonImg onIonImgWillLoad={() => setSke(false)} onIonImgDidLoad={() => setSke(true)} class={dat.imgclass} src={dat.img}></IonImg> */}
                            <img className={dat.imgclass} src={dat.img}/>
                            {/* {!ske
                              ? <IonSkeletonText class='img-OSkeleton' animated style={{ width: '150px', height: '150px', '--border-radius': '50%' }}/>
                              : <></>
                            } */}
                            {/* {setSke(false)} */}
                            <div className='containerTxt1O'>
                                <IonText class={dat.txtclass} color="secondary">{dat.txt}</IonText>
                            </div>
                            <div className={dat.txtclass2}>
                                <IonText>{dat.txt2}</IonText>
                            </div>
                        </div>
                    </Slide>
                ))}

            </IonSlides>
        </>
  );
}

export default Slides;
