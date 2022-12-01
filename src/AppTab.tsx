import { IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonIcon, IonLabel } from '@ionic/react';
import { home, informationCircle, reader } from 'ionicons/icons';
import { Route } from 'react-router';
// import Menu from './components/Menu';
import ContactUs from './pages/ContactUs/contacUs';
import Expenses from './pages/Dashboard/expenses';
import Home from './pages/Dashboard/Home';
import MyPolicies from './pages/Dashboard/HomeMyPolicies';

const AppTabs: React.FC = () => {
  return (

      <IonTabs>
                <IonRouterOutlet animated={false} id='main'>
                    <Route exact path="/expenses"> <Expenses /> </Route>
                    <Route exact path="/home"> <Home /> </Route>
                    <Route exact path="/myPolicies/:condi?"> <MyPolicies />  </Route>
                    <Route exact path="/contacUs"> <ContactUs /> </Route>
                    {/* <Route exact path="/detailPolicy"> <DetailPolicy/> </Route> */}
                </IonRouterOutlet>
                {/* Rutas con Tab e iconos */}
                <IonTabBar slot="bottom">
                    <IonTabButton tab="home" href="/home">
                        <IonIcon icon={home} />
                        <IonLabel>Inicio</IonLabel>
                    </IonTabButton>
                    <IonTabButton tab="mypolicies" href="/myPolicies">
                        <IonIcon icon={reader} />
                        <IonLabel>Pólizas</IonLabel>
                    </IonTabButton>
                    <IonTabButton tab="contactUs" href="/contacUs">
                        <IonIcon icon={informationCircle} />
                        <IonLabel>Contáctanos</IonLabel>
                    </IonTabButton>
                </IonTabBar>
            </IonTabs>
  );
};
export default AppTabs;
