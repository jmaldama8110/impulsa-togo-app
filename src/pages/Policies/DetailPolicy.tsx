import { IonSkeletonText, IonBackButton, IonButton, IonButtons, IonCol, IonContent, IonFooter, IonHeader, IonImg, IonItem, IonLabel, IonPage, IonRow, IonText, IonToolbar, useIonAlert, IonToast } from '@ionic/react';
import { HttpStatusCode } from '../../constants/HttpStatusCode';
import { useEffect, useState } from 'react';
import PolicyService from '../../Services/PolicyService';
import Status from '../../Services/StatusService';
import './Styles/DetailPolicy.css';
import { useHistory } from 'react-router';
import { File } from '@ionic-native/file';
import moment from 'moment';
import 'moment/locale/es';
import { CallNumber } from '@awesome-cordova-plugins/call-number';
import { FileOpener } from '@awesome-cordova-plugins/file-opener';
import { Capacitor } from '@capacitor/core';
import businessServices from '../../Services/BusinessServices';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
// import { Browser } from '@capacitor/browser';
// import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser';

moment.locale('es');

const DetailPolicy: React.FC = () => {
  const [present] = useIonAlert();
  const history = useHistory();
  const [Datos, updateDatos] = useState<any>();
  const [propie, setPropie] = useState([] as any);
  const [showToast, setShowToast] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState();
  const [nameInsurance, setNameInsurance] = useState();
  const [nameExternal, setNameExternal] = useState('');
  const [policyNumber, setPolicyNumber] = useState();
  const formato = 'dddd DD MMMM YYYY';
  const aliasPolicie = localStorage.getItem('aliasPolicy');
  const callNumber = CallNumber;

  document.addEventListener('ionBackButton', (ev: any) => {
    ev.detail.register(100, () => {
      history.replace('/myPolicies');
    });
  });

  const downloadPdf = async () => {
    const idPolicie = localStorage.getItem('idPolicy');
    const idP = idPolicie?.slice(-4);
    const fechaUpdate = localStorage.getItem('fechaUpdate');
    const fecha = fechaUpdate?.substring(0, 10);
    const hora1 = fechaUpdate?.substring(11, 19);
    const hora = hora1?.split(':').join('-');
    const nomArchivo = `${aliasPolicie}-${idP}-${fecha}-${hora}`;

    const dato = JSON.stringify({
      idPolicie
    });


    const filePath = `file:///data/user/0/mx.impulsaasesores.togo/files/${nomArchivo}.pdf`

    Filesystem.readFile({
      path: filePath,
    }).then((data) => {
      FileOpener.open(filePath, 'application/pdf').then(() => { })
        .catch(e => present('Error opening file' + JSON.stringify(e)));
    }).catch((err => {
      // present('No encontrado');
      setShowToast(true);
      PolicyService.DownloadPDF(dato).then((res) => {
        const fileBase64 = res.data.data;
        setShowToast(false);
        Filesystem.appendFile({
          path: `${nomArchivo}.pdf`,
          data: fileBase64,
          directory: Directory.Data,
        }).then((result: any) => {
          setShowToast(false);
          const filePath = result.uri;
          // alert(filePath)
          FileOpener.open(filePath,
            'application/pdf').then(() => { })
            .catch(e => present('Error opening file' + JSON.stringify(e)));
        }).catch((err) => {
          setShowToast(false);
          present('Bad' + err)
        })
      }).catch((e) => {
        console.log(e);
        setShowToast(false);
        present('El archivo no se encuentra almacenado en el servidor.', [{ text: 'Aceptar' }]);
      });
    }));

    // File.createDir(
    //   File.externalApplicationStorageDirectory,
    //   'Pólizas Impulsa',
    //   true
    // ).then(() => {
    //   File.checkFile(
    //     File.externalApplicationStorageDirectory + '/Pólizas Impulsa/',
    //     `${nomArchivo}.pdf`
    //   ).then(() => {
    //     try {
    //       FileOpener.open(File.externalApplicationStorageDirectory + `/Pólizas Impulsa/${nomArchivo}.pdf`,
    //         'application/pdf').then(() => { })
    //         .catch(e => alert('Error opening file' + JSON.stringify(e)));
    //     } catch (err) {
    //       present('No encontrado');
    //     }
    //   })
    //     .catch(async () => {
    //       setShowToast(true);

    //       const dato = JSON.stringify({
    //         idPolicie
    //       });
    //       try {
    //         await PolicyService.DownloadPDF(dato).then(res => res.data)
    //           .then(
    //             response => {
    //               setShowToast(false);

    //               try {
    //                 // ----Descarga----
    //                 File.writeFile(
    //                   File.externalApplicationStorageDirectory + '/Pólizas Impulsa',
    //                   `${nomArchivo}.pdf`,
    //                   response
    //                 ).then(() => {
    //                   FileOpener.open(File.externalApplicationStorageDirectory + `/Pólizas Impulsa/${nomArchivo}.pdf`,
    //                     'application/pdf').then(() => { })
    //                     .catch(e => alert('Error opening file' + JSON.stringify(e)));
    //                 })
    //                   .catch((error) => {
    //                     console.log(error);
    //                   });
    //               } catch (e) {
    //                 setShowToast(false);
    //                 present('El error es: ' + e);
    //               }
    //             })
    //           .catch((e) => {
    //             console.log(e);
    //             setShowToast(false);
    //             present('El archivo no se encuentra almacenado en el servidor.', [{ text: 'Aceptar' }]);
    //           });
    //       } catch (e) {
    //         setShowToast(false);
    //         present('Error de conexión', [{ text: 'Aceptar' }]);
    //         console.log(e);
    //       }
    //     });
    // });
  };

  const downloadIos = async () => {
    const idPolicie = localStorage.getItem('idPolicy');
    const idP = idPolicie?.slice(-4);
    const fechaUpdate = localStorage.getItem('fechaUpdate');
    const fecha = fechaUpdate?.substring(0, 10);
    const hora1 = fechaUpdate?.substring(11, 19);
    const hora = hora1?.split(':').join('-');
    const nomArchivo = `${aliasPolicie}-${idP}-${fecha}-${hora}`;

    File.createDir(
      File.tempDirectory,
      'Pólizas Impulsa',
      true
    ).then(() => {
      File.checkFile(
        File.tempDirectory + '/Pólizas Impulsa/',
        `${nomArchivo}.pdf`
      ).then(() => {
        try {
          FileOpener.open(File.tempDirectory + `/Pólizas Impulsa/${nomArchivo}.pdf`,
            'application/pdf').then(() => { })
            .catch(e => alert('Error opening file' + JSON.stringify(e)));
        } catch (err) {
          present('No encontrado');
        }
      })
        .catch(async () => {
          setShowToast(true);

          const dato = JSON.stringify({
            idPolicie
          });
          try {
            await PolicyService.DownloadPDF(dato).then(res => res.data)
              .then(
                response => {
                  setShowToast(false);

                  try {
                    // ----Descarga----
                    File.writeFile(
                      File.tempDirectory + '/Pólizas Impulsa',
                      `${nomArchivo}.pdf`,
                      response
                    ).then(() => {
                      FileOpener.open(File.tempDirectory + `/Pólizas Impulsa/${nomArchivo}.pdf`,
                        'application/pdf').then(() => { })
                        .catch(e => alert('Error opening file' + JSON.stringify(e)));
                    })
                      .catch((error) => {
                        console.log(error);
                      });
                  } catch (e) {
                    setShowToast(false);
                    present('El error es: ' + e);
                  }
                })
              .catch((e) => {
                console.log(e);
                setShowToast(false);
                present('El archivo no se encuentra almacenado en el servidor.', [{ text: 'Aceptar' }]);
              });
          } catch (e) {
            setShowToast(false);
            present('Error de conexión', [{ text: 'Aceptar' }]);
            console.log(e);
          }
        });
    });
  };

  const validarPlat = () => {
    if (Capacitor.getPlatform() === 'ios') {
      downloadIos();
    } else {
      // alert('estas en android');
      downloadPdf();
    }
  };

  const [imgExists, setImgExists] = useState(true);

  useEffect(() => {
    const idPolicie = localStorage.getItem('idPolicy');
    const data = JSON.stringify({
      idPolicie
    });
    PolicyService.PolicyDetail(data).then(res => res.data)
      .then(response => {
        // console.log('Respuesta detalle', response);
        if (response.status === HttpStatusCode.Success) {
          // console.log(response.data);
          updateDatos([response.data]);
          setPropie([response.client]);
          setPhoneNumber(response.data.phoneNumber);
          setNameInsurance(response.data.name);
          setNameExternal(response.client.fullName)
          setPolicyNumber(response.data.policyNumber)
        } else {
          present('Póliza no encontrada');
          history.replace('myPolicies');
        }
      })
      .catch((e) => {
        console.log(`Error de red ${e}`);
        history.replace('myPolicies');
      });
  }, []);

  const call = () => {
    callNumber.callNumber(`${phoneNumber}`, true)
      .then(res => console.log('Llamando!', res))
      .catch(err => console.log('Error', err));
  };

  const sendEmail = (insurance: string) => {
    const fullName = localStorage.getItem('nameUser');
    const bodyRequest = {
      fullName: fullName,
      insurance: insurance,
      nameExternal: nameExternal,
      policyNumber: policyNumber
    };

    businessServices.SendEmailSiniestro(bodyRequest).then(() => {
      console.log('Email enviado con exito');
    }).catch(() => {
      console.log('Error');
    });
  };

  function failedImageLoad(e: any) {
    setImgExists(false);
  }

  // const abrir = async () => {
  // Browser.open({ url: `https://impulsa-to-go.devsecops.com.mx/api/app/policie/${idPolicie}.pdf` });
  // };

  return (
    <IonPage>
      <IonHeader color='primary' className='ion-no-border'>
        <IonToolbar color='primary' >
          <IonButtons slot="start">
            <IonBackButton color='secondary' defaultHref='/myPolicies' />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent color='primary' fullscreen>
        {Datos
          ? Datos!.map((dato: any, i: any) => (
            <>
              {localStorage.setItem('fechaUpdate', dato.fechaUpdate)}
              <IonCol size="12" style={{ padding: 0 }}>
                <div className="logoContent ion-text-center">
                  <IonImg onIonError={(e) => failedImageLoad(e)} className='logoEnterprise' src={imgExists ? `assets/company-logos/${dato.iconCode || 'DEFAULT'}.png` : 'assets/company-logos/DEFAULT.png'} />
                </div>
              </IonCol>

              <IonCol size="12">
                <div className="ion-text-center" style={{ width: '85%', marginLeft: 'auto', marginRight: 'auto' }}>
                  <IonText><b className="nombreUsuario" > {dato.alias} </b></IonText>
                  <div className='ion-text-center subtitle'>
                    <IonText>Seguro de {dato.policyType} </IonText>
                  </div>
                </div>
              </IonCol>

              <IonCol size="12" >
                <div className={Status.class(dato.status as string)}>{Status.validar(dato.status as string)}</div>
                <div className="ion-content-center" >
                  <div className="content1">
                    <IonLabel className='LabelTitle' >Asegurado</IonLabel>
                    {propie.map((dat: any, i: any) => (
                      <IonItem className='itemText' key={i}>
                        <IonLabel className='LabelText' color='primary'>{dat.fullName}</IonLabel>
                      </IonItem>
                    ))}

                    <IonLabel className='LabelTitle' >Número de póliza</IonLabel>
                    <IonItem className='itemText'>
                      <IonLabel className='LabelText' color='primary'>{dato.policyNumber}</IonLabel>
                    </IonItem>

                    <IonLabel className='LabelTitle' >Vigencia</IonLabel>
                    <IonItem className='itemText ion-no-border' >
                      <IonLabel className='LabelText' color='primary'>Desde: {moment.utc(dato.effectiveDate).format(formato)} <br /> Hasta: {moment.utc(dato.expirationDate).format(formato)}</IonLabel>
                    </IonItem>

                  </div>
                  <div className='content2'>
                  </div>
                </div>
              </IonCol>
            </>
          ))
          : (
            <div>
              <IonCol size="12">
                <div className="logoContent ion-text-center">
                  <IonSkeletonText animated style={{ width: '100%' }} />
                </div>
              </IonCol>

              <IonCol size="12">
                <div className='statusSkeleton'> <IonSkeletonText animated style={{ width: '80%' }} /></div>
                <div className="ion-text-center">
                  <IonSkeletonText animated style={{ width: '80%', height: '15px', left: '10%' }} />
                  <div className='ion-text-center subtitle'>
                    <IonSkeletonText animated style={{ width: '60%', height: '12px', left: '20%' }} />
                  </div>
                </div>
              </IonCol>

              <IonCol size="12" >
                <div className="ion-content-center" >
                  <div className="content1">
                    <IonLabel className='LabelTitle' >Asegurado</IonLabel>
                    <IonItem className='itemText'>
                      <IonSkeletonText animated style={{ width: '80%' }} />

                    </IonItem>

                    <IonLabel className='LabelTitle' >Número de póliza</IonLabel>
                    <IonItem className='itemText'>
                      <IonSkeletonText animated style={{ width: '40%' }} />
                    </IonItem>

                    <IonLabel className='LabelTitle' >Estado</IonLabel>
                    <IonItem className='itemText' >
                      <IonSkeletonText animated style={{ width: '30%' }} />
                    </IonItem>

                    <IonLabel className='LabelTitle' >Vigencia</IonLabel>
                    <IonItem className='itemText ion-no-border' >
                      <IonSkeletonText animated style={{ width: '90%' }} />
                    </IonItem>

                  </div>
                  <div className='content2'>
                  </div>
                </div>
              </IonCol>
            </div>
          )
        }

      </IonContent>
      <IonFooter className="ion-no-border footerButtons">
        <IonToolbar color='primary' className='toolbarFooter'>
          <IonRow className='bodyFooter'>
            <IonCol size='1'> </IonCol>
            <IonCol size='10'>
              <IonButton onClick={() => validarPlat()} expand="block" className='btnContinuar btnBack' fill='clear' color='light' size='large'>Descargar Carátula</IonButton>
              <IonButton expand="block" className='btnContinuar2 btnSubmit' color='light' size='large' onClick={() => { sendEmail(nameInsurance!); call(); }} ><IonText color='primary'>Reportar Siniestro</IonText></IonButton>
            </IonCol>
            <IonCol size='1'></IonCol>
          </IonRow>
        </IonToolbar>
      </IonFooter>

      <IonToast
        cssClass='toast-download'
        isOpen={showToast}
        message="Descargando archivo..."
      />
    </IonPage>
  );
};

export default DetailPolicy;
