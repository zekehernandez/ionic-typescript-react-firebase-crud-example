import React from 'react';
import { IonContent, IonPage } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import Header from '../components/common/Header';
import './Tab1.css';

const Tab1: React.FC = () => {
  return (
    <IonPage>
      <Header pageName="Tab 1"/>
      <IonContent fullscreen>
        <ExploreContainer name="Tab 1 page" />
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
