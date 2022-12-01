import { IonAccordionGroup, IonAccordion, IonItem, IonGrid, IonRow, IonCol, IonImg, IonSlides, IonSlide, IonText, IonCard, IonFab, useIonViewDidEnter } from '@ionic/react';
import '../../Policies/Styles/Onboarding_7.css';
import '../Styles/HomeMyPolicies.css';
import ItemList from './Item-List';

function Acordion (props:any) {
  const Datos = props.datos;
  useIonViewDidEnter(() => {
    props.obtener();
    // const slide = (props.refe).current.getSwiper();
    // console.log('Posición', slide.slideNext);
  });
  const slideOpts = {
    initialSlide: 0,
    speed: 400,
    loop: false
  };

  let auto:any = [];
  let salud:any = [];
  let inmuebles:any = [];

  function agrupar (polizas:any) {
    auto = [];
    salud = [];
    inmuebles = [];
    for (const item of polizas) {
      if (item.policyType === 'AUTO') {
        auto.push(item);
      } else if (item.policyType === 'SALUD') {
        salud.push(item);
      } else if (item.policyType === 'INMUEBLES') {
        inmuebles.push(item);
      }
    }
  }

  return <>

    <IonSlides options={slideOpts} ref={props.refe} onIonSlidesDidLoad={props.cambiar}>
      {/* {console.log('Recibido', Datos)} */}
        {Datos.map((arr:any, i:any) => {
          return ([arr].map((dato:any) => {
            return <IonSlide key={i}>
                <IonGrid>
                  <IonRow>
                    <IonCol class='rowCard-A'>
                        <IonCard class='card-A'>
                          <IonGrid class='col1-A'>
                            <IonRow>
                              <IonCol size='5' className='col1-A'><b>Asegurado:</b></IonCol>
                              <IonCol size='7' className='col2-A'>{dato.Nombre}.</IonCol>
                            </IonRow>
                          </IonGrid>
                        </IonCard>
                    </IonCol>
                    </IonRow>
                    <div className='col-NextH' hidden={props.mostrar}>
                      <IonFab class='fab-NextH' vertical="center" horizontal="center">
                        <IonImg class='img-NextH' src='assets/icon/FingerIcon.png'></IonImg>
                      </IonFab>
                    </div>
                    <IonRow class='rowSlide-A'>
                    <IonCol size="12">
                      { (dato.polizas).length !== 0
                        ? <>
                          {/* {console.log(`Pólizas ${i}:`)}
                          {console.log(dato.polizas)} */}
                          {agrupar(dato.polizas)}

                          {auto.length !== 0
                            ? <IonAccordionGroup value="Autos" className='Acordion-H2 ajustar-txt'>
                                <IonAccordion key={i} value="Autos">
                                  <IonItem slot="header" color="primary" class="ItemHeader-H2">
                                    <IonGrid>
                                        <IonRow>
                                        <IonCol class="col-H2" size="3">
                                            <IonImg class="img1Col-H2" src="assets/icon/auto.svg"/>
                                        </IonCol>
                                        <IonCol class="col-H2" size="9">Autos</IonCol>
                                    </IonRow>
                                    </IonGrid>
                                  </IonItem>
                                  {auto.map((dato:any, i:any) => {
                                    return <ItemList datos={dato} key={i} obtener={props.obtener}/>;
                                  })}
                                </IonAccordion>
                              </IonAccordionGroup>
                            : <></>}

                            {salud.length !== 0
                              ? <IonAccordionGroup value='Salud' className='Acordion-H2 ajustar-txt'>
                                  <IonAccordion value='Salud'>
                                    <IonItem slot="header" color="sextary" class="ItemHeader-H2">
                                      <IonGrid>
                                          <IonRow>
                                          <IonCol class="col-H2" size="3">
                                              <IonImg class="img1Col-H2" src="assets/icon/Salud.svg"/>
                                          </IonCol>
                                          <IonCol class="col-H2" size="9">Salud y Vida</IonCol>
                                      </IonRow>
                                      </IonGrid>
                                    </IonItem>
                                    {salud.map((dato:any, i:any) => {
                                      return <ItemList datos={dato} key={i} obtener={props.obtener}/>;
                                    })}
                                  </IonAccordion>
                                </IonAccordionGroup>
                              : <></>}

                              {inmuebles.length !== 0
                                ? <IonAccordionGroup value='Inmuebles' className='Acordion-H2 ajustar-txt'>
                                    <IonAccordion value='Inmuebles'>
                                      <IonItem slot="header" color="seventh" class="ItemHeader-H2">
                                        <IonGrid>
                                            <IonRow>
                                            <IonCol class="col-H2" size="3">
                                                <IonImg class="img1Col-H2" src="assets/icon/Inmuebles.svg"/>
                                            </IonCol>
                                            <IonCol class="col-H2" size="9">Inmuebles</IonCol>
                                        </IonRow>
                                        </IonGrid>
                                      </IonItem>
                                      {inmuebles.map((dato:any, i:any) => {
                                        return <ItemList datos={dato} key={i} obtener={props.obtener}/>;
                                      })}
                                    </IonAccordion>
                                  </IonAccordionGroup>
                                : <></>}
                        </>
                        : <div className='div-A'> <IonText class='txt-A'>No hay pólizas para mostrar.</IonText> </div>}
                    </IonCol>
                  </IonRow>
                </IonGrid>
            </IonSlide>;
          }));
        })}
    </IonSlides>
  </>;
}

export default Acordion;
