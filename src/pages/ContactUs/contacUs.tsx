import { IonButton, IonCard, IonCol, IonContent, IonFooter, IonGrid, IonIcon, IonImg, IonPage, IonRow, IonSkeletonText, IonText, IonToolbar, useIonViewDidEnter } from '@ionic/react';
import { chatboxSharp, globeOutline, locationSharp, logoWhatsapp } from 'ionicons/icons';
import { CallNumber } from '@awesome-cordova-plugins/call-number';
import { AppVersion } from '@awesome-cordova-plugins/app-version';
import { useState } from 'react';
import { Capacitor } from '@capacitor/core';
import './contactUs.css';
import '../Policies/Styles/Onboarding_7.css';
import { useHistory } from 'react-router';

const ContactUs: React.FC = () => {
  const callNumber = CallNumber;
  const phone1 = '800 902 3456';
  const phone2 = '961 233 4391';
  const email1 = 'seguros@impulsaasesores.mx';
  const appVersion = AppVersion;
  const [version, setVersion] = useState('');
  const [imgDidLoad, setImgDidLoad] = useState(false);
  const history = useHistory();

  useIonViewDidEnter(() => {
    if (Capacitor.getPlatform() === 'android' || Capacitor.getPlatform() === 'ios') {
      appVersion.getVersionNumber()
        .then(data => {
          console.log(data);
          setVersion(data as string);
        })
        .catch(e => console.log(`Error ${e}`));
    } else {
      setVersion('0');
    }
  });

  const call = (telefono:string) => {
    callNumber.callNumber(telefono, true)
      .then(res => console.log('Llamando!', res))
      .catch(err => console.log('Error', err));
  };

  document.addEventListener('ionBackButton', (ev: any) => {
    ev.detail.register(100, () => {
      history.replace('/myPolicies');
    });
  });

  return (
        <IonPage>
            <IonContent fullscreen>
                <IonGrid>
                  <IonRow>
                    <IonCol size='0.5'/>
                    <IonCol size='11'>

                      <IonImg onIonImgDidLoad={() => setImgDidLoad(true)} class='img-C centrado-C' src='assets/img/LogoSign.svg'/>
                      {
                        !imgDidLoad
                          ? <IonSkeletonText animated className='centrado-C img-CSkeleton' style={{ width: '211px', height: '90px' }} />
                          : <></>
                      }

                      <IonCard class='icons-C'>
                        <IonGrid>
                          <IonRow>
                            <IonCol size='3' class='col-C'>
                              <IonIcon class='i-C' icon={chatboxSharp} onClick={() => window.open(`sms:${phone2}`, '_system')}/>
                              <div className='txt-C'><IonText>Mensaje</IonText></div>
                            </IonCol>
                            <IonCol size='3' class='col-C'>
                              <IonIcon class='i-C' icon={logoWhatsapp} onClick={() => window.open(`https://api.whatsapp.com/send?phone=+52 ${phone2}`, '_system')}/>
                              <div className='txt-C'><IonText>WhatsApp</IonText></div>
                            </IonCol>
                            <IonCol size='3' class='col-C'>
                              <IonIcon class='i-C' icon={locationSharp} onClick={() => window.open('https://www.google.com.mx/maps/place/Impulsa+Agentes+de+Fianzas/@16.7561807,-93.129311,17z/data=!3m1!4b1!4m5!3m4!1s0x85ecd971b441a01b:0xe495e41e18805bee!8m2!3d16.75618!4d-93.1271181', '_system')}/>
                              <div className='txt-C'><IonText>Ubicación</IonText></div>
                            </IonCol>
                            <IonCol size='3' class='col-C'>
                              <IonIcon class='i-C' icon={globeOutline} onClick={() => window.open('https://www.impulsaasesores.mx/nuestra_empresa.php', '_system')}/>
                              <div className='txt-C'><IonText>Web</IonText></div>
                            </IonCol>
                          </IonRow>
                        </IonGrid>
                      </IonCard>

                      <IonButton color='primary' class='btn-D btn1-C'>Teléfonos</IonButton>
                      <IonCard class='cardTel-c'>
                          <IonGrid>
                            <IonRow class='col2-C'>
                              <IonCol size='12' onClick={() => call(phone1)}><IonText>{phone1}</IonText></IonCol>
                            </IonRow>
                            <hr className="hrV5"/>
                            <IonRow class='col2-C'>
                              <IonCol size='12' onClick={() => call(phone2)}><IonText>{phone2}</IonText></IonCol>
                            </IonRow>
                          </IonGrid>
                      </IonCard>

                      <IonButton color='sextary' class='btn-D btn2-C'>Correos</IonButton>
                      <IonCard class='cardTel-c'>
                          <IonGrid>
                            <IonRow class='col2-C'>
                              <IonCol size='12' onClick={() => window.open(`mailto:${email1}`, '_system')}><IonText>{email1}</IonText></IonCol>
                            </IonRow>
                          </IonGrid>
                      </IonCard>
                    </IonCol>
                    <IonCol size='0.5'/>
                  </IonRow>
                </IonGrid>
            </IonContent>

            <IonFooter class='ion-no-border' className='centrado-C'>
              <IonToolbar color='secondary'>
                <IonText class='txt-versionC'>Versión {version}</IonText>
              </IonToolbar>
            </IonFooter>
        </IonPage>
  );
};
export default ContactUs;
