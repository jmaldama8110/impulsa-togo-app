import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonRouterOutlet,
  IonSplitPane,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import AnimationBuilder from './Animation/Animations';
import OnboardingScreen from './pages/OnboardingScreen/OnboardingScreen';
import LoginRegisterScreen from './pages/Login/Login-RegisterScreen';
import SignUp from './pages/Login/SignUp';
import SignIn from './pages/Login/SignIn';
import VerificationCode from './pages/Login/VerificationCode';
import Onboarding7 from './pages/Policies/OnboardingScreen7';
import RegisterPolice from './pages/Policies/Register';
import VerificacionCodePolicy from './pages/Policies/VerificationCodePolicy';
import DonwloadPolicies from './pages/Policies/DownloadPolicies';
import DetailPolicy from './pages/Policies/DetailPolicy';
import Directory1 from './pages/Directory/Directory1';
import RecoverPassword from './pages/Login/RecoverPassword/RestorePassword';
import VerificacionCodeRecover from './pages/Login/RecoverPassword/VerificationCodeRecover/VerificationCodeRestore';
import NewPassword from './pages/Login/RecoverPassword/NewPassword/NewPassword';
import NotificationPage from './pages/NotificationPush/NotificationPush';
import PrivacyPolicie from './pages/PrivacyPolicie/PrivacyPolicie';
import Directory from './pages/Directory/Directory';
import Menu from './components/Menu';
import AppTabs from './AppTab';

setupIonicReact();


let Rutainicio = '/OnboardingScreen';
const user = localStorage.getItem('externalId');
const mostrar = localStorage.getItem('Onboarding');
const idUserPending = localStorage.getItem('Id');

if (idUserPending != null) {
  Rutainicio = '/verficationCode';
} else {
  if (user != null) {
    Rutainicio = '/home';
  } else {
    if (mostrar != null) {
      Rutainicio = '/Login-Register';
    } else {
      Rutainicio = '/OnboardingScreen';
    }
  }
}

const App: React.FC = () => {
  return (
    <IonApp>
      <IonReactRouter >
        <IonRouterOutlet animation={AnimationBuilder} animated={true}>
          <Route exact path="/"> <Redirect to={Rutainicio} /> </Route>
          <Route path="/OnboardingScreen" component={OnboardingScreen} exact />
          <Route path="/Login-Register" component={LoginRegisterScreen} exact />
          <Route path="/signUp" component={SignUp} exact />
          <Route path="/signIn" component={SignIn} exact />
          <Route path="/verficationCode" component={VerificationCode} exact />
          <Route path="/Onboarding7" component={Onboarding7} exact />
          <Route path="/registerPolicy" component={RegisterPolice} exact />
          <Route path="/verificationCodePolicies/:id" component={VerificacionCodePolicy} exact />
          <Route path="/autodownload" component={DonwloadPolicies} exact />
          <Route path="/detailPolicy" component={DetailPolicy} exact />
          <Route path="/directory1" component={Directory1} exact />
          <Route path="/recoverPassword" component={RecoverPassword} exact />
          <Route path="/verificationCodeRecover" component={VerificacionCodeRecover} exact />
          <Route path="/newPassword" component={NewPassword} exact />
          <Route path="/notify" component={NotificationPage} exact />
          <Route path="/privacyPolicie" component={PrivacyPolicie} exact />
          {/* Home Tabs */}
          <IonSplitPane>
            <Menu />
            <Route path="/directory" component={Directory} exact />
            <Route path="/expenses" render={() => <AppTabs />} exact />
            <Route path="/home" render={() => <AppTabs />} exact />
            <Route path="/myPolicies/:condi?" render={() => <AppTabs />} exact />
            {/* <Route path="/detailPolicy" render={() => <AppTabs />} exact/> */}

          </IonSplitPane>
          <Route path="/contacUs" render={() => <AppTabs />} exact />
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;