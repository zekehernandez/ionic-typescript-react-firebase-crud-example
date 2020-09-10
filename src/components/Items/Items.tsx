import React from 'react';

import { useItems } from './ItemProvider'
import { IonContent, IonItem, IonLabel, IonNote } from '@ionic/react';
import { ItemStatus } from '../../firebase/data/items';

const Items: React.FC = () => {

  const { items } = useItems()

  const getColorForStatus = (status: ItemStatus) => {
    switch (status) {
      case "draft": return "primary"
      case "published": return "success"
      case "archived": return "medium"
    }
  }

  const getLabelForStatus = (status: ItemStatus) => {
    switch (status) {
      case "draft": return "Draft"
      case "published": return "Published"
      case "archived": return "Archived"
    }
  }

  return (
    <IonContent>
      {items.map(item => (
        <IonItem>
          <IonLabel>{item.name}</IonLabel>
          <IonNote color={getColorForStatus(item.status)} slot="end">{getLabelForStatus(item.status)}</IonNote>       
        </IonItem>
      ))}
    </IonContent>
  )
}

export default Items;
