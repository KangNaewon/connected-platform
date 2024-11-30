import { Panel, Header } from '@enact/sandstone/Panels';
import Button from '@enact/ui/Button';
import InputField from '@enact/sandstone/Input';
import {Cell, Column, Row} from '@enact/ui/Layout';
import { useCallback, useContext, useState, useEffect } from 'react';
import { PanelName, PanelContext } from './Context';
import {PROJECT_NAME} from '../constants/strings';
import { request } from '../request/request';
import debugLog from '../libs/log';

const LoginPanel = () => {
  const [state, setState] = useState({id: '', password: ''});
  const {setPanelData} = useContext(PanelContext);

  const handleLogin = useCallback( async () => {
    try {
      const response = await request('/user/login', 'POST', {
        id: state.id,
        password: state.password,
      })
      
      debugLog('LoginResult[I]', response);

      setPanelData(prev => [
        ...prev,
        {
          name: PanelName.select,
          data: {
            access_token: response.access_token,
            refresh_token: response.refresh_token,
            userId: state.id,
          }
        }
      ]);
    } catch (error) {
      console.error('fuck you!', error);
    }
  }, [setPanelData, state]);  

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
                <Button onClick={handleLogin}>
                  Login
                </Button>
              </Cell>
              <Cell align='end'>
                <Button onClick={handleLogin}>
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