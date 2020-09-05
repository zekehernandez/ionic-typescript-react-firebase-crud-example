import React from 'react';

import { useAuthentication } from './components/Authentication/AuthProvider';

import AuthenticatedApp from './AuthenticatedApp';
import UnauthenticatedApp from './UnauthenticatedApp';

const AuthApp: React.FC = () => {
  const { user } = useAuthentication();
 
  if (user === undefined) {
    return <div></div>
  }

  return user ? <AuthenticatedApp /> : <UnauthenticatedApp />
}

export default AuthApp;
