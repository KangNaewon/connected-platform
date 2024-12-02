import { Panel, Header } from '@enact/sandstone/Panels';
import Button from '@enact/ui/Button';
import InputField from '@enact/sandstone/Input';
import {Cell, Column, Row} from '@enact/ui/Layout';
import { useState } from 'react';
import {PROJECT_NAME} from '../constants/strings';
import useLoginHandler from '../handlers/Login/LoginHandler';

const LoginPanel = () => {
  const [state, setState] = useState({id: '', password: ''});

  const handleLoginClick = useLoginHandler(state);

  return (
    <Panel>
      <Header title={PROJECT_NAME} centered={true} />
      <Row>
        <Cell size="33%" />
        <Cell align='center'>
          <Column>
            <Cell size="25%" />
            <Cell align='center'>
              <InputField
                type="text"
                value={state.id}
                onChange={(e) => setState((prev) => ({...prev, id: e.value}))}
                placeholder="Enter your ID"
              />
            </Cell>
            <Cell align='center'>
              <InputField
                type="password"
                value={state.password}
                onChange={(e) => setState((prev) => ({...prev, password: e.value}))}
                placeholder="Enter your Password"
              />
            </Cell>
            <Row align='center'>
              <Cell align='start'>
                <Button onClick={handleLoginClick}>
                  Login
                </Button>
              </Cell>
              <Cell align='end'>
                <Button onClick={handleLoginClick}>
                  Sign Up
                </Button>
              </Cell>
            </Row>
          </Column>
        </Cell>
        <Cell size="33%" />
      </Row>
    </Panel>
  )
};

export default LoginPanel;