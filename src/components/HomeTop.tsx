import { IonBackButton, IonButtons, IonCol, IonIcon, IonImg, IonItem, IonLabel, IonList, IonLoading, IonRow, IonSkeletonText, IonText, useIonAlert, useIonViewDidEnter } from '@ionic/react';
import { Fragment, useState } from 'react';
import * as icon from 'ionicons/icons';
import './Styles/HomeTop.css';
import { useHistory } from 'react-router';
import { FileOpener } from '@awesome-cordova-plugins/file-opener';
import { File } from '@ionic-native/file';
import PolicyService from '../Services/PolicyService';

function HomeTop (props: any) {
  const [present] = useIonAlert();
  const history = useHistory();
  const [nameUser, setNameUser] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [menuEnable, setMenuEnable] = useState(true);
  const [showLoading, setShowLoading] = useState(false);
  const [imgDidLoad, setImgDidLoad] = useState(false);
  useIonViewDidEnter(() => {
    setNameUser(localStorage.getItem('nameUser') as string);
  });

  const signOff = () => {
    // closeMenu();
    // localStorage.clear();
    localStorage.removeItem('idUser');
    localStorage.removeItem('externalId');
    localStorage.removeItem('nameUser');
    localStorage.removeItem('token');
    localStorage.removeItem('phoneUser');
    localStorage.removeItem('idPolicy');
    localStorage.removeItem('aliasPolicy');
    localStorage.removeItem('externalIdClientPolice');
    localStorage.removeItem('externalPhoneNumber');
    localStorage.removeItem('fechaUpdate');
    sessionStorage.clear();
    history.replace('/signIn');
  };

  const downloadPdf = async () => {
    File.createDir(
      File.externalRootDirectory + '/Download',
      'Pólizas Impulsa',
      true
    ).then(() => {
      File.checkFile(
        File.externalRootDirectory + '/Download/Pólizas Impulsa/',
        'PrivacyPolicie.pdf'
      ).then(() => {
        try {
          FileOpener.open(File.externalRootDirectory + '/Download/Pólizas Impulsa/PrivacyPolicie.pdf',
            'application/pdf').then(() => { })
            .catch(e => alert('Error opening file' + JSON.stringify(e)));
        } catch (err) {
          present('No encontrado');
        }
      })
        .catch(async () => {
          setShowLoading(true);

          try {
            await PolicyService.GetPrivacyPolicie().then(res => res.data)
              .then(
                response => {
                  console.log('Respuesta', response);
                  setShowLoading(false);

                  try {
                    // ----Descarga----
                    File.writeFile(
                      File.externalRootDirectory + '/Download/Pólizas Impulsa',
                      'PrivacyPolicie.pdf',
                      response
                    ).then(() => {
                      FileOpener.open(File.externalRootDirectory + '/Download/Pólizas Impulsa/PrivacyPolicie.pdf',
                        'application/pdf').then(() => { })
                        .catch(e => alert('Error opening file' + JSON.stringify(e)));
                    })
                      .catch((error) => {
                        console.log(error);
                      });
                  } catch (e) {
                    setShowLoading(false);
                    present('El error es: ' + e);
                  }
                })
              .catch((e) => {
                console.log(e);
                setShowLoading(false);
                present('El archivo no se encuentra almacenado en el servidor.', [{ text: 'Aceptar' }]);
              });
          } catch (e) {
            setShowLoading(false);
            present('Error de conexión', [{ text: 'Aceptar' }]);
            console.log(e);
          }
        });
    });
  };

  return (
        <Fragment>
            <div id="sideNavigation" className={props.viewMenu ? 'sideOpen' : 'sideClose'}>
                <IonItem color='primary'>
                    <IonIcon className='iconCloseSideNav' color='light' onClick={() => props.setViewMenu(false)} icon={icon.close}></IonIcon>
                    <IonText className='titleSideNav' >Mis opciones</IonText>
                </IonItem>

                <IonList>
                    <IonItem color=''>
                        <IonIcon className='iconMenu' color='primary' icon={icon.notifications}></IonIcon>
                        <IonLabel color='' >Notificaciones</IonLabel>
                    </IonItem>
                    <IonItem onClick={() => history.replace('/contacUs')}>
                        <IonIcon className='iconMenu' color='primary' icon={icon.call}></IonIcon>
                        <IonLabel color=''>Contacto</IonLabel>
                    </IonItem>
                    <IonItem >
                        <IonIcon onClick={() => downloadPdf()} className='iconMenu' color='primary' icon={icon.warning} />
                        <IonLabel color=''>Aviso de privacidad</IonLabel>
                    </IonItem>
                    <IonItem onClick={() =>
                      present({
                        cssClass: 'my-css',
                        // header: 'Cerrar sesión',
                        message: '¿Cerrar sesión?',
                        buttons: [
                          { text: 'Cancelar', handler: () => console.log('Cancel pressed') },
                          { text: 'Aceptar', handler: () => signOff() }
                        ]
                        // onDidDismiss: (e:any) => console.log('did dismiss')
                      })}>
                        <IonIcon className='iconMenu' color='primary' icon={icon.logOut}></IonIcon>
                        <IonLabel color=''>Cerrar sesión</IonLabel>
                    </IonItem>
                </IonList>
            </div>
            <div className={props.viewMenu ? 'conetentOpen' : 'conetentClose'} id='main'>
                <IonRow className='ion-margin-top'>

                    <IonCol size="6" >
                        <div className='ion-text-left' >
                            {history.location.pathname === '/directory'
                              ? <IonButtons slot="start" style={{ marginTop: '-40px', position: 'absolute' }}>
                                    <IonBackButton color='primary' defaultHref='/directory1' />
                                </IonButtons>
                              : <></>
                            }
                        </div>
                    </IonCol>
                      <IonCol size="6" hidden={props.hiddenMenu}>
                        <div className='ion-text-right' >
                            <div className='countMsg ion-text-center' hidden={true}>
                                <IonText className='numMsg'>+4</IonText>
                            </div>
                            <IonIcon onClick={() => (document.getElementById('menuCustom') as any).open()} icon={icon.menu} className='iconMenu'></IonIcon>
                            {/* <img className="imgAvatar" src='assets/img/noUser2.png' hidden={props.hiddenAvatar} /> */}
                        </div>
                    </IonCol>
                </IonRow>

                <IonCol size="12">
                    <div className="ion-text-center">
                      <IonImg onIonImgDidLoad={() => setImgDidLoad(true)} className={!props.hiddenAvatar ? 'imgCentral' : 'imgCentralMTop'} src="assets/img/Group2.svg" />
                      {/* <IonSkeletonText animated className='SkeletonLogo' /> */}
                      {
                        !imgDidLoad
                          ? <IonSkeletonText animated className='SkeletonLogo' />
                          : <></>
                      }
                    </div>
                </IonCol>

                <IonCol size="12">
                    <div className="ion-text-center">
                        <IonText><b className="nombreUsuario ion-text-uppercase">HOLA {nameUser.split(' ', 1)}</b></IonText><IonText></IonText>
                        <div className='ion-text-center subtitle'>
                            <IonText>{props.subtitle} <b>{props.subtitleBold ? props.subtitleBold : ''}</b> </IonText>
                        </div>
                    </div>
                </IonCol>
            </div>

            <IonLoading
            cssClass='my-custom-class'
            isOpen={showLoading}
            onDidDismiss={() => setShowLoading(showLoading)}
            message={'Por favor espere...'}
          />
        </Fragment>
  );
}

export default HomeTop;
