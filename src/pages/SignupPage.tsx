import React from 'react';

import { IonPage } from '@ionic/react';

import Signup from '../components/Authentication/Signup';

const SignupPage: React.FC = () => {
  return (
    <IonPage>
      <Signup />
    </IonPage>
  )
}

export default SignupPage;
