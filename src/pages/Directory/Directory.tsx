import { IonPage, IonContent, IonGrid, IonCol, IonRow, useIonModal, IonSkeletonText } from '@ionic/react';
import { useEffect, useState } from 'react';
// import * as icon from 'ionicons/icons';
import HomeTop from '../../components/HomeTop';
import './Styles/Directory.css';
import ModalBody from './ModalBody';
import BusinessServices from '../../Services/BusinessServices';
import CardBusiness from './Components/CardBusiness';
import { useHistory } from 'react-router';

const Directory: React.FC = () => {
  const history = useHistory();
  const [viewMenu, setViewMenu] = useState(false);
  const [datosProps, setDatosProps] = useState({});
  const [Business, setBusiness] = useState<[]>();

  const [showModal, dismiss] = useIonModal(ModalBody, {
    dato: datosProps,
    dismiss: () => dismiss()
  });
  const ModalOptions =
  {
    onDismiss: () => dismiss(),
    breakpoints: [0, 0.2, 0.6, 1],
    initialBreakpoint: 1,
    backdropBreackPoint: 0.2,
    swipeToClose: true,
    animed: true,
    presentingElement: undefined
  };

  function Modal (datos: any) {
    setDatosProps(datos);

    showModal(ModalOptions);
  }

  document.addEventListener('ionBackButton', (ev: any) => {
    ev.detail.register(100, () => {
      history.replace('/directory1');
    });
  });

  useEffect(() => {
    BusinessServices.getBusiness().then(res => res.data)
      .catch(error => {
        console.error('Error:', error);
      }).then(response => {
        console.log('Success:', response);
        setBusiness(response);
      });
  }, []);

  return (
    <IonPage>
      <IonContent>
        <IonGrid className='' >
          <HomeTop avatar='assets/img/avatarHome.png' title='Directorio' subtitle='Reporta un siniestro con la aseguradora correspondiente. Solo ten a la mano tu ' subtitleBold={'número de póliza'} hidden={false} viewMenu={viewMenu} setViewMenu={setViewMenu} />
            <IonRow className={viewMenu ? 'conetentOpen' : 'conetentClose'}>
              <IonCol size='0.5'></IonCol>
              <IonCol size='11'>
                {Business
                  ? Business.map((dato: any) => {
                    return (<CardBusiness key={dato._id} dato={dato} Modal={Modal} />);
                  })
                  : <div className='ion-text-center'>
                    <IonSkeletonText class="ion-margin-bottom" animated style={{ width: '100%', height: '105px', '--border-radius': '14px' }} />
                    <IonSkeletonText class="ion-margin-bottom" animated style={{ width: '100%', height: '105px', '--border-radius': '14px' }} />
                    <IonSkeletonText class="ion-margin-bottom" animated style={{ width: '100%', height: '105px', '--border-radius': '14px' }} />
                    <IonSkeletonText class="ion-margin-bottom" animated style={{ width: '100%', height: '105px', '--border-radius': '14px' }} />
                  </div>
                }
              </IonCol>
              <IonCol size='0.5'></IonCol>
            </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Directory;
