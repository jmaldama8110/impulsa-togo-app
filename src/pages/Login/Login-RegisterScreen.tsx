import { IonBackButton, IonButtons, IonContent, IonHeader, IonPage, IonToolbar } from '@ionic/react';
import { useRef } from 'react';
import { useHistory } from 'react-router';
import Button from '../../components/Button';
import '../OnboardingScreen/Styles/OnboardingScreen.css';
import './Styles/Login-RegisterScreen.css';

const LoginRegisterScreen: React.FC = () => {
  const history = useHistory();

  const animationRef = useRef<any>(document.createElement('ion-img'));

  document.addEventListener('ionBackButton', (ev: any) => {
    ev.detail.register(100, () => {
      history.replace('/OnboardingScreen');
    });
  });

  // const handlePlayAnimation = () => {
  //   console.log(animationRef.current);
  //   if (animationRef.current !== null) {
  //     const animation = createAnimation()
  //       .addElement(animationRef.current)
  //       .duration(450)
  //       .fromTo(
  //         'transform', 'translateX(-100px)', 'translateX(0px)'
  //       )
  //       .easing('ease-out');
  //     animation.play();
  //   }
  // };

  // useEffect(() => {
  //   handlePlayAnimation();
  // }, []);

  return <IonPage ref={animationRef}>

        <IonHeader id='header'>
            <IonToolbar id='toolbar'>
                <IonButtons slot="start">
                    <IonBackButton color='secondary' defaultHref='/OnboardingScreen' />
                </IonButtons>
            </IonToolbar>
        </IonHeader>

        <IonContent color='primary'>

            <div className="Centrado">

                <img className='img-S2' src='assets/img/Login-Register.svg'/>
                {/* {
                    !imgDidLoad
                      ? <IonSkeletonText animated className='img-S2Skeleton' style={{ width: '250px', height: '90px' }} />
                      : <></>
                } */}

                <Button onClick={() => history.replace('/signIn')} class="btn btn1-S2">
                    Iniciar Sesión
                </Button>

               <Button onClick={() => history.replace('/signUp')} class="btn btn2-S2">
                    Registrate
               </Button>

            </div>

        </IonContent>

    </IonPage>;
};

export default LoginRegisterScreen;
