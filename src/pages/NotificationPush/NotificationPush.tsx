import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonText, IonButtons, IonBackButton, useIonAlert, IonSkeletonText, IonCol, IonRow, IonLabel, useIonViewDidEnter } from '@ionic/react';
import moment from 'moment';
// import { useEffect, useState } from 'react';

// import { PushNotificationSchema, PushNotifications, Token, ActionPerformed } from '@capacitor/push-notifications';
// import { Toast } from '@capacitor/toast';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
// import { HttpStatusCode } from '../../constants/HttpStatusCode';
import NotificationsService from '../../Services/NotificationsService';
import './Style/NotificationPush.css';

const NotificationPage: React.FC = () => {
  const history = useHistory();
  const [present] = useIonAlert();
  const externalId = localStorage!.getItem('externalId') as any;
  const [notifications, setNotifications] = useState<any>();

  useIonViewDidEnter(() => {
    localStorage.setItem('countNotifications', (0).toString());
  });

  useEffect(() => {
    NotificationsService.getNotifications(externalId!).then(res => res.data)
      .catch(error => {
        present('Error de conexión', [{ text: 'Ok' }]);
        console.error('Error:', error);
      }).then(response => {
        console.log('Success:', response);
        setNotifications(response.reverse());
      });
  }, []);

  document.addEventListener('ionBackButton', (ev: any) => {
    ev.detail.register(100, () => {
      history.replace('/home');
    });
  });

  return (
    <IonPage id='main'>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonBackButton color='secondary' defaultHref='/home' />
          </IonButtons>
          <IonTitle slot="start">Notificaciones</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding ion-margin-top">
        {notifications
          ? (notifications.length !== 0
              ? <IonList>
              {notifications.map((notif: any) =>
                <IonItem key={notif.createdAt}>
                  <IonLabel>
                    <IonRow onClick={
                      () => present({
                        cssClass: 'AlertNotification',
                        header: notif.title,
                        message: notif.notification + '<br /><br />' + '<b>' + moment(notif.createdAt, 'YYYYMMDD').format('DD/MM/YYYY') + '</b>',
                        buttons: [
                          { text: 'Aceptar' }
                        ]
                      })
                    } class='no-padding textdesborded'>
                      <IonCol size='9' className='textdesborded'>
                        <IonText>
                          <h3 className=""><b>{notif.title}</b></h3>
                          <IonLabel>

                            {notif.notification}
                          </IonLabel>
                        </IonText>
                      </IonCol>
                      <IonCol size='3'>
                        <div className='ion-text-center date'>
                          <b className='dateNoti'>
                            {moment(notif.createdAt, 'YYYYMMDD').format('DD/MM/YYYY')}
                          </b>
                        </div>
                      </IonCol>
                    </IonRow>
                  </IonLabel>
                </IonItem>
              )}
            </IonList>
              : <div className='ion-text-center'><b>No hay notificaciones para mostrar.</b></div>)
          : <div className='ion-text-center'>
            <IonSkeletonText class="ion-margin-bottom" animated style={{ width: '100%', height: '65px', '--border-radius': '14px' }} />
            <IonSkeletonText class="ion-margin-bottom" animated style={{ width: '100%', height: '65px', '--border-radius': '14px' }} />
            <IonSkeletonText class="ion-margin-bottom" animated style={{ width: '100%', height: '65px', '--border-radius': '14px' }} />
            <IonSkeletonText class="ion-margin-bottom" animated style={{ width: '100%', height: '65px', '--border-radius': '14px' }} />
          </div>}
      </IonContent>
    </IonPage >
  );
};

export default NotificationPage;
