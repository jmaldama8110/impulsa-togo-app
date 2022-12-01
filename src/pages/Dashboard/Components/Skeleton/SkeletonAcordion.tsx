import { IonButtons, IonCol, IonGrid, IonItem, IonList, IonRow, IonSkeletonText } from '@ionic/react';
import '../../Styles/HomeMyPolicies.css';
import './SkeletonAcordion.css';

function SkeletonAcordion () {
  return (
    <>
        <IonList>
            <div className="txt1-S">
                <IonSkeletonText animated style={{ width: '100%', height: '22px' }}/>

            </div>
            <div className="ItemHeader-S ItemHeader1-S">
                <IonSkeletonText class='list-S' animated style={{ width: '100%', height: '50px' }} />
                <IonList slot="content" class="List-H2 list-S">
                    <IonItem class="row-H2 list-S">
                        <IonGrid>
                            <IonRow>
                                <IonCol size="2">
                                    <div className="col2-H2">
                                        <IonSkeletonText animated style={{ width: '30px', height: '30px', '--border-radius': '50%' }}/>
                                    </div>
                                </IonCol>
                                <IonCol class="col2-H2 txtC2-HM" size="7">
                                    <IonSkeletonText animated style={{ width: '70%', height: '10px' }}/>
                                </IonCol>
                                <IonCol size="1">
                                    <IonButtons>
                                        <IonSkeletonText animated style={{ width: '30px', height: '15px', '--border-radius': '50%' }}/>
                                    </IonButtons>
                                </IonCol>
                                <IonCol size='1'></IonCol>
                                <IonCol size="1">
                                    <IonButtons>
                                        <IonSkeletonText animated style={{ width: '30px', height: '15px', '--border-radius': '50%' }}/>
                                    </IonButtons>
                                </IonCol>
                            </IonRow>
                        </IonGrid>
                    </IonItem>
                </IonList>
            </div>

            <div className="ItemHeader-S">
                <IonSkeletonText class='list-S' animated style={{ width: '100%', height: '50px' }} />
                <IonList slot="content" class="List-H2 list-S">
                    <IonItem class="row-H2">
                        <IonGrid>
                            <IonRow>
                                <IonCol size="2">
                                    <div className="col2-H2">
                                        <IonSkeletonText animated style={{ width: '30px', height: '30px', '--border-radius': '50%' }}/>
                                    </div>
                                </IonCol>
                                <IonCol class="col2-H2 txtC2-HM" size="7">
                                    <IonSkeletonText animated style={{ width: '70%', height: '10px' }}/>
                                </IonCol>
                                <IonCol size="1">
                                    <IonButtons>
                                        <IonSkeletonText animated style={{ width: '30px', height: '15px', '--border-radius': '50%' }}/>
                                    </IonButtons>
                                </IonCol>
                                <IonCol size='1'></IonCol>
                                <IonCol size="1">
                                    <IonButtons>
                                        <IonSkeletonText animated style={{ width: '30px', height: '15px', '--border-radius': '50%' }}/>
                                    </IonButtons>
                                </IonCol>
                            </IonRow>
                        </IonGrid>
                    </IonItem>
                </IonList>
            </div>

            <div className="ItemHeader-S">
                <IonSkeletonText animated style={{ width: '100%', height: '50px' }} />
                <IonList slot="content" class="List-H2 list-S">
                    <IonItem class="row-H2">
                        <IonGrid>
                            <IonRow>
                                <IonCol size="2">
                                    <div className="col2-H2">
                                        <IonSkeletonText animated style={{ width: '30px', height: '30px', '--border-radius': '50%' }}/>
                                    </div>
                                </IonCol>
                                <IonCol class="col2-H2 txtC2-HM" size="7">
                                    <IonSkeletonText animated style={{ width: '70%', height: '10px' }}/>
                                </IonCol>
                                <IonCol size="1">
                                    <IonButtons>
                                        <IonSkeletonText animated style={{ width: '30px', height: '15px', '--border-radius': '50%' }}/>
                                    </IonButtons>
                                </IonCol>
                                <IonCol size='1'></IonCol>
                                <IonCol size="1">
                                    <IonButtons>
                                        <IonSkeletonText animated style={{ width: '30px', height: '15px', '--border-radius': '50%' }}/>
                                    </IonButtons>
                                </IonCol>
                            </IonRow>
                        </IonGrid>
                    </IonItem>
                </IonList>
            </div>

        </IonList>
    </>
  );
};

export default SkeletonAcordion;
