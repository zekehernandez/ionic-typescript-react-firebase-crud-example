import React from 'react';
import {  IonHeader, IonTitle, IonToolbar, IonButtons, IonButton, IonIcon } from '@ionic/react';
import { exitOutline } from 'ionicons/icons';
import { useAuthentication } from '../Authentication/AuthProvider';

type HeaderProps = {
  pageName: string
}

const Header: React.FC<HeaderProps> = ({ pageName }: HeaderProps) => {
  const { handleSignout } = useAuthentication();

  const handleSignoutClick = () => {
    handleSignout()
  }
  
  return (
    <IonHeader>
      <IonToolbar>
        <IonTitle>{pageName}</IonTitle>
        <IonButtons slot="end">
          <IonButton size="small" color="danger" onClick={handleSignoutClick}>
            Sign Out
            <IonIcon slot="end" icon={exitOutline} />
          </IonButton>
        </IonButtons>
      </IonToolbar>
    </IonHeader>
  );
};

export default Header;
