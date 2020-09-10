import React from 'react';
import { IonContent, IonPage } from '@ionic/react';

import Header from '../components/common/Header';
import './ItemsTab.css';
import ItemProvider from '../components/Items/ItemProvider';
import Items from '../components/Items/Items';

const ItemsTab: React.FC = () => {
  return (
    <IonPage>
      <Header pageName="Items"/>
      <IonContent fullscreen>
        <ItemProvider>
          <Items />
        </ItemProvider>
      </IonContent>
    </IonPage>
  );
};

export default ItemsTab;
