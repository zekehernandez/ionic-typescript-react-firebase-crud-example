import React, { useState, Dispatch, SetStateAction, useContext, useEffect } from 'react';

import { authMethods } from '../../firebase/auth';

interface IInputs {
  email: string,
  password: string,
}

interface IUser {
  displayName: string,
  email: string,
  photoURL: string,
  emailVerified: boolean,
  uid: string,
}

export interface IFirebaseAuth {
  handleSignup: (email: string, password: string) => Promise<void>,
  handleLogin: (email: string, password: string) => Promise<void>,
  handleSignout: () => Promise<void>,
  inputs: IInputs,
  setInputs: Dispatch<SetStateAction<IInputs>>,
  user: IUser | null | undefined,
  errors: string[],
}

const initialState = {
  handleSignup: async () => {},
  handleLogin: async () => {},
  handleSignout: async () => {},
  inputs: { email: '', password: '' },
  setInputs: () => {},
  user: undefined,
  errors: [],
}

export const firebaseAuth = React.createContext<IFirebaseAuth>(initialState);

interface AuthProviderProps {
  children: React.ReactNode
}

const AuthProvider: React.FC<AuthProviderProps> = props => {
  const [inputs, setInputs] = useState<IInputs>(initialState.inputs)
  const [errors, setErrors] = useState<string[]>([])
  const [user, setUser] = useState<IUser | null | undefined>(initialState.user)

  useEffect(() => {
    authMethods.observe(setUser)
  }, [])

  const handleSignup = async (email: string, password: string) => {
    return await authMethods.signup(email, password, setErrors, setUser)
  }

  const handleLogin = async () => {
    return await authMethods.login(inputs.email, inputs.password, setErrors, setUser)
  }

  const handleSignout = async () => {
    return await authMethods.signout(setErrors, setUser)
  }

  return (
    <firebaseAuth.Provider
      value={{
        handleSignup,
        handleLogin,
        handleSignout,
        inputs,
        setInputs,
        user,
        errors,
      }}
    >
      {props.children}
    </firebaseAuth.Provider>
  );
};

export const useAuthentication = () => {
  return useContext(firebaseAuth)
}

export default AuthProvider;
