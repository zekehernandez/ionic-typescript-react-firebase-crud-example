import React from 'react';
import { IonContent, IonPage } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import Header from '../components/common/Header';
import './Tab3.css';

const Tab3: React.FC = () => {
  return (
    <IonPage>
      <Header pageName="Tab 3"/>
      <IonContent fullscreen>
        <ExploreContainer name="Tab 3 page" />
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
