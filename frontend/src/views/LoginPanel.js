import { Panel, Header } from '@enact/sandstone/Panels';
import Button from '@enact/ui/Button';
import InputField from '@enact/sandstone/Input';
import {Cell, Column, Row} from '@enact/ui/Layout';
import { useState } from 'react';

import { useLogin, useSignUP } from './LoginState';
import {PROJECT_NAME} from '../constants/strings';

const LoginPanel = () => {
  const [state, setState] = useState({id: '', password: ''});
  const {handleLogin} = useLogin();
  const {handleSignUp} = useSignUP();
  
  return (
    <Panel>
      <Header title={PROJECT_NAME} centered={true} />
      <Column align='center'>
        <Cell size={180}>
          <InputField
            type="text"
            value={state.id}
            onChange={(e) => setState((prev) => ({...prev, id: e.value}))}
            placeholder="Enter your ID"
          />
        </Cell>
        <Cell size={180}>
          <InputField
            type="password"
            value={state.password}
            onChange={(e) => setState((prev) => ({...prev, password: e.value}))}
            placeholder="Enter your Password"
          />
        </Cell>
        <Cell size={180}>
          <Row>
            <Cell size="50%">
              <Button onClick={() => handleLogin(state.id, state.password)}>
                Login
              </Button>
            </Cell>
            <Cell size="50%">
              <Button onClick={() => handleSignUp(state.id, state.password)}>
                Sign Up
              </Button>
            </Cell>
          </Row>
        </Cell>
      </Column>
    </Panel>
  )
};

export default LoginPanel;