import { IonAccordionGroup, IonAccordion, IonItem, IonGrid, IonRow, IonCol, IonImg, IonList, IonIcon, IonToast, IonButtons, IonAlert, IonText, useIonAlert } from '@ionic/react';
import { documentOutline, ellipsisVertical, pencilSharp } from 'ionicons/icons';
import { File } from '@ionic-native/file';
import '../../Policies/Styles/Onboarding_7.css';
import '../Styles/HomeMyPolicies.css';
import { useState } from 'react';
import { FileOpener } from '@awesome-cordova-plugins/file-opener';
// import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import { useHistory } from 'react-router';
import PolicyService from '../../../Services/PolicyService';

function AcordionGroup (props:any) {
  const history = useHistory();
  const [present] = useIonAlert();
  const Datos = props.datos;
  const idUser = localStorage.getItem('externalId');
  const [showToast, setShowToast] = useState(false);
  const [showAlert1, setShowAlert1] = useState(false);
  const [showAlert2, setShowAlert2] = useState(false);
  const [idDoc, setIdDoc] = useState('');
  const [externalIdDoc, setExternalIdDoc] = useState('');
  const [aliasDoc, setAliasDoc] = useState('');

  const downloadPdf = async (externalId:string, alias:string) => {
    setShowToast(true);
    // alert('Descarga');
    console.log(externalId);

    const dato = JSON.stringify({
      externalId
    });
    try {
      await PolicyService.DownloadPDF(dato).then(res => res)
        .then(
          response => {
            setShowToast(false);
            console.log(response.data);

            try {
              // ----Descarga----
              File.writeFile(
                File.externalRootDirectory + '/Download',
              `${externalId}.pdf`,
              new Blob([response.data]),
              {
                replace: true
              }
              ).then(() => {
                present('Su archivo se ha descargado con éxito');
              })
                .catch((error) => {
                  console.log(error);
                });
            } catch (e) {
              present('El error es: ' + e);
            }
          })
        .catch(error => console.error('Error:', error));
    } catch (e) {
      console.log(e);
    }
  };

  const openPdf = async (externalId: string) => {
    // document.viewDocument(
    // //   File.externalRootDirectory + 'Download/Impulsa/' + nombre,
    //   File.applicationDirectory + 'public/assets/video.pdf',
    //   'application/pdf',
    //   options);

    try {
      alert(`buscando el pdf ${externalId}.pdf`);

      FileOpener.open(
        File.externalRootDirectory + `/Download/${externalId}.pdf`,
        'application/pdf'
      ).then(() => {
        present('Buscando....');
      });
      // await Filesystem.readFile({
      //   path: `Download/${externalId}.pdf`,
      //   directory: Directory.ExternalStorage
      //   // encoding: Encoding.UTF8
      // });
      // await Filesystem.writeFile({
      //   path: 'secrets/text.txt',
      //   data: 'This is a test',
      //   directory: Directory.Documents,
      //   encoding: Encoding.UTF8,
      //   recursive: true
      // });
    } catch (e) {
      present(`Error: ${e}`);
    }
  };

  const alertEdit = async (fileurl: string, id:string) => {
    try {
      setShowAlert1(true);
      setIdDoc(id);
      setExternalIdDoc(fileurl);
    } catch (e) {
      present(`Error: ${e}`);
    }
  };

  const alertOpts = async (externalId: string, alias:string) => {
    try {
      setShowAlert2(true);
      setExternalIdDoc(externalId);
      setAliasDoc(alias);
    } catch (e) {
      present(`Error: ${e}`);
    }
  };

  const editPdf = async (externalid:string, alias: string) => {
    const datos = JSON.stringify({
      externalIdClient: idUser,
      externalId: externalid,
      alias: alias
    });
    try {
      await PolicyService.EditAlias(datos).then(res => res.data)
        .then(response => {
          present(response.message);
          history.replace('/MyPolicies');
        })
        .catch(error => console.error('Error:', error));
    } catch (e) {
      present(`Error: ${e}`);
    }
  };

  return <>
        {console.log(Datos)}

         {Datos.length 
          ? Datos.map((dato:any, i:any) => (
            <IonAccordionGroup key={i}>
                <IonAccordion>

                    <IonItem slot="header" color="primary" class="ItemHeader-H2">
                        <IonGrid>
                            <IonRow>
                                <IonCol class="col-H2" size="3">
                                    <IonImg class="img1Col-H2" src="assets/icon/CarIcon.png"/>
                                </IonCol>
                                <IonCol class="col-H2" size="4">{dato.Tipo}</IonCol>
                            </IonRow>
                        </IonGrid>
                    </IonItem>

                    <IonList slot="content" class="List-H2">

                        <IonItem class="row-H2">
                            <IonGrid>
                                <IonRow>
                                    <IonCol size="2">
                                        <div className="elipse col-H2">
                                            <IonIcon icon={documentOutline} />
                                        </div>
                                    </IonCol>
                                    <IonCol class="col-H2 txtC2-HM" size="7">{dato.Alias}</IonCol>
                                    <IonCol size="1">
                                        <IonButtons onClick={() => alertEdit(dato.Alias, dato.externalId)}>
                                          <IonIcon class="Col3Icon-H2" icon={pencilSharp} />
                                        </IonButtons>
                                    </IonCol>
                                    <IonCol size='1'></IonCol>
                                    <IonCol size="1">
                                        <IonButtons onClick={() => alertOpts(dato.externalId, dato.Alias)}>
                                            <IonIcon class="Col3Icon-H2" icon={ellipsisVertical} />
                                        </IonButtons>
                                    </IonCol>
                                </IonRow>
                            </IonGrid>
                        </IonItem>
                    </IonList>
                    <IonAlert
                      isOpen={showAlert1}
                      onDidDismiss={() => setShowAlert1(false)}
                      header={'Actualizar el alias'}
                      inputs={[
                        {
                          name: 'newAlias',
                          value: externalIdDoc,
                          type: 'text',
                          placeholder: 'Placeholder 1'
                        }
                      ]}
                      buttons={[
                        {
                          text: 'Cancelar',
                          handler: () => {
                            console.log('Cancelado');
                          }
                        },
                        {
                          text: 'Actualizar',
                          handler: (data:any) => {
                            editPdf(idDoc, data.newAlias as string);
                          }
                        }
                      ]}
                    />;
                    <IonAlert
                      isOpen={showAlert2}
                      onDidDismiss={() => setShowAlert2(false)}
                      header={'Opciones'}
                      buttons={[
                        {
                          cssClass: 'secondary',
                          text: 'Descargar',
                          handler: () => {
                            downloadPdf(externalIdDoc, aliasDoc);
                          }
                        },
                        {
                          text: 'Ver',
                          handler: () => {
                            openPdf(externalIdDoc);
                          }
                        }
                      ]}
                    />
                </IonAccordion>
            </IonAccordionGroup>
          ))
          : <IonText>No hay polizas</IonText>}

        <IonToast
          color='secondary'
          isOpen={showToast}
          message="Descargando archivo..."
        />

    </>;
}

export default AcordionGroup;
