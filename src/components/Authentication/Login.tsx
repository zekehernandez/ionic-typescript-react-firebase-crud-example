// add useContext
import React, {useContext, FormEvent} from 'react';
import { useHistory } from 'react-router-dom';

import { IonItem, IonInput, IonLabel, IonCard, IonButton, IonRouterLink } from '@ionic/react';

import './Auth.css';
import { firebaseAuth } from './AuthProvider';

const Login = () => {
  const history = useHistory();

  const { handleLogin, inputs, setInputs, errors } = useContext(firebaseAuth)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await handleLogin(inputs.email, inputs.password)
    history.push('/')
  }
  const handleChange = (e: any) => {
    const { name, value } = e.currentTarget
    setInputs(prev => ({...prev, [name]: value}))
  }

  return (
      <div className="container">    
        <IonCard className="card">
          <h1 className="card-header">Login</h1>
          <form onSubmit={handleSubmit}>
            <IonItem>
              <IonLabel position="fixed">Email</IonLabel>
              <IonInput value={inputs.email} name="email" type="email" placeholder="Email" onIonChange={handleChange} />
            </IonItem>

            <IonItem>
              <IonLabel position="fixed">Password</IonLabel>
              <IonInput value={inputs.password} name="password" type="password" placeholder="Password" onIonChange={handleChange} />
            </IonItem>
            
            <IonButton className="auth-button" expand="block" type="submit">Login</IonButton>
            
            {errors.length > 0 ? errors.map(error => <p style={{color: 'red'}}>{error}</p> ) : null}
          </form>
          <div className="auth-button">
            <p>New? <IonRouterLink href="/signup">Signup</IonRouterLink></p>
          </div>
        </IonCard>
      </div>
  );
};

export default Login;