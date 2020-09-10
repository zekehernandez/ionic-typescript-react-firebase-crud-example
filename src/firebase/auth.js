import firebase from 'firebase'

import { db } from '.'
import { DEFAULT_ITEMS } from './data/items'
import { COLLECTIONS, LOCAL_STORAGE } from './firebase.constants'

export const authMethods = {
  // firebase helper methods go here... 
  signup: async (
    email,
    password,
    setErrors,
    setUser
  ) => {
    try {
      const res = await firebase.auth().createUserWithEmailAndPassword(email, password) 
      
      const token = await Object.entries(res.user)[5][1].b

      // set token to localStorage 
      await localStorage.setItem(LOCAL_STORAGE.TOKEN, token)

      // grab token from local storage and set to state. 
      setUser(res.user)
      setErrors([])

      // Once the user creation has happened successfully, we can add the currentUser into firestore
      // with the appropriate details.
      await db.collection(COLLECTIONS.USERS).doc(firebase.auth().currentUser.uid)
        .set({
          email: email
        })

      const batch = db.batch()

      let i = 0;
      for (let item of DEFAULT_ITEMS) {
        let itemRef = 
          db.collection(COLLECTIONS.USERS).doc(firebase.auth().currentUser.uid)
            .collection(COLLECTIONS.ITEMS).doc();

        let createdDate = new Date();
        createdDate.setMilliseconds(i);

        batch.set(itemRef, {
          name: item.name,
          created: firebase.firestore.Timestamp.fromDate(createdDate),
          status: item.status
        });   

        i++;
      }

      batch.commit()
    } catch (err) {
      setErrors(prev => ([...prev, err.message]))
    }
  },
  login: async (email, password, setErrors, setUser) => {
    try {
      const res = await firebase.auth().signInWithEmailAndPassword(email, password) 

      const token = await Object.entries(res.user)[5][1].b
      // set token to localStorage 
      await localStorage.setItem(LOCAL_STORAGE.TOKEN, token)
      setUser(res.user)
      setErrors([])
    } catch (err) {
      setErrors(prev => ([...prev, err.message]))
    }
  },
  signout: async (setErrors, setUser) => {
    try {
      await firebase.auth().signOut()
      // remove the token
      await localStorage.removeItem(LOCAL_STORAGE.TOKEN)
      // set the token back to original state
      setUser(null)
      setErrors([])
    } catch (err) {
      // there shouldn't every be an error from firebase but just in case
      setErrors(prev => ([...prev, err.message]))
      // whether firebase does the trick or not i want my user to do there thing.
      localStorage.removeItem(LOCAL_STORAGE.TOKEN)
      setUser(null)
    }
  },
  observe: async (setUser) => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        setUser(user)
      } else {
        setUser(null)
      }
    });
  }
}
