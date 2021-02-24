import React from 'react';
import {
  Button,
  TextField,
  Tooltip
} from 'react95';
import { useStoreState } from 'easy-peasy';
import Cookies from 'js-cookie';
import uniLogo from '../../assets/images/uni-logo.svg';
import windowsModel from '../../store/models/windows-model';
import { Programs } from '../../utils/windows/program-utils';

const Login = () => {

  let login = useStoreState((state) => state.login);
  let password = useStoreState((state) => state.password);

  const setLogin = (e) => {
    Cookies.set('login', e.target.value);
    login = e.target.value;
  }

  const setPassword = (e) => {
    Cookies.set('password', e.target.value);
    password = e.target.value;
  }

  const deleteWindow = () => {
    windowsModel.deleteWindow(windowsModel.allIds, Programs.LOGIN);
    
  }

  return (
    <div className="mt-3 is-flex is-flex-direction-row is-justify-content-space-evenly">
      <img
        src={uniLogo}
        alt='uniLogo'
        style={{ height: '60px' }}
      />
      <div className="is-flex is-flex-direction-column is-justify-content-space-evenly">
        Type a user name and password to log on to Uni OS.
        <div className="mt-5 is-flex is-flex-direction-row is-justify-content-space-between">
          User name:
          <TextField
            value={login}
            onChange={setLogin}
          />
        </div>
        <div className="mt-3 is-flex is-flex-direction-row is-justify-content-space-between">
          Password:
        <TextField
            value={password}
            onChange={setPassword}
            type="password"
          />
        </div>

      </div>

      <div className="is-flex is-flex-direction-column">

      <Button primary style={{ marginTop: 3, width: 100 }}
        onClick={deleteWindow}>
        OK
      </Button>

      <Tooltip text="Don't try to be smart" enterDelay={10} leaveDelay={50}>
        <Button style={{ marginTop: 10, width: 100 }}>
          Cancel
        </Button>
      </Tooltip>
      </div>


    </div>
  );
}

export default Login;