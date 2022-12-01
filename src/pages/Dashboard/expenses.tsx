import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCol,
  IonContent,
  IonIcon,
  IonImg,
  IonInput,
  IonPage,
  IonRow,
  IonText
} from '@ionic/react';
import { mic } from 'ionicons/icons';
import { useState } from 'react';
import HomeTop from '../../components/HomeTop';

import './expenses.css';

const Expenses: React.FC = () => {
  const [viewMenu, setViewMenu] = useState(false);

  return (
    <IonPage>
      <IonContent fullscreen>
        <HomeTop viewMenu={viewMenu} setViewMenu={setViewMenu} avatar='assets/img/avatarHome.png' subtitle='¡Es bueno tenerte de vuelta!' hidden={false} />
        <IonRow className={viewMenu ? 'conetentOpen' : 'conetentClose'}>

          <IonCol size="0.5"></IonCol>
          <IonCol size="11">
            {/* <IonSearchbar
                            id='search' value={searchText} onIonChange={e => setSearchText(e.detail.value!)}
                            showCancelButton="focus" color='transparent'>
                        </IonSearchbar> */}
            {/* TODO: falta search Bar */}
            <div className="divSearch">
              <IonRow>
                <IonCol size="0">
                  {/* <IonIcon className='iconSearchBar' icon={search}>                               </IonIcon> */}
                </IonCol>
                <IonCol size="10">
                  <IonInput className="" placeholder="Search">
                    {' '}
                  </IonInput>
                </IonCol>
                <IonCol size="1.5">
                  <div className="ion-text-center">
                    <IonIcon id="iconSearchBar" icon={mic}></IonIcon>
                  </div>
                </IonCol>
              </IonRow>
            </div>

            <div className="ion-text-left">
              <IonText>
                <b>JULY 23</b>
              </IonText>
            </div>

            {/* Card1 */}
            <IonCard className="card">
              <IonCardContent className="cardContent">
                <IonRow>
                  <IonCol size="3" className="cardContentCol1">
                    <IonImg
                      className="imgCard"
                      src="assets/img/Receiptticked.png"
                      alt="Imagen de producto"
                    ></IonImg>
                  </IonCol>
                  <IonCol size="9">
                    <IonCardHeader id="headerCard">
                      <IonRow>
                        <IonCol size="7"></IonCol>
                        <IonCol size="5">
                          <div className="ion-text-center" id="itemDivCard">
                            <IonText>Meal & entertainment</IonText>
                          </div>
                        </IonCol>
                      </IonRow>
                      <IonText className="nameCard">
                        <b>Chicken Republic</b>
                      </IonText>
                      <IonCardSubtitle className="priceCard">
                        <b>$ 1,950.76</b>{' '}
                      </IonCardSubtitle>
                    </IonCardHeader>
                  </IonCol>
                </IonRow>
                {/* Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias inventore, quaerat, adipisci reprehenderit hic omnis delectus est accusantium amet, asperiores voluptate. Aliquam dolore eligendi fugiat repudiandae, ipsa adipisci. Tenetur, velit? */}
              </IonCardContent>
            </IonCard>
            {/* Card2 */}
            <IonCard className="card">
              <IonCardContent className="cardContent">
                <IonRow>
                  <IonCol size="3" className="cardContentCol1">
                    <IonImg
                      className="imgCard"
                      src="assets/img/Receiptticked2.png"
                      alt="Imagen de producto"
                    ></IonImg>
                  </IonCol>
                  <IonCol size="9">
                    <IonCardHeader id="headerCard">
                      <IonRow>
                        <IonCol size="7"></IonCol>
                        <IonCol size="5">
                          <div className="ion-text-center" id="itemDivCard">
                            <IonText>Meal & entertainment</IonText>
                          </div>
                        </IonCol>
                      </IonRow>
                      <IonText className="nameCard">
                        <b>Chicken Republic</b>
                      </IonText>
                      <IonCardSubtitle className="priceCard">
                        <b>$ 1,950.76</b>{' '}
                      </IonCardSubtitle>
                    </IonCardHeader>
                  </IonCol>
                </IonRow>
                {/* Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias inventore, quaerat, adipisci reprehenderit hic omnis delectus est accusantium amet, asperiores voluptate. Aliquam dolore eligendi fugiat repudiandae, ipsa adipisci. Tenetur, velit? */}
              </IonCardContent>
            </IonCard>
            {/* Card2 */}
            <IonCard className="card">
              <IonCardContent className="cardContent">
                <IonRow>
                  <IonCol size="3" className="cardContentCol1">
                    <IonImg
                      className="imgCard"
                      src="assets/img/Receiptticked3.png"
                      alt="Imagen de producto"
                    ></IonImg>
                  </IonCol>
                  <IonCol size="9">
                    <IonCardHeader id="headerCard">
                      <IonRow>
                        <IonCol size="7"></IonCol>
                        <IonCol size="5">
                          <div className="ion-text-center" id="itemDivCard">
                            <IonText>Others</IonText>
                          </div>
                        </IonCol>
                      </IonRow>
                      <IonText className="nameCard">
                        <b>Chicken Republic</b>
                      </IonText>
                      <IonCardSubtitle className="priceCard">
                        <b>$ 1,950.76</b>{' '}
                      </IonCardSubtitle>
                    </IonCardHeader>
                  </IonCol>
                </IonRow>
                {/* Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias inventore, quaerat, adipisci reprehenderit hic omnis delectus est accusantium amet, asperiores voluptate. Aliquam dolore eligendi fugiat repudiandae, ipsa adipisci. Tenetur, velit? */}
              </IonCardContent>
            </IonCard>

            <div className="ion-text-left">
              <IonText>
                <b>JULY 22</b>
              </IonText>
            </div>

            {/* Card4 */}
            <IonCard className="card">
              <IonCardContent className="cardContent">
                <IonRow>
                  <IonCol size="3" className="cardContentCol1">
                    <IonImg
                      className="imgCard"
                      src="assets/img/Receiptticked4.png"
                      alt="Imagen de producto"
                    ></IonImg>
                  </IonCol>
                  <IonCol size="9">
                    <IonCardHeader id="headerCard">
                      <IonRow>
                        <IonCol size="7"></IonCol>
                        <IonCol size="5">
                          <div className="ion-text-center" id="itemDivCard">
                            <IonText>Meal & entertainment</IonText>
                          </div>
                        </IonCol>
                      </IonRow>
                      <IonText className="nameCard">
                        <b>Chicken Republic</b>
                      </IonText>
                      <IonCardSubtitle className="priceCard">
                        <b>$ 1,950.76</b>{' '}
                      </IonCardSubtitle>
                    </IonCardHeader>
                  </IonCol>
                </IonRow>
                {/* Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias inventore, quaerat, adipisci reprehenderit hic omnis delectus est accusantium amet, asperiores voluptate. Aliquam dolore eligendi fugiat repudiandae, ipsa adipisci. Tenetur, velit? */}
              </IonCardContent>
            </IonCard>
            {/* Card6 */}
            <IonCard className="card">
              <IonCardContent className="cardContent">
                <IonRow>
                  <IonCol size="3" className="cardContentCol1">
                    <IonImg
                      className="imgCard"
                      src="assets/img/Receiptticked5.png"
                      alt="Imagen de producto"
                    ></IonImg>
                  </IonCol>
                  <IonCol size="9">
                    <IonCardHeader id="headerCard">
                      <IonRow>
                        <IonCol size="7"></IonCol>
                        <IonCol size="5">
                          <div className="ion-text-center" id="itemDivCard">
                            <IonText>Meal & entertainment</IonText>
                          </div>
                        </IonCol>
                      </IonRow>
                      <IonText className="nameCard">
                        <b>Chicken Republic</b>
                      </IonText>
                      <IonCardSubtitle className="priceCard">
                        <b>$ 1,950.76</b>{' '}
                      </IonCardSubtitle>
                    </IonCardHeader>
                  </IonCol>
                </IonRow>
                {/* Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias inventore, quaerat, adipisci reprehenderit hic omnis delectus est accusantium amet, asperiores voluptate. Aliquam dolore eligendi fugiat repudiandae, ipsa adipisci. Tenetur, velit? */}
              </IonCardContent>
            </IonCard>
            {/* Card7 */}
            <IonCard className="card">
              <IonCardContent className="cardContent">
                <IonRow>
                  <IonCol size="3" className="cardContentCol1">
                    <IonImg
                      className="imgCard"
                      src="assets/img/Receiptticked.png"
                      alt="Imagen de producto"
                    ></IonImg>
                  </IonCol>
                  <IonCol size="9">
                    <IonCardHeader id="headerCard">
                      <IonRow>
                        <IonCol size="7"></IonCol>
                        <IonCol size="5">
                          <div className="ion-text-center" id="itemDivCard">
                            <IonText>Others</IonText>
                          </div>
                        </IonCol>
                      </IonRow>
                      <IonText className="nameCard">
                        <b>Chicken Republic</b>
                      </IonText>
                      <IonCardSubtitle className="priceCard">
                        <b>$ 1,950.76</b>{' '}
                      </IonCardSubtitle>
                    </IonCardHeader>
                  </IonCol>
                </IonRow>
                {/* Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias inventore, quaerat, adipisci reprehenderit hic omnis delectus est accusantium amet, asperiores voluptate. Aliquam dolore eligendi fugiat repudiandae, ipsa adipisci. Tenetur, velit? */}
              </IonCardContent>
            </IonCard>
            {/* Card4 */}
            <IonCard className="card">
              <IonCardContent className="cardContent">
                <IonRow>
                  <IonCol size="3" className="cardContentCol1">
                    <IonImg
                      className="imgCard"
                      src="assets/img/Receiptticked3.png"
                      alt="Imagen de producto"
                    ></IonImg>
                  </IonCol>
                  <IonCol size="9">
                    <IonCardHeader id="headerCard">
                      <IonRow>
                        <IonCol size="7"></IonCol>
                        <IonCol size="5">
                          <div className="ion-text-center" id="itemDivCard">
                            <IonText>Others</IonText>
                          </div>
                        </IonCol>
                      </IonRow>
                      <IonText className="nameCard">
                        <b>Chicken Republic</b>
                      </IonText>
                      <IonCardSubtitle className="priceCard">
                        <b>$ 1,950.76</b>{' '}
                      </IonCardSubtitle>
                    </IonCardHeader>
                  </IonCol>
                </IonRow>
                {/* Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias inventore, quaerat, adipisci reprehenderit hic omnis delectus est accusantium amet, asperiores voluptate. Aliquam dolore eligendi fugiat repudiandae, ipsa adipisci. Tenetur, velit? */}
              </IonCardContent>
            </IonCard>
          </IonCol>
          <IonCol size="0.5"></IonCol>
        </IonRow>
      </IonContent>
    </IonPage>
  );
};
export default Expenses;
