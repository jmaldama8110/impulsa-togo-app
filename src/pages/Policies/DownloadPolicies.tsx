import { IonButton, IonCard, IonCol, IonContent, IonFooter, IonLoading, IonModal, IonPage, IonRow, IonText, IonToolbar, useIonAlert } from '@ionic/react';
import { HttpStatusCode } from '../../constants/HttpStatusCode';
import { useHistory } from 'react-router';
import { useEffect, useState } from 'react';
import PolicyService from '../../Services/PolicyService';
import Onboarding8 from './Components/OnboardingSreen8';
import HomeTop from '../../components/HomeTop';
import Toggle from './Components/toggle';
import './../Dashboard/Styles/HomeMyPolicies.css';
import './Styles/Onboarding_7.css';

const DonwloadPolicies: React.FC = () => {
  const history = useHistory();
  const [alert] = useIonAlert();
  const [showLoading, setShowLoading] = useState(false);
  const [showLoading2, setShowLoading2] = useState(false);
  const [Datos, updateDatos] = useState([] as any);
  const [idsPolices, setIdsPolices] = useState([] as any);
  const [disabledButton, setDisabledButton] = useState(false);

  let itemSelected = idsPolices.length;

  document.addEventListener('ionBackButton', (ev: any) => {
    ev.detail.register(100, () => {
      history.replace('/registerPolicy');
    });
  });

  useEffect(() => {
    // const idUser = '3';
    const idUser = localStorage.getItem('externalIdClientPolice');
    const idUserLog = localStorage.getItem('idUser');
    const data = JSON.stringify({
      idUser,
      idUserLog
    });
    setShowLoading2(true);
    PolicyService.ExternalPolicies(data).then(res => res.data)
      .then(response => {
        setShowLoading2(false);
        console.log('Respuesta: ', response);
        if (response.status === HttpStatusCode.Success) {
          updateDatos(response.data);
          (response.data).map((dato: any, i: any) => (
            idsPolices.push(dato._id)
          ));
        } else if (response.status === HttpStatusCode.ExistsData) {
          alert(`${response.data}.`, [{ text: 'Aceptar' }]);
          history.replace('/myPolicies');
        }
      })
      .catch(error => console.error('Error:', error));
    console.log(idsPolices);
  }, []);

  const ctrlPolices = (e: any, i: number, idPolicy: number) => {
    const idP = idPolicy.toString();
    if (e.detail.checked) {
      setIdsPolices([...idsPolices, idP]);
      itemSelected = itemSelected + 1;
    } else {
      const newIds = idsPolices.filter((id: any) => id !== idPolicy);
      setIdsPolices(newIds);
      itemSelected = itemSelected - 1;
    }

    if (itemSelected !== 0) {
      setDisabledButton(false);
    } else {
      setDisabledButton(true);
    }
  };

  const enviar = async (event: any) => {
    const idUser = localStorage.getItem('idUser');

    const data = JSON.stringify({
      idsPolices,
      idUser
    });
    setShowLoading(true);
    await PolicyService.Select(data).then((res: any) => res.data)
      .catch((error: any) => {
        alert(`${error}`, [{ text: 'Ok' }]);
        console.log('Error:', error);
      }).then((response: any) => {
        console.log('Success:', response);
        setShowLoading(false);
        if (response.status === HttpStatusCode.ExistsData) {
          alert(`${response.message}`, [{ text: 'Ok' }]);
        } else if (response.status === HttpStatusCode.NotFound) {
          alert(`${response.message}`, [{ text: 'Ok' }]);
        } else if (response.status === HttpStatusCode.Success) {
          // console.log('Respuesta IDS', response);
          localStorage.setItem('url', '/');
          history.replace('/myPolicies');
        }
      });
  };

  // console.log('datosss', Datos);
  console.log('ids: ' + JSON.stringify(idsPolices));

  return <IonPage>

    <IonContent>

      <IonRow >
        <IonCol size="1"></IonCol>
        <IonCol size="10" class="Col-D">

          <HomeTop avatar='assets/img/avatarHome.png' subtitle='Selecciona las pólizas que deseas gestionar desde la app.' hiddenMenu={true}/>

          {Datos.map((dato: any, i: any) => (
                <IonCard class="card-D" key={i}>
                  <Toggle alias={dato.originalAlias} idx={i} addPoliceFunc={ctrlPolices} id={dato._id} />
                </IonCard>
          ))}

          <IonModal isOpen={showLoading}>
            <Onboarding8 />
          </IonModal>

        </IonCol>
        <IonLoading
          cssClass='my-custom-class'
          isOpen={showLoading2}
          onDidDismiss={() => setShowLoading2(showLoading2)}
          message={'Por favor espere...'}
        />
        <IonCol size="1"></IonCol>
      </IonRow>

    </IonContent>

    <IonFooter className="ion-no-border">
      <IonToolbar color='white'>
        <IonRow>
          <IonCol size='1'> </IonCol>
          <IonCol size='10'>
            <IonButton class="btn-D btn2-D" expand="block" color="primary" onClick={() => enviar(event) } disabled={disabledButton} >Sincronizar pólizas</IonButton>
            <IonButton class="btn-D btn3-D" expand="block" color="secondary" onClick={() => history.replace('/registerPolicy')}><IonText color='primary'>Regresar</IonText></IonButton>
          </IonCol>
          <IonCol size='1'></IonCol>
        </IonRow>
      </IonToolbar>
    </IonFooter>

  </IonPage>;
};

export default DonwloadPolicies;
