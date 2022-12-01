import { IonPage, IonContent, IonBackButton, IonButtons, IonHeader, IonTitle, IonToolbar, IonCol, IonRow, IonText, useIonRouter } from '@ionic/react';
// eslint-disable-next-line no-unused-vars
import { Fragment } from 'react';
import { useHistory } from 'react-router';
import './Style/PrivacyPolicie.css';

const PrivacyPolicie: React.FC = () => {
  // eslint-disable-next-line no-unused-vars
  const history = useHistory();
  const user = localStorage.getItem('externalId');
  const ionRouter = useIonRouter();

  document.addEventListener('ionBackButton', (ev: any) => {
    ev.detail.register(100, () => {
      //   alert(user);
      if (user != null) {
        history.replace('/home');
      } else {
        ionRouter.goBack();
      }
    });
  });

  return (
        <IonPage>
            <IonHeader>
                <IonToolbar color="primary">
                    <IonButtons slot="start">
                        <IonBackButton color='secondary' defaultHref={user != null ? '/home' : '/signUp'} />
                    </IonButtons>
                    <IonTitle slot="start">Impulsa To Go</IonTitle>
                </IonToolbar>

            </IonHeader>
            <IonContent>
                <IonRow>
                    <IonCol size='0.7'></IonCol>
                    <IonCol size='10.6'>
                        {/* {content.map((item) => {
                          return (
                                <Fragment key={item.title}>
                                    <div className='ion-text-center'>
                                        <h2 className='titlePrivacy'>{item.title}</h2>
                                    </div>
                                    <div className='ion-text-justify'>
                                        <IonText className='text'>{item.body}</IonText>
                                    </div>
                                </Fragment>
                          );
                        })} */}
                        <h2 className='titlePrivacy'><IonText color='primary'>Aviso de Privacidad App</IonText></h2>
                        <br />

                        <div className='ion-text-justify'>
                            <IonText className='text'>Impulsa de México, Agente de Seguros y Fianzas, S.A. de C.V., con domicilio convencional para oír
                                y recibir notificaciones únicamente para temas de privacidad y de protección de datos personales
                                en: 13 Poniente Norte #174, Col. Moctezuma, C.P 29030, Tuxtla Gutiérrez, Chiapas (el
                                “Responsable”), del tratamiento legítimo, controlado e informado de los datos personales (los “Datos
                                Personales”), de sus prospectos, clientes y usuarios (el “Titular”), en congruencia con su política de
                                privacidad, la Ley Federal de Protección de Datos Personales en Posesión de los Particulares (la
                                “LFPDPPP”), su reglamento, los Lineamientos del Aviso de Privacidad (los “Lineamientos”), la
                                normatividad secundaria vigente, así como estándares nacionales e internacionales en materia de
                                protección de datos personales. Con el propósito de garantizar la privacidad y el derecho a la
                                autodeterminación informativa de las personas; el Responsable podrá recabar a través de los
                                siguientes medios: (i) de manera personal, cuando el Titular los proporciona de manera física en
                                nuestras sucursales o con nuestros agentes, (ii) de manera directa, cuando el Titular los ingresa a
                                través del sitio web www.impulsaasesores.mx (el “Sitio Web”), la aplicación móvil denominada
                                “Impulsa to Go” (la “App”), o bien, cuando el Titular los proporciona vía telefónica, (iii) de manera
                                indirecta, cuando un tercero que se encuentre en el domicilio del Titular, al momento de realizar
                                visitas domiciliarias para confirmar y/o actualizar los Datos Personales, o cuando empresas privadas
                                nos los transfieren, y (iv) cuando se obtiene información a través de las fuentes de acceso público
                                permitidas por la LFPDPPP, pone a disposición del Titular el presente aviso de privacidad integral
                                (el “Aviso de Privacidad”), previo a la obtención de los Datos Personales, en estricto apego a los
                                principios de información, licitud, consentimiento, calidad, finalidad, lealtad, proporcionalidad y
                                responsabilidad previstos en la LFPDPPP y su reglamento. </IonText>
                        </div>
                        <br />

                        <h2 className='titlePrivacy'>Datos Personales que serán sometidos a tratamiento</h2>
                        <div className='ion-text-justify'>
                            <IonText className='text'>
                                Con el propósito de prestar el servicio de colacación de seguros y fianzas en su carácter de Agente
                                de Seguros y Fianzas, autorizado por la Comisión Nacional de Seguros y Fianzas, el Responsable
                                se encuentra legitimado para recabar los Datos Personales en cumplimiento con lo previsto por la
                                LFPDPPP y disposiciones aplicables, por lo que no es necesario el consentimiento del Titular para
                                efectuar su tratamiento para la consecución de las finalidades primarias del Aviso de Privacidad.
                                Con base en lo anterior, los Datos Personales que el Responsable tratará acorde a su
                                correspondiente clasificación e identificación son: <br /><br />
                                <b>Datos Personales:</b> <br /><br />
                                <div className='ion-margin-start'>
                                    <b>1.</b> Identificación y contacto.-Nombre completo, domicilio completo, fecha de nacimiento,
                                    país y entidad de nacimiento, sexo o género, estado civil, nacionalidad, Registro Federal
                                    de Contribuyentes con homoclave (“RFC”), Clave Única del Registro de Población
                                    (“CURP”), identificación oficial con folio, clave de elector, fotografía, selfie o imágenes,
                                    videoconferencias, en su caso, nombre(s), apellido paterno y materno del cónyuge. En
                                    caso de ser extranjero domicilio del país de origen, número de identificación fiscal o
                                    equivalente y país de asignación. <br /><br />
                                    <b>2.</b> Representante legal de menores o incapaces: Nombre completo, fecha de nacimiento,
                                    país y entidad de nacimiento, nacionalidad, estado civil, sexo o género, identificación
                                    oficial, RFC, domicilio completo, fotografía, selfie o imágenes, videoconferencias. <br /><br />
                                    <b>3.</b> Representante Legal o Autorizado para firmar: Nombre completo, RFC, CURP , domicilio
                                    completo, identificación oficial y relación con el Titular. En caso de ser extranjero
                                    domicilio del país de origen. <br /><br />
                                    <b>4.</b> Beneficiario: Nombre completo, domicilio completo, parentesco y fecha de nacimiento. <br /><br />
                                    <b>5.</b> Obligado solidario y/o aval, garante prendario y depositario: Nombre(s) apellido paterno
                                    y materno, domicilio completo, fecha de nacimiento, sexo o género, estado civil, RFC,
                                    CURP , identificación oficial.
                                </div>
                            </IonText>
                        </div>
                        <br />

                        <h2 className='titlePrivacy'>Datos Personales de Menores e Incapaces</h2>
                        <div className='ion-text-justify'>
                            <IonText className='text'>
                                El Responsable no celebrará operaciones que involucren el tratamiento directo de datos personales
                                de menores de edad o de personas que se encuentren en estado de interdicción o incapacidad
                                conforme a la legislación civil aplicable, sin embargo, por la naturaleza de los productos y servicios
                                que ofrece, podrá tratar dichos datos. En estos casos, los padres o tutores otorgan el consentimiento
                                expreso al suscribir el Aviso de Privacidad. En consecuencia, el Responsable efectuará un adecuado
                                tratamiento de los Datos Personales de menores e incapaces sujetándose a los deberes de
                                seguridad y confidencialidad previstos por la LFPDPPP.
                            </IonText>
                        </div>
                        <br />
                        <h2 className='titlePrivacy'>Datos Personales Sensibles.</h2>
                        <div className='ion-text-justify'>
                            <IonText className='text'>
                                El Responsable no tratará datos personales sensibles conforme a definición prevista en la LFPDPPP,
                                su reglamento y a los Lineamientos establecidos.

                            </IonText>
                        </div>
                        <br />

                        <h2 className='titlePrivacy'>Finalidades del tratamiento de los Datos Personales</h2>
                        <div className='ion-text-justify'>
                            <IonText className='text'>
                                1. Finalidades Primarias.- Necesarias para la existencia y cumplimiento de la obligación
                                jurídica derivada de los productos y/o servicios que el Titular contrata con el Responsable,
                                las cuales consisten en:<br /><br />
                                <div className='ion-margin-start'>

                                    <b>I. </b>Verificar y confirmar la identidad del Titular como cliente o prospecto de usuario del
                                    servicio.<br /><br />
                                    <b>II.</b> Verificar que los Datos Personales contenidos en la Credencial para Votar que el Titular
                                    exhiba al Responsable para el otorgamiento de los servicios y productos, coincidan con
                                    los que obran en poder del Instituto Nacional Electoral (INE), en interés del Titular y
                                    evitar que el robo de identidad se materialice en algún fraude u otro delito en su perjuicio,
                                    así como para la salvaguarda del interés público.<br /><br />
                                    <b>III.</b> Verificar que los datos del CURP del Titular proporcionados al Responsable para el
                                    otorgamiento de los servicios y productos, coincidan con los inscritos en el Registro
                                    Nacional de Población (RENAPO) de la Secretaría de Gobernación, en interés del Titular
                                    y evitar que el robo de identidad se materialice en algún fraude u otro delito en su
                                    perjuicio, así como para la salvaguarda del interés público.<br /><br />
                                    <b>IV.</b> Verificar la capacidad de pago de sus prospectos y/o clientes.<br /><br />
                                    <b>V.</b>Envío de mensajes relacionados con la funcionalidad, operatividad y promoción de los
                                    productos y servicios contemplados en la App, con el propósito otorgar al Titular mejores
                                    beneficios y/o servicios.<br /><br />
                                    <b>VI.</b> Cumplir con las obligaciones y ejercer los derechos derivados de la relación jurídica
                                    entablada entre el Responsable y el Titular.<br /><br />
                                    <b>VII.</b> Realizar las gestiones correspondientes con terceros con quienes se celebre un contrato
                                    de cesión de derechos con motivo de una posible venta de cartera.<br /><br />
                                    <b>VIII.</b> La realización de consultas, investigaciones y revisiones en relación a cualquier queja o
                                    reclamación por los servicios y/o productos del Responsable.<br /><br />
                                    <b>IX.</b> Poner a disposición del Titular, productos o servicios comerciales vinculados con la
                                    relación jurídica establecida con el Responsable, ofertados por sociedades, subsidiarias
                                    o afiliadas, o bien, por una sociedad del mismo grupo del Responsable, con finalidad de
                                    otorgar al Titular un servicio personalizado, así como una experiencia integral.<br /><br />
                                    <b>X.</b> Realizar las gestiones correspondientes con el propósito de que los Datos Personales
                                    en todo momento se mantengan actualizados, correctos y completos, en cumplimiento
                                    al principio de calidad estatuido por la LFPDPPP y los Lineamientos aplicables.
                                </div>
                                <br />
                                2. Finalidades Secundarias.- No son necesarias para la existencia y cumplimiento de la
                                obligación jurídica derivada de los productos y/o servicios que el Titular contrate con el
                                Responsable, sin embargo, son complementarias e importantes para otorgar un mejor
                                servicio al Titular (las “Finalidades Secundarias”), las cuales consisten en: <br />
                                <div className='ion-margin-start'>
                                    <b>I. </b> Elaborar perfiles de clientes o usuarios de los servicios y de los consumidores de los
                                    productos del Responsable.<br /><br />
                                    <b>II.</b> Enviar comunicados relacionados con ofertas, mensajes promocionales, comunicados
                                    con fines mercadotécnicos, publicitarios y de prospección comercial sobre productos y/o
                                    servicios nuevos o existentes.<br /><br />
                                    <b>III.</b> Promocionar en periódicos, revistas, medios visuales, televisión y redes sociales los
                                    productos y/o servicios bancarios y de crédito, beneficios adicionales, descuentos,
                                    promociones, bonificaciones y concursos, para lo cual, el Responsable podrá utilizar los Datos Personales como son: nombre, fotografías, videos, entrevistas, publicaciones y
                                    cualquier otro medio de publicidad conocido o por conocer, y aplicar encuestas, estudios de mercado, participar en eventos, concursos, trivias, juegos
                                    y sorteos, participar en redes sociales, chats e información que nos permita evaluar la
                                    calidad de los productos y/o servicios.
                                </div>
                                <br />
                                El Titular podrá revocar su consentimiento para el tratamiento de los Datos Personales para las
                                Finalidades Secundarias, en cualquier momento, mediante el procedimiento que para tal efecto se
                                establece en el apartado denominado “Medio y procedimiento para ejercer el derecho de acceso,
                                rectificación, cancelación y oposición (los “Derechos ARCO”) y Revocación del Consentimiento” del
                                Aviso de Privacidad.
                            </IonText>
                        </div>

                        <br />

                        <h2 className='titlePrivacy'>Con quién se comparten los Datos Personales</h2>
                        <div className='ion-text-justify'>
                            <IonText className='text'>
                                En cumplimiento a lo previsto por la legislación, disposiciones y ordenamientos de carácter general
                                aplicables, el Responsable realizará comunicación de los Datos Personales vía transferencia con
                                aquellos socios comerciales con quienes se tengan celebrados contratos para la comercialización
                                de productos y/o servicios ofertados, en beneficio del Titular; así como con autoridades federales y/o
                                locales que lo requieran como parte de un procedimiento, requerimiento y/o supervisión de carácter
                                administrativo y/o legal, o en caso específico, por un mandato judicial. <br />
                                Las transferencias nacionales o internacionales de los Datos Personales podrán llevarse a cabo, sin
                                el consentimiento del Titular, cuando se presente alguno de los siguientes supuestos:<br /><br />
                                <div className='ion-margin-start'>
                                    <b>1.</b> Cuando la transferencia esté prevista en una Ley o Tratado en los que México sea parte. <br /><br />
                                    <b>2.</b> Cuando la transferencia sea necesaria para la prevención o el diagnóstico médico, la
                                    prestación de asistencia sanitaria, tratamiento médico o la gestión de servicios sanitarios. <br /><br />
                                    <b>3.</b> Cuando la transferencia sea efectuada a sociedades controladoras, subsidiarias o afiliadas
                                    bajo el control común del Responsable, o a una sociedad matriz o a cualquier sociedad del
                                    mismo grupo del responsable que opere bajo los mismos procesos y políticas internas. <br /><br />
                                    <b>4.</b> Cuando la transferencia sea necesaria por virtud de un contrato celebrado o por celebrar en
                                    interés del Títular, por el Responsable y un tercero. <br /><br />
                                    <b>5.</b> Cuando la transferencia sea necesaria o legalmente exigida para la salvaguarda de un
                                    interés público, o para la procuración o administración de justicia. <br /><br />
                                    <b>6.</b> Cuando la transferencia sea precisa para el reconocimiento, ejercicio o defensa de un
                                    derecho en un proceso judicial. <br /><br />
                                    <b>7.</b> Cuando la transferencia sea precisa para el mantenimiento o cumplimiento de una relación
                                    jurídica entre el responsable y el titular. <br /><br />
                                </div>
                                Con el propósito de cumplir con la consecución de lo previsto en las finalidades primarias, el Titular
                                autoriza expresamente al Responsable para transferir a sus empresas subsidiarias, afiliadas, con
                                una sociedad del mismo grupo, o bien, con aliados comerciales; la información de acceso, así como
                                las operaciones y servicios, a que se refiere la legislación bancaria vinculada con el derecho a la
                                privacidad de los clientes y usuarios del Responsable. No obstante lo anterior, el Titular podrá
                                revocar el mandato antes referido en cualquier momento, mediante el procedimiento que para tal
                                efecto se establece en el apartado denominado “Medio y procedimiento para ejercer el derecho de
                                acceso, rectificación, cancelación y oposición (los “Derechos ARCO”) y Revocación del
                                Consentimiento” del Aviso de Privacidad.
                            </IonText>
                        </div>

                        <br />

                        <h2 className='titlePrivacy'>Registro Público de Usuarios (el “REUS”) de la Comisión Nacional para la Protección y
                            Defensa de los Usuarios de Servicios Financieros (la “CONDUSEF”) </h2>
                        <div className='ion-text-justify'>
                            <IonText className='text'>
                                Con el propósito de que el Titular pueda limitar el uso y divulgación de los Datos Personales,
                                adicionalmente podrá efectuar la inscripción correspondiente en el REUS, el cual se encuentra a
                                cargo de la CONDUSEF, con la finalidad de que los Datos Personales no sean utilizados para recibir
                                publicidad o promociones por parte de las instituciones financieras, en sus prácticas de mercadotecnia. Para mayor información sobre este registro, el Titular puede consultar el portal de
                                internet de la CONDUSEF, o bien ponerse en contacto directo con ésta.
                            </IonText>
                        </div>

                        <br />

                        <h2 className='titlePrivacy'>Medio y procedimiento para ejercer el derecho de acceso, rectificación, cancelación y
                            oposición (los “Derechos ARCO”) y Revocación del Consentimiento </h2>
                        <div className='ion-text-justify'>
                            <IonText className='text'>
                                En virtud de que el Titular tiene derecho a la protección de los Datos Personales, al acceso, rectificación y cancelación de los mismos,
                                así como a manifestar su oposición o revocación de su consentimiento para las Finalidades Secundarias, así como para las Operaciones y
                                Servicio a que se refiere la legislación bancaria, en términos de lo previsto en la LFPDPPP, podrá ejercer los Derechos ARCO, o bien,
                                la revocación del consentimiento para el tratamiento de los Datos Personales ya sea en forma personal, o bien, a través de su representante
                                legal, mediante la generación y envío de la solicitud correspondiente al Departamento de Datos Personales del Responsable, al correo
                                electronico: cumplimientoarco@impulsaasesores.com.mx y donde se le atenderá en tiempo y forma de Lunes a Jueves en un horario de 9:00 a 18:00 horas y Viernes de 9:00 a 15:00.
                                Además del ejercicio de sus derechos de Revocación o ARCO, usted podrá limitar el uso o divulgación de sus datos personales, mediante su inscripción
                                en el Registro Público de Usuarios Personas Físicas (REUS).<br /><br />

                                En caso de realizar cambios o actualizaciones al presente Aviso, el Responsable, los publicará de manera generalizada en comunicados colocados en
                                nuestras oficinas, por los medios de comunicación que utilicemos con usted, en la página www.impulsaasesores.mx o en el teléfono 800  902 3456 a nivel nacional.
                                <br /><br />

                                Para cualquier asunto o duda relacionada con este Aviso de Privacidad, puede contactarnos al correo electrónico
                                avisodeprivacidad@impulsaasesores.com.mx, o bien, al teléfono arriba mencionado. En todo caso recomendamos visite la página de internet
                                frecuentemente. En caso de alguna duda puede usted consultar al INAI en <IonText color='primary' onClick={() => window.open('https://www.inai.org.mx', '_system')}>www.inai.org.mx</IonText>
                                <br /><br />

                                {/* <IonText className='ion-text-start' >
                                        COMO SE EJERCEN EN LA PAGINA WEB ESTOS <br />DERECHOS (PENDIENTE DE ENVIAR POR PARTE DEL ABOGADO)
                                    </IonText> */}

                            </IonText>
                        </div>

                        <br />
                        {/* <br /> */}
                        <h2 className='titlePrivacy'>Departamento de Datos Personales</h2>
                        <div className='ion-text-justify'>
                            <IonText className='text'>
                                Para cualquier aclaración, comentario, queja o inconformidad con respecto a la política de privacidad
                                del Responsable, el Titular podrá enviar su petición al Departamento de Datos Personales a través
                                del correo electrónico privacidad@impulsaasesores.mx, quien dará respuesta a la petición en un
                                plazo máximo de 20 días hábiles.
                            </IonText>
                        </div>

                        <br />

                        <h2 className='titlePrivacy'>Conservación y Seguridad de los Datos Personales.</h2>
                        <div className='ion-text-justify'>
                            <IonText className='text'>
                                El Responsable y/o sus encargados, resguardan y garantizan la seguridad y confidencialidad de la
                                información y documentación del Titular, así como aquellos actos, operaciones y servicios
                                reportados, por al menos diez años a partir de que concluya la relación jurídica entre el Titular y el
                                Responsable, sin perjuicio de cumplir con los deberes de confidencialidad y seguridad previstos en
                                la LFPDPPP y su reglamento.
                            </IonText>
                        </div>

                        <br />

                        <h2 className='titlePrivacy'>Instituto Nacional de Transparencia, Acceso a la Información y Protección de Datos
                            Personales (el “INAI”) </h2>
                        <div className='ion-text-justify'>
                            <IonText className='text'>
                                En caso de que el Titular considere que su derecho de protección de los Datos Personales ha sido
                                lesionado por el tratamiento indebido de los mismos por parte del Responsable y/o sus encargados,
                                podrá interponer queja o denuncia correspondiente ante el INAI, por lo que podrá consultar el sitio
                                web <IonText color='primary' onClick={() => window.open('https://www.inai.org.mx', '_system')}>www.inai.org.mx</IonText> para mayor información.
                            </IonText>
                        </div>

                        <br />

                        <h2 className='titlePrivacy'>Uso de Cookies, Web Beacons u otras tecnologías </h2>
                        <div className='ion-text-justify'>
                            <IonText className='text'>
                                El Sitio Web y la App utilizan mecanismos de medios remotos o locales de comunicación electrónica,
                                óptica u otra tecnología, que le permitan recabar los Datos Personales de manera automática y simultánea
                                al tiempo que el Titular hace contacto con los mismos, entre ellos, Cookies y Web Beacons para simplificar la navegación.
                                <br /><br />
                                Las Cookies son archivos de texto que son descargados automáticamente y almacenados en el equipo móvil del usuario al navegar
                                en una página de Internet específica, que permiten recordar al servidor de Internet algunos datos sobre este usuario, entre ellos,
                                sus preferencias de compra para la visualización de las páginas en ese servidor, nombre y contraseña.
                                Por su parte, las Web Beacons son imágenes insertadas en una página de Internet o correo electrónico, que puede ser utilizado
                                para monitorear el comportamiento de un visitante, como almacenar información sobre la dirección IP del usuario, duración del
                                tiempo de interacción en dicha página y el tipo de navegador utilizado, entre otros.
                                <br /> <br />

                                Las Cookies son archivos de texto que son descargados automáticamente y almacenados en el equipo móvil del usuario al navegar
                                en una página de Internet específica, que permiten recordar al servidor de Internet algunos datos sobre este usuario, entre ellos,
                                sus preferencias de compra para la visualización de las páginas en ese servidor, nombre y contraseña.
                                Por su parte, las Web Beacons son imágenes insertadas en una página de Internet o correo electrónico, que puede ser
                                utilizado para monitorear el comportamiento de un visitante, como almacenar información sobre la dirección IP del usuario,
                                duración del tiempo de interacción en dicha página y el tipo de navegador utilizado, entre otros.
                                <br /> <br />
                                {/* <div className='ion-text-left'>

                                    Microsoft Internet Explorer: <IonText color='primary' onClick={() => window.open('http://www.microsoft.com/info/cookies.htm', '_system')}>http://www.microsoft.com/info/cookies.htm</IonText> <br />

                                    Mozilla Firefox: <IonText color='primary' onClick={() => window.open('http://www.mozilla.org/projects/security/pki/psm/help_21/usin g_priv_help.html', '_system')}>http://www.mozilla.org/projects/security/pki/psm/help_21/usin g_priv_help.html</IonText> <br />

                                    Google Chrome: <IonText color='primary' onClick={() => window.open('https://support.google.com/accounts/answer/61416?co=GENIE.Platfor%20m%3DDesktop&hl=es', '_system')}>https://support.google.com/accounts/answer/61416?co=GENIE.Platfor%20m%3DDesktop&hl=es</IonText> <br />

                                    Apple Safari: <IonText color='primary' onClick={() => window.open('https://support.apple.com/es- es/guide/safari/sfri11471/mac', '_system')}>https://support.apple.com/es- es/guide/safari/sfri11471/mac</IonText> <br /> <br />

                                </div> */}

                                En el caso de empleo de Cookies, el botón de ayuda que se encuentra en la barra de herramientas
                                de la mayoría de los navegadores, le dirá cómo evitar aceptar nuevas Cookies, cómo hacer que el
                                navegador le notifique cuando recibe una nueva cookie o cómo deshabilitar todas las Cookies.
                                <br />
                            </IonText>
                        </div>

                        <br />

                        <h2 className='titlePrivacy'>Exclusión de Responsabilidad</h2>
                        <div className='ion-text-justify'>
                            <IonText className='text'>
                                El Sitio Web, la App, podrían contener enlaces, hipervínculos o hipertextos “links”, banners, botones
                                y/o herramientas de búsqueda en internet que al ser utilizados por los Titulares transportan a otros
                                portales o sitios de internet que podrían ser propiedad de terceros. Por lo tanto, no controla dichos
                                sitios y no es responsable por los avisos de privacidad que ostenten, o en su caso, a la falta de ellos;
                                los Datos Personales que los Titulares llegasen a proporcionar a través dichos portales o sitios de
                                internet distintos al Sitio Web, App, son su responsabilidad, por lo que deberá verificar el aviso de
                                privacidad en cada sitio al que acceda. <br /> <br />
                                Algunos vínculos, banners y/o botones que solicitan Datos Personales dentro del Sitio Web y App
                                son responsabilidad de terceros ajenos al Responsable, quienes en ocasiones son proveedores de
                                servicios, por lo que se rigen por sus propios términos y políticas de privacidad. Para conocer más
                                acerca de este tema, lo invitamos a consultar la sección términos y condiciones.

                            </IonText>
                        </div>

                        <br />
                        <h2 className='titlePrivacy'>Modificaciones al Aviso de Privacidad. </h2>
                        <div className='ion-text-justify'>
                            <IonText className='text'>
                                El Responsable se reserva el derecho de actualizar o modificar periódicamente el Aviso de
                                Privacidad conforme a los cambios de las prácticas de información, en atención a las novedades
                                legislativas, políticas internas o nuevos requerimientos para la prestación del servicio seguros y
                                fianzas.
                                <br /> <br />
                                Dichas modificaciones estarán disponibles al público, a través del Sitio Web y App en la sección
                                Aviso de Privacidad. Se recomienda o requiere al Titular consultar el Aviso de Privacidad, por lo
                                menos semestralmente, para estar actualizado de las condiciones y términos del mismo.
                            </IonText>
                        </div>

                        <br />

                        <h2 className='titlePrivacy'>Consentimiento para el tratamiento de los Datos Personales </h2>
                        <div className='ion-text-justify ion-margin-bottom'>
                            <IonText className='text'>
                                El Titular manifiesta que ha leído, entendido y consecuentemente acepta los términos expuestos en
                                el Aviso de Privacidad, lo que constituye el consentimiento, libre, específico, inequívoco e informado, inclusive con respecto a los cambios establecidos en las actualizaciones realizadas al mismo, con
                                respecto al tratamiento de los Datos Personales en cumplimiento a lo establecido por la LFPDPPP,
                                su reglamento, los Lineamientos, así como la ley de Seguros y Fianzas y sus reglamentos.
                            </IonText>
                        </div>
                        <br /><br />

                        <h2 className='titlePrivacy'><IonText color='primary'>Términos y condiciones de uso y de servicio</IonText></h2>
                        <h2 className='titlePrivacy'><IonText>Introducción</IonText></h2>
                        <br />

                        <div className='ion-text-justify'>
                            <IonText className='text'>Bienvenido, estos son los Términos y Condiciones de Uso y de Servicio (los “Términos”) para los
                                sitios web denominados: impulsaasesores.mx (en adelante, el “Sitio”), los cuales son aplicativos y
                                vinculantes al acceso y al uso del Sitio u otros productos o servicios ofrecidos proporcionados vía
                                Internet (colectivamente, los “Servicios”) por IMPULSA DE MÉXICO, AGENTE DE SEGUROS Y
                                FIANZAS, S.A. DE C.V. (en adelante, “Impulsa”, “nosotros” o “nuestro”). <br /><br />
                                Los Servicios son utilizados por las personas ((el)(los) “Usuario(s)”) que ingresan a nuestra
                                aplicación para dispositivos móviles disponible por medio de tiendas virtuales de aplicaciones (en
                                lo sucesivo, la “App” y, de manera conjunta con el Sitio, nuestra “Plataforma”). </IonText>
                        </div>
                        <br />

                        <h2 className='titlePrivacy'><IonText>Aceptación por el Usuario</IonText></h2>
                        <br />

                        <div className='ion-text-justify'>
                            <IonText className='text'>Por favor, lee cuidadosamente estos Términos, los cuales tienen un carácter obligatorio y
                                vinculante. El registrarte o acceder a una cuenta de Usuario, o el usar los Servicios, significará tu
                                aceptación expresa con estos Términos, así como con los demás documentos incorporados a los
                                mismos por referencia, de conformidad con lo establecido en el Artículo 80 del Código de
                                Comercio y en términos de lo dispuesto por el artículo 1803 del Código Civil Federal. <br /><br />

                                El incumplimiento de estos Términos puede dar lugar, entre otros efectos, a la terminación o
                                suspensión de tus derechos de uso de los Servicios, al inicio de acciones legales por parte
                                de Impulsa y/o a sanciones civiles y penales. </IonText>
                        </div>
                        <br />

                        <h2 className='titlePrivacy'><IonText>Consentimiento por Medios Electrónicos</IonText></h2>
                        <br />

                        <div className='ion-text-justify'>
                            <IonText className='text'>El Usuario declara haber leído estos Términos, haberlos comprendido en su integridad y que desea
                                obligarse en los términos aquí previstos. La aceptación de los presentes Términos es condición
                                indispensable para registrarse en el Plataforma y acceder al servicio ofrecido. En caso de estar de
                                acuerdo con los mismos, por favor marca las casillas correspondientes, confirmando su aceptación
                                a estos Términos. <br /><br />

                                El uso de tus datos personales proporcionados a través de los servicios se regirá por nuestro aviso
                                de Privacidad. </IonText>
                        </div>
                        <br />

                        <h2 className='titlePrivacy'><IonText>Modificaciones</IonText></h2>
                        <br />

                        <div className='ion-text-justify'>
                            <IonText className='text'>Nos reservamos el derecho de hacer cambios o modificaciones a nuestros Términos en cualquier
                                momento y a nuestra entera discreción, así como en todas las políticas y normas aplicables a
                                nuestros Servicios. Los cambios que Impulsa realice serán notificados mediante la modificación de
                                la fecha efectiva de los mismos, mediante correo electrónico, mediante una notificación
                                prominente en el Sitio o de alguna otra manera. <br /><br />

                                El uso del Sitio tras dicha notificación significará tu aceptación expresa de los Términos
                                actualizados, los cuales serán vinculantes entre las partes. Por favor, revisa frecuentemente estos
                                Términos, nuestro aviso de Privacidad, así como las políticas y normas que sean aplicables a
                                nuestros Servicios, a fin de entender los términos y condiciones que aplican al uso de nuestros
                                Servicios, así como de la manera en que Impulsa recopila, usa y divulga datos personales sobre sus
                                Usuarios. </IonText>
                        </div>
                        <br />

                        <h2 className='titlePrivacy'><IonText>Cuenta de Usuarios</IonText></h2>
                        <h3 className='titlePrivacy'><IonText>Elegibilidad de Usuario</IonText></h3>
                        <br />

                        <div className='ion-text-justify'>
                            <IonText className='text'>Los Servicios solo son proporcionados para personas que tengan plena capacidad legal para
                                contratar los Servicios ofrecidos por <b>Impulsa</b>, entre otros actos jurídicos cuya celebración es
                                facilitada por la Plataforma. Para acceder a ciertas áreas y aplicaciones de nuestros Servicios,
                                deberás abrir una cuenta con tu dirección de correo electrónico y/o con tus credenciales de acceso
                                a otra red social. Al registrarte con tu dirección de correo electrónico, aceptas crear una
                                contraseña única que no utilices con ningún otro producto o servicio en línea. <br /><br />

                                El uso de la Cuenta de Usuario es personal e intransferible, por lo cual los Usuarios no se
                                encuentran facultados para ceder los datos de validación para el acceso a la Plataforma. En caso
                                de olvido de los datos de validación o de usurpación de éstos, es obligación del Usuario informarlo
                                a <b>Impulsa</b> a través de correo electrónico o mediante las funcionalidades respectivas para ello,
                                disponibles en la Plataforma. <br /><br />

                                Como nuestro Usuario, tú declaras y garantizas, bajo protesta de decir verdad, que eres mayor de
                                edad y que cuentas con la capacidad jurídica necesaria para realizar las actividades que se
                                contienen en el Sitio, así como que toda la información y documentación que proporciones en
                                relación con los Servicios, es verdadera, completa y correcta, quedando, por ende, obligado a
                                indemnizar y sacar en paz y a salvo a <b>Impulsa</b> de cualquier daño, perjuicio, demanda y/o acción
                                que dicha omisión o falsedad le provoques.</IonText>
                        </div>
                        <br />

                        <h3 className='titlePrivacy'><IonText>Registro de Usuario</IonText></h3>
                        <br />

                        <div className='ion-text-justify'>
                            <IonText className='text'>Al abrir una cuenta con nosotros, también declaras y te obligas en: (a) proporcionar información
                                precisa, veraz, actual y completa; (b) mantener y actualizar sin demora la información de tu cuenta
                                ante cualquier modificación de la misma; (c) mantener la seguridad de tu cuenta adoptando las
                                debidas precauciones para proteger tu contraseña y restringir el acceso a tu cuenta; (d) dar aviso
                                inmediato a Impulsa si descubres o sospechas la existencia de fallas de seguridad en los Servicios;
                                y (e) asumir responsabilidad por todas las actividades llevadas a cabo en tu cuenta y aceptar todos
                                los riesgos de todos los accesos, sean estos autorizados o no autorizados. <br /><br />

                                Nos reservamos el derecho de rechazar cualquier solicitud de inscripción o inclusive de cancelar
                                una inscripción de Usuario previamente aceptada, sin que estemos obligados a comunicar o
                                exponer las razones de esta decisión y sin que ello genere algún derecho a indemnización o
                                resarcimiento.</IonText>
                        </div>
                        <br />

                        <h3 className='titlePrivacy'><IonText>Responsabilidad de Usuario</IonText></h3>
                        <br />

                        <div className='ion-text-justify'>
                            <IonText className='text'>El Usuario asume íntegramente la responsabilidad (incluso civil y penal) por la falta de veracidad
                                en la información ingresada en el registro, la cual podrá ser verificada en cualquier momento por
                                Impulsa. Impulsa se reserva el derecho de no concluir con el proceso de registro e, inclusive, de
                                cancelar la cuenta de Usuario existente, impidiendo al Usuario utilizar los Servicios hasta que, a
                                criterio de Impulsa, la anomalía sea subsanada.</IonText>
                        </div>
                        <br />
                        <h3 className='titlePrivacy'><IonText>Verificacion de Usuarios</IonText></h3>
                        <br />

                        <div className='ion-text-justify'>
                            <IonText className='text'>Impulsa se reserva el derecho a implementar mecanismos para verificar que los Usuarios cumplan
                                con la edad mínima requerida por ley para la operaciones a realizarce mediante la Plataforma.
                                Para tal efecto, Impulsa se reserva el derecho de solicitar el documento de identidad del Usuario
                                al momento de efectuar el cierre de las operaciones.
                                <br /><br />
                                En caso de suministrar información falsa o insuficiente al respecto, el Usuario será responsable por
                                los perjuicios ocasionados a Impulsa, quien podrán cancelar el servicio respectivo, sin obligación
                                de pago, crédito o reembolso alguno hacia el Usuario.</IonText>
                        </div>

                        <h2 className='titlePrivacy'><IonText>Privacidad y Datos Personales</IonText></h2>
                        <br />

                        <div className='ion-text-justify'>
                            <IonText className='text'>Para utilizar los Servicios ofrecidos por Impulsa, deberás divulgarnos ciertos datos de carácter
                                personal. Los datos personales serán recolectados, tratados y almacenados en servidores o
                                medios que mantienen altos estándares de seguridad y protección tanto física como tecnológica.
                                Para mayor información sobre el tratamiento de los datos personales y casos en los que serán
                                revelados, por favor consulta nuestro Aviso de Privacidad. <br /><br />

                                Como Usuario, reconoces que al proporcionar la información de carácter personal requerida en los
                                Servicios que se prestan mediante el Sitio, otorgas a Impulsa la autorización señalada en el artículo
                                109 de la Ley Federal del Derecho de Autor.<br /><br />

                                Como Usuario, te comprometes a garantizar y responder, en cualquier caso, de la veracidad,
                                exactitud, vigencia y autenticidad de los datos personales que proporciones. De tiempo en
                                tiempo, implementaremos sistemas para solicitar comprobantes de identidad, de ingresos, de
                                domicilio, referencias personales y/o datos adicionales, a efectos de comprobar y corroborar la
                                veracidad, exactitud, vigencia y autenticidad de los datos personales recolectados. <br /><br />

                                En el caso de no poder confirmar dichos datos personales, o por algún otro motivo, nos
                                reservamos el derecho de suspender temporal o definitivamente las cuentas de Usuarios cuyos
                                datos no hayan podido ser confirmados por Impulsa. </IonText>
                        </div>
                        <h2 className='titlePrivacy'><IonText>Código de Conducta del Usuario</IonText></h2>
                        <br />

                        <div className='ion-text-justify'>
                            <IonText className='text'>Tú eres el responsable del contenido que envíes, publiques o transmitas a través de nuestros
                                Servicios. Por lo tanto, como nuestro Usuario, tú declaras y garantizas que aceptas y te obligas en
                                no a publicar, subir, transmitir, difundir, guardar, crear o generar en nuestros Servicios, contenido
                                considerado a nuestra total discreción como: (i) ilegal, injurioso, invasivo de los derechos de
                                privacidad y publicidad, o que pueda generar responsabilidad o violar leyes locales, estatales,
                                nacionales o internacionales; (ii) que contenga información privada de otra persona; (iii) que
                                contenga virus, datos dañados u otros archivos dañinos, bots, caballos troyanos, códigos
                                maliciosos o métodos y tecnologías similares; (iii) que viole alguna patente, marca, secreto
                                comercial, derechos de autor u otro derecho de propiedad intelectual de terceros; (iv) o se
                                consideraría material que constituya, aliente o proporcione instrucciones para cometer un delito
                                criminal, o que viole los derechos de terceros. <br /><br />

                                Asimismo, aceptas y te obligas en no: (i) utilizar los Servicios de una manera que interfiera,
                                interrumpa, afecte negativamente o inhiba el uso de los Servicios por parte de otros Usuarios, o
                                que pudiera dañar, inhabilitar, sobrecargar o afectar el funcionamiento de los Servicios de
                                cualquier forma; (ii) usar nuestros Servicios con cualquier fin comercial; (iii) suplantar a otra
                                persona o entidad, falsificar o tergiversar tu identidad con una persona física o moral, ya sea
                                proporcionando información falsa u omitiendo información; (iv) eludir o intentar manipular las
                                medidas de seguridad y verificación relacionadas con el Sitio y nuestros Servicios; (v) presentarte
                                como agente, representante, empleado o socio de Impulsa; o (vi) ayudar a un tercero a llevar a
                                cabo cualquiera de las acciones antes mencionadas. </IonText>
                        </div>
                        <h2 className='titlePrivacy'><IonText>Contenido y Propiedad Intelectual</IonText></h2>
                        <h3 className='titlePrivacy'><IonText>Contenido Generado por el Usuario</IonText></h3>
                        <br />

                        <div className='ion-text-justify'>
                            <IonText className='text'>Al proporcionar, enviar o publicar contenido, opiniones, sugerencias, ideas, preguntas o cualquier
                                otro contenido ingresado por el Usuario en la Plataforma mediante nuestros Servicios, nos otorgas
                                una licencia de uso permanente, irrevocable, a nivel mundial, no exclusiva, libre de regalías y
                                plenamente sublicenciable; para utilizar, reproducir, exhibir, presentar, adaptar, modificar, crear
                                trabajos derivados de dicho contenido, distribuir, hacer distribuir y promover dicho contenido en
                                cualquier forma, medios o tecnología conocidos actualmente o que puedan ser creados en
                                adelante (incluso en emails u otros tipos de comunicaciones a otros miembros). <br /><br />

                                Como nuestro Usuario, declaras y garantizas que: (a) eres dueño y controlas todos los derechos
                                del contenido que publiques o en su defecto, que tienes derecho a publicar dicho contenido en los
                                Servicios; (b) que dicho contenido publicado es exacto y no es engañoso; y (c) que el uso y la
                                publicación del contenido no viola estos Términos y no violará los derechos de ninguna persona
                                física o jurídica ni le ocasionará perjuicio alguno. </IonText>
                        </div>
                        <h3 className='titlePrivacy'><IonText>Indemidad por el Contenido del Usuario</IonText></h3>
                        <br />

                        <div className='ion-text-justify'>
                            <IonText className='text'>Asimismo, como nuestro Usuario te obligas a sacar en paz y a salvo a Impulsa por cualquier
                                reclamo resultante del contenido proporcionado. Impulsa tiene el derecho de supervisar, editar o
                                eliminar cualquier actividad o contenido. Impulsa no será responsable ni asumirá obligación
                                alguna por cualquier contenido publicado por algún Usuario o tercero, ni asumirá la obligación de
                                publicarlo o de conservarlo en el Plataforma. </IonText>
                        </div>
                        <h3 className='titlePrivacy'><IonText>Licencias de Contenido de Terceros</IonText></h3>
                        <br />

                        <div className='ion-text-justify'>
                            <IonText className='text'>A menos que se indique lo contrario, los Servicios y cualquier otro material y contenido publicado
                                en los Servicios, incluyendo de manera enunciativa pero no limitativa, el logo de Impulsa y todos
                                los diseños, textos, gráficos, imágenes, videos, información, datos, software, archivos de sonido y
                                otros archivos, y la selección y disposición de los mismos son propiedad exclusiva de Impulsa, de
                                sus empresas filiales o controladoras, o de los titulares de licencias o miembros, y están protegidos
                                por las leyes de derecho de autor de los Estados Unidos Mexicanos e internacionales. </IonText>
                        </div>
                        <h3 className='titlePrivacy'>Licencia de Usuario</h3>
                        <br />

                        <div className='ion-text-justify'>
                            <IonText className='text'>Para hacer uso de nuestra Plataforma, Impulsa concede una licencia gratuita, temporal, no
                                exclusiva e intransferible para que el Usuario solicite nuestros Servicios en la jurisdicción en que se
                                encuentre dentro del territorio nacional de los Estados Unidos Mexicanos. El Usuario se obliga a
                                no alterar, modificar, adaptar, sublicenciar, traducir, enajenar, hacer ingeniería inversa de,
                                descifrar, descompilar o de otra forma desensamblar en todo o en parte cualquier porción de
                                nuestra Plataforma y/o los archivos o programas de cómputo que los componen, o propiciar que
                                cualesquiera terceros lo hagan por cuenta y orden suya o no, con o sin ánimo de lucro. La
                                presente licencia podrá ser modificada o revocada en cualquier momento por Impulsa sin previo
                                aviso. </IonText>
                        </div>
                        <h2 className='titlePrivacy'>Servicios ofrecidos por terceros</h2>
                        <br />

                        <div className='ion-text-justify'>
                            <IonText className='text'>De tiempo en tiempo, Impulsa puede mostrar o promocionar vínculos a productos o servicios de
                                terceros. Tú reconoces que dichos productos y servicios son ofrecidos y comercializados por uno o
                                más terceros, y no por nosotros. Para mayor información, debes consultar los términos y
                                condiciones aplicables a dichos terceros, así como sus políticas de privacidad, las cuales rigen sus
                                productos y servicios. <br /><br />

                                Impulsa no es responsable de los links a páginas web de terceros incluidos en nuestra Plataforma.
                                Dichos links únicamente se proporcionan para comodidad del Usuario y el acceso a los mismos es
                                exclusiva responsabilidad de los Usuarios. </IonText>
                        </div>

                        <h2 className='titlePrivacy'>Interrupción de los Servicios</h2>
                        <br />

                        <div className='ion-text-justify'>
                            <IonText className='text'>Nosotros podremos, a nuestro entero criterio y sin incurrir en responsabilidad alguna ante ti como
                                usuario, con o sin aviso previo y en cualquier momento, desactivar, inhabilitar o interrumpir de
                                manera temporaria o permanente cualquier parte de la Plataforma o nuestros Servicios, los cuales
                                son prestados tanto por Impulsa como por terceros contratados para ello. <br /><br />

                                Al usar nuestros Servicios, lo haces bajo tu propio riesgo. En consiguiente, nuestros Servicios se
                                proveen “como son” y “en la medida que estén disponibles”; y no declaramos ni garantizamos: (a)
                                que nuestros Servicios cumplirán tus requisitos o expectativas; (b) que nuestros Servicios se
                                brindarán de manera ininterrumpida, oportuna, segura, o libre de error; (c) la calidad de
                                cualquiera de nuestros productos, actividades, información u otro material proporcionado a través
                                del Sitio o de nuestros Servicios; (d) que todo error en cualquier dato o software será corregido;
                                (e) cualquier pérdida de beneficios, ventas, negocios o ingresos; (f) pérdida o corrupción de datos,
                                información o software; (g) la pérdida de oportunidades de negocio; (h) pérdida de los ahorros
                                anticipados; (i) la pérdida del fondo de comercio, o (j) cualquier pérdida indirecta o consecuente. <br /><br />

                                <b>Impulsa</b> no puede garantizar que la información en su Plataforma sea en todo momento completa
                                y correcta, toda vez que dicha información es provista por nuestras filiales y/o terceras personas.
                                <b>Impulsa</b> podrá realizar cambios en los contenidos de su Plataforma en cualquier momento y sin
                                previo aviso.
                            </IonText>
                        </div>

                        <h2 className='titlePrivacy'>Limitación y Exención de Responsabilidad</h2>
                        <br />

                        <div className='ion-text-justify'>
                            <IonText className='text'><b>Impulsa</b> sólo será responsable por cualquier daño ocasionado al Usuario que sea derivado de la
                                negligencia o dolo inexcusables directamente atribuibles a <b>Impulsa</b> por alguna declaración falsa de
                                <b>Impulsa</b>, salvo que dicho daño sea atribuible a la negligencia de la víctima o provocados por su
                                propia negligencia o dolo. <br /><br />

                                La responsabilidad de <b>Impulsa</b> frente al Usuario en relación con el uso de la Plataforma y los
                                Servicios de <b>Impulsa</b> se encuentra limitada al valor del Serivicio requerido, mas no a los daños y
                                perjuicios que este hubiese generado. Por lo tanto el Usuario renuncia desde este momento a la
                                reclamación que por daños y perjuicios se puedese generar a su favor.
                            </IonText>
                        </div>

                        <h2 className='titlePrivacy'>Indemnización</h2>
                        <br />

                        <div className='ion-text-justify'>
                            <IonText className='text'>Cada Usuario indemnizará y se obliga a sacar en paz y a salvo a <b>Impulsa</b>, sus filiales, empresas
                                controladas y/o controlantes, directivos, administradores, representantes y empleados, por
                                cualquier reclamo o demanda de otros Usuarios o terceros por las actividades del Usuario y/o sus
                                directivos y/o administradores y/o representantes y/o empleados y/o agentes en la Plataforma o
                                por su incumplimiento a estos Términos o por la violación de cualesquiera leyes o derechos de
                                terceros, incluyendo el pago de honorarios de abogados.<br /><br />

                                <b>Impulsa</b> no será responsable del incumplimiento de sus obligaciones conforme a los presentes
                                Términos ocasionado por algún hecho que se encuentre fuera de su control, tales como el caso
                                fortuito y la fuerza mayor.
                            </IonText>
                        </div>

                        <h2 className='titlePrivacy'>Generales</h2>
                        <br />

                        <div className='ion-text-justify'>
                            <IonText className='text'><b>Impulsa</b> podrá, en cualquier momento y cuando así lo estime conveniente, ceder total o
                                parcialmente sus derechos y obligaciones derivados de los presentes Términos.
                                Si cualquier disposición de estos Términos se considerara ilegal, nula o inexigible, ya sea en su
                                totalidad o en parte, de conformidad con cualquier legislación, dicha disposición o parte de esta se
                                considerará que no forma parte de estos Términos, aunque la legalidad, validez y exigibilidad del
                                resto de las disposiciones de estos Términos no se verá afectada. En ese caso, las partes deberán
                                reemplazar dicha disposición ilegal, nula o inexigible, en todo o en parte por una disposición legal,
                                válida y exigible que tenga, en la medida de lo posible, un efecto similar al que tenía la disposición
                                ilegal, nula o inexigible, dados los contenidos y el propósito de estos Términos. <br /><br />

                                Estos Términos constituyen el contrato íntegro y el entendimiento entre las partes en relación con
                                el objeto y sustituye y reemplaza a todos los contratos o acuerdos anteriores o contemporáneos
                                en relación con dicho objeto. <br />
                                En estos Términos, las palabras “incluido/a/os/as” e “incluye/n” significan “incluido, de forma
                                meramente enunciativa”.
                            </IonText>
                        </div>

                        <h2 className='titlePrivacy'>Jurisdicción</h2>
                        <br />

                        <div className='ion-text-justify'>
                            <IonText className='text'>Estos Términos y el acuerdo contenido en ellos estarán regidos en todos sus puntos por las leyes
                                vigentes en los Estados Unidos Mexicanos, en particular respecto de la transmisión de datos,
                                contratación electrónica y comercio electrónico se regirá por lo dispuesto por la legislación federal
                                respectiva.
                            </IonText>
                        </div>
                        <h2 className='titlePrivacy'>Legislación Aplicable</h2>
                        <br />

                        <div className='ion-text-justify'>
                            <IonText className='text'>Para cualquier controversia derivada de los presentes Términos, su existencia, validez,
                                interpretación y alcance, así como el cumplimiento y ejecución del presente contrato, las partes
                                expresamente se someten a la jurisdicción de los tribunales federales competentes de la Ciudad
                                de México, renunciando en consecuencia a cualquier fuero que en razón de su domicilio presente
                                o futuro pudiera corresponderles.
                            </IonText>
                        </div>
                        <h2 className='titlePrivacy'>Contacto</h2>
                        <br />

                        <div className='ion-text-justify'>
                            <IonText className='text'>Si tienes preguntas sobre nuestra Política de Privacidad, nuestro Sitio, nuestros Servicios o en
                                general alguna cuestión respecto a nuestras prácticas de privacidad y tratamiento de datos
                                personales, por favor contáctanos al siguiente domicilio en <b>calle trece poniente norte, número
                                ciento setenta y cuatro, de la colonia Moctezuma, C.P. 29030, en la ciudad de Tuxtla Gutiérrez,
                                Chiapas</b>; o también escríbenos a avisodeprivacidad@impulsaasesores.com.mx
                            </IonText>
                        </div>
                        <br /><br />
                        <div className='ion-text-justify'>
                            <IonText className='text'>Fecha de última actualización: 23 de mayo de 2022.</IonText>
                        </div>

                        <br /><br />

                    </IonCol>
                    <IonCol size='0.7'></IonCol>
                </IonRow>
            </IonContent>
        </IonPage>
  );
};

export default PrivacyPolicie;
