import React from 'react';

import { IonPage } from '@ionic/react';

import Login from '../components/Authentication/Login';

const SignupPage: React.FC = () => {
  return (
    <IonPage>
      <Login />
    </IonPage>
  )
}

export default SignupPage;
