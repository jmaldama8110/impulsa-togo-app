import { IonAlert, IonButtons, IonCol, IonGrid, IonIcon, IonImg, IonItem, IonList, IonRow, IonText, IonToast, useIonAlert } from '@ionic/react';
import { documentOutline } from 'ionicons/icons';
import { useState } from 'react';
import { useHistory } from 'react-router';
import PolicyService from '../../../Services/PolicyService';
import '../../Policies/Styles/Onboarding_7.css';
import '../Styles/HomeMyPolicies.css';

function ItemList (props:any) {
  const Datos = props.datos;
  const history = useHistory();
  const [present] = useIonAlert();
  const [showAlert1, setShowAlert1] = useState(false);
  const [idDoc, setIdDoc] = useState('');
  //   const [externalIdDoc, setExternalIdDoc] = useState('');
  const [aliasDoc, setAliasDoc] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [showToast2, setShowToast2] = useState(false);

  const alertEdit = async (alias: string, id:string) => {
    try {
      setShowAlert1(true);
      setIdDoc(id);
      setAliasDoc(alias);
    } catch (e) {
      present(`Error: ${e}`);
    }
  };

  const editPdf = async (id:string, alias: string) => {
    if (alias !== '') {
      const datos = JSON.stringify({
        Id: id,
        alias: alias
      });
      try {
        await PolicyService.EditAlias(datos).then(res => res.data)
          .then(response => {
            setShowToast(true);
            props.obtener();
            // setShowToast(false);
          })
          .catch(error => console.error('Error:', error));
      } catch (e) {
        present(`Error: ${e}`);
      }
    } else {
      // present('El campo Alias no puede quedar vacío', [{ text: 'Aceptar' }]);
      setShowToast2(true);
    }
  };

  const Detail = async (idPolicie:string, alias:string) => {
    localStorage.setItem('idPolicy', idPolicie);
    localStorage.setItem('aliasPolicy', alias);
    history.replace('/detailPolicy');
    props.obtener();
  };

  return <>
  {/* {console.log('Itemm Listt', Datos)} */}
    <IonList slot="content" class="List-H2" key={Datos.id}>
            <IonItem class="row-H2">
                <IonGrid>
                    <IonRow>
                        <IonCol size="2" class="col-H2">
                            <div className="elipse col-H2">
                                <IonIcon icon={documentOutline} />
                            </div>
                        </IonCol>
                        <IonCol class="col2-H2  ajustar-txt" size="8" onClick={() => Detail(Datos._id, Datos.alias)}>
                          <IonText className='txtC2-HM'>{Datos.alias}</IonText>
                        </IonCol>
                        <IonCol size='1'></IonCol>
                        <IonCol size="1" class="col-H2" >
                            <IonButtons onClick={() => alertEdit(Datos.alias, Datos._id)}>
                                <IonImg class="IconCol-H2" src="assets/icon/EditIcon.png"/>
                            </IonButtons>
                        </IonCol>
                        {/* <IonCol size='0.5'></IonCol> */}
                        {/* <IonCol size="1" class="col-H2" >
                            <IonButtons onClick={() => Detail(Datos._id, Datos.alias)}>
                                <IonImg class="IconCol-H2" src="assets/icon/detailIcon.png"/>
                            </IonButtons>
                        </IonCol> */}
                    </IonRow>
                </IonGrid>
            </IonItem>
        </IonList>
    <IonAlert
        isOpen={showAlert1}
        onDidDismiss={() => setShowAlert1(false)}
        header={'Actualizar alias'}
        inputs={[
          {
            name: 'newAlias',
            value: aliasDoc,
            type: 'text',
            placeholder: 'Actualización'
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
    />
    <IonToast
        isOpen={showToast}
        onDidDismiss={() => setShowToast(false)}
        cssClass= 'toast-success'
        color='success'
        position='bottom'
        message='Actualizado éxitosamente'
        duration={1000}
      />
       <IonToast
        isOpen={showToast2}
        onDidDismiss={() => setShowToast2(false)}
        cssClass= 'toast-danger'
        color='danger'
        position='bottom'
        message='El campo Alias no puede quedar vacío'
        duration={1000}
      />
  </>;
}
export default ItemList;
