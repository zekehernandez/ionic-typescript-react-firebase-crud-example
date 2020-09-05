import React from 'react'

import { Redirect, Route } from 'react-router-dom';

import { IonRouterOutlet } from '@ionic/react';

import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import { PAGES } from './pages/page.constants';

const UnauthenticatedApp = () => {
  return (
    <IonRouterOutlet id="main">
      <Route path={PAGES.SIGNUP.ROUTE} component={SignupPage} exact/>
      <Route path={PAGES.LOGIN.ROUTE} component={LoginPage} exact/>
      <Redirect to={PAGES.LOGIN.ROUTE} />
    </IonRouterOutlet>
  )
}

export default UnauthenticatedApp

