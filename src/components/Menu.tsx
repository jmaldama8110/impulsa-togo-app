import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonLoading,
  IonMenu,
  IonMenuToggle,
  useIonAlert
} from '@ionic/react';

import { call, logOut, notifications, warning } from 'ionicons/icons';
import './Menu.css';
import { useHistory } from 'react-router';
import { FileOpener } from '@awesome-cordova-plugins/file-opener';
import { File } from '@ionic-native/file';
import PolicyService from '../Services/PolicyService';
import { useState } from 'react';

const Menu: React.FC = () => {
  const history = useHistory();
  const [present] = useIonAlert();
  const [showLoading, setShowLoading] = useState(false);
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
    sessionStorage.clear();
    history.replace('/signIn');
  };

  // eslint-disable-next-line no-unused-vars
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
    <IonMenu side='end' id='menuCustom' menuId='main' contentId="main" type='overlay' maxEdgeStart={50}>
      <IonContent>
        <IonList id="inbox-list">
          <IonListHeader>Impulsa To Go</IonListHeader>
          {/* <IonNote>atencionweb@impulsaasesores.mx</IonNote> */}
          <IonMenuToggle autoHide={false}>
            <IonItem className='ion-margin-top' onClick={() => history.replace('/notify')} lines="none" detail={false}>
              <IonIcon slot="start" icon={notifications} />
              <IonLabel>Notificaciones
                {
                  (localStorage.getItem('countNotifications'))
                    ? (parseInt(localStorage.getItem('countNotifications')!) === 0)
                        ? <></>
                        : (parseInt(localStorage.getItem('countNotifications')!) < 10) ? <></> : <></>
                  // ? <IonBadge color='danger' style={{ borderRadius: '50%', padding: '4px 6.5px 4px 6.5px', marginLeft: '15px', top: '10px' }}>{localStorage.getItem('countNotifications')}</IonBadge>
                  // : <IonBadge color='danger' style={{ borderRadius: '50%', padding: '4px', marginLeft: '15px', top: '10px' }}>{localStorage.getItem('countNotifications')}</IonBadge>
                    : <></>
                }
              </IonLabel>
            </IonItem>
            <IonItem onClick={() => history.replace('/contacUs')} lines="none" detail={false}>
              <IonIcon slot="start" icon={call} />
              <IonLabel>Contacto</IonLabel>
            </IonItem>
            <IonItem onClick={() => history.replace('/privacyPolicie')} lines="none" detail={false}>
              <IonIcon slot="start" icon={warning} />
              <IonLabel>Aviso de privacidad</IonLabel>
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
              })} lines="none" detail={false}>
              <IonIcon slot="start" icon={logOut} />
              <IonLabel>Cerrar sesión</IonLabel>
            </IonItem>
          </IonMenuToggle>
        </IonList>
        <IonLoading
          cssClass='my-custom-class'
          isOpen={showLoading}
          onDidDismiss={() => setShowLoading(showLoading)}
          message={'Por favor espere...'}
        />
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
