import React from 'react'
import { Redirect, Route } from 'react-router-dom';
import { IonRouterOutlet, IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel } from '@ionic/react';

import { list, settings } from 'ionicons/icons';

import ItemsTab from './pages/ItemsTab';
import SettingsTab from './pages/SettingsTab';

const AuthenticatedApp = () => {

  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route path="/items" component={ItemsTab} exact={true} />
        <Route path="/settings" component={SettingsTab} exact={true} />
        <Route path="/" render={() => <Redirect to="/items" />} exact={true} />
      </IonRouterOutlet>
      <IonTabBar slot="bottom">
        <IonTabButton tab="items" href="/items">
          <IonIcon icon={list} />
          <IonLabel>Items</IonLabel>
        </IonTabButton>
        <IonTabButton tab="settings" href="/settings">
          <IonIcon icon={settings} />
          <IonLabel>Settings</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  )
}

export default AuthenticatedApp
