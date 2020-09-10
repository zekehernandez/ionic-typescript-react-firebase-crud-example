import React from 'react';
import { IonContent, IonPage } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import Header from '../components/common/Header';
import './SettingsTab.css';

const SettingsTab: React.FC = () => {
  return (
    <IonPage>
      <Header pageName="Settings"/>
      <IonContent fullscreen>
        <ExploreContainer name="Settings" />
      </IonContent>
    </IonPage>
  );
};

export default SettingsTab;
