
import firebase from 'firebase';

import { db } from '..';
import { COLLECTIONS } from '../firebase.constants';

export const DEFAULT_ITEMS = [
  'Burpees',
  'Push-ups',
  'Skaters',
  'Plank',
  'Mountain Climbers',
  'Squats',
  'Lunges'
]

export interface IItem {
  id?: string,
  label: string,
  created: Date
}

export const ItemMethods = {
  getItems: async (): Promise<IItem[]> => {
    const user = firebase.auth().currentUser

    if (user) {
      try {
        let ItemsRef = db.collection(COLLECTIONS.USERS).doc(user.uid).collection(COLLECTIONS.ItemS)
        let activeRef = await ItemsRef.get();
  
        const Items: IItem[] = []
        for (let Item of activeRef.docs) {
          let data = Item.data()

          const newItem = {
            id: Item.id,
            label: String(data.label),
            created: data.created
          }
  
          Items.push(newItem)
        }

        return Items
      } catch (err) {
        console.log('error getting Items');
        return []
      }
    } else {
      return []
    }
  },
  addItem: async (label: string, handleAddItem: (label: string, id: string) => void): Promise<void> => {
    const user = firebase.auth().currentUser

    if (user) {
      try {
        let ItemRef = db.collection(COLLECTIONS.USERS).doc(user.uid).collection(COLLECTIONS.ItemS).doc()

        await ItemRef.set({
          label,
          created: firebase.firestore.Timestamp.fromDate(new Date())
        });

        handleAddItem(label, ItemRef.id)

        return
      } catch (err) {
        console.log('error saving Item');
      }
    } else {
      return
    }
  },
  editItem: async (newLabel: string, id: string): Promise<void> => {
    const user = firebase.auth().currentUser;

    if (user) {
      try {
        const ItemRef = db.collection(COLLECTIONS.USERS).doc(user.uid).collection(COLLECTIONS.ItemS).doc(id)

        ItemRef.set({
          label: newLabel
        }, { merge: true });
      } catch (err) {
        console.log('error editing Item');
      }
    } else {
      return
    }
  },
  deleteItem: async (id: string): Promise<void> => {
    const user = firebase.auth().currentUser;

    if (user) {
      try {
      db.collection(COLLECTIONS.USERS).doc(user.uid).collection(COLLECTIONS.ItemS).doc(id).delete()
      } catch (err) {
        console.log('error saving Item');
      }
    } else {
      return
    }
  }
}
