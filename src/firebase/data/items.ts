
import firebase from 'firebase';

import { db } from '..';
import { COLLECTIONS } from '../firebase.constants';

export type ItemStatus = 'draft' | 'published' | 'archived'

export const DEFAULT_ITEMS = [
  { name: 'Cheddar', status: 'draft' },
  { name: 'Brie', status: 'published' },
  { name: 'Swiss', status: 'published' },
  { name: 'Bleu', status: 'archived' },
  { name: 'Mozzarella', status: 'archived' },
]

export interface IItem {
  id?: string,
  name: string,
  created: Date,
  status: ItemStatus
}

export const itemMethods = {
  getItems: async (): Promise<IItem[]> => {
    const user = firebase.auth().currentUser

    if (user) {
      try {
        let itemsRef = db.collection(COLLECTIONS.USERS).doc(user.uid).collection(COLLECTIONS.ITEMS)
        let activeRef = await itemsRef.get();
  
        const items: IItem[] = []
        for (let item of activeRef.docs) {
          let data = item.data()

          const newItem = {
            id: item.id,
            name: String(data.name),
            created: data.created,
            status: data.status
          }
  
          items.push(newItem)
        }

        return items
      } catch (err) {
        console.log('error getting items');
        return []
      }
    } else {
      return []
    }
  },
  addItem: async (name: string, status: ItemStatus, handleAddItem: (name: string, id: string) => void): Promise<void> => {
    const user = firebase.auth().currentUser

    if (user) {
      try {
        let itemRef = db.collection(COLLECTIONS.USERS).doc(user.uid).collection(COLLECTIONS.ITEMS).doc()

        await itemRef.set({
          name,
          created: firebase.firestore.Timestamp.fromDate(new Date()),
          status
        });

        handleAddItem(name, itemRef.id)

        return
      } catch (err) {
        console.log('error saving Item');
      }
    } else {
      return
    }
  },
  editItem: async (newName: string, newStatus: ItemStatus, id: string): Promise<void> => {
    const user = firebase.auth().currentUser;

    if (user) {
      try {
        const ItemRef = db.collection(COLLECTIONS.USERS).doc(user.uid).collection(COLLECTIONS.ITEMS).doc(id)

        ItemRef.set({
          name: newName,
          status: newStatus
        }, { merge: true });
      } catch (err) {
        console.log('error editing item');
      }
    } else {
      return
    }
  },
  deleteItem: async (id: string): Promise<void> => {
    const user = firebase.auth().currentUser;

    if (user) {
      try {
      db.collection(COLLECTIONS.USERS).doc(user.uid).collection(COLLECTIONS.ITEMS).doc(id).delete()
      } catch (err) {
        console.log('error deleting item');
      }
    } else {
      return
    }
  }
}
