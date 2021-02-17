import React from 'react';
import {
    Button,
    TextField
  } from 'react95';
import Window from '../generics/window/window-component';
import { useStoreState } from 'easy-peasy';
import Cookies from 'js-cookie';

const Login = () => {

  let login = useStoreState((state) => state.login);
  let password = useStoreState((state) => state.password);

  const setLogin = (e) => {
    Cookies.set('login', e.target.value);
    login = e.target.value;
    console.log(login);
  }
  
  const setPassword = (e) => {
    Cookies.set('password', e.target.value);
    password = e.target.value;
  }

  return (
    <Window key='login' id='login' title='Connection' 
    maximized={"free"}
    top= "180" left= "400" height= "500" width= "450" 
    active={true} onClose={() => {}} onMinimize={() => {}} onMaximize={ () => {} }
    >
      <div style={{ display: 'flex'}}>
        <TextField
          value={login}
          placeholder='Entrez votre login'
          onChange={setLogin}
        />
        <TextField
          value={password}
          placeholder='Entrez votre mot de passe'
          onChange={setPassword}
        />
        {/* onClick={deleteWindow(id)} */}
        <Button  style={{ marginLeft: 4 }}>
          Se connecter
        </Button>
      </div>
    </Window>
  );
}

export default Login;