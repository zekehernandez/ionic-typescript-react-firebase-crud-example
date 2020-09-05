import React from 'react';
import { IonContent, IonPage } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import Header from '../components/common/Header';
import './Tab2.css';

const Tab2: React.FC = () => {
  return (
    <IonPage>
      <Header pageName="Tab 2"/>
      <IonContent fullscreen>
        <ExploreContainer name="Tab 2 page" />
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
