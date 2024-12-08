import { Panel, Header } from '@enact/sandstone/Panels';
import Button from '@enact/sandstone/Button';
import InputField from '@enact/sandstone/Input';
import {Cell, Column, Row} from '@enact/ui/Layout';
import { useState } from 'react';
import {PROJECT_NAME} from '../constants/strings';
import useLoginHandler from '../hooks/Login/useLogin';
import useSignupHandler from '../hooks/Login/useSignup';
import { usePopup } from '../components/Popup/usePopup';
import Popup from '../components/Popup/Popup';

const LoginPanel = () => {
  const [state, setState] = useState({id: '', password: ''});
  const {isPopupOpen, handlePopupOpen, handlePopupClose, msg} = usePopup();

  const handleLoginClick = useLoginHandler(handlePopupOpen);
  const handleSignupClick = useSignupHandler(handlePopupOpen);

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
                placeholder="Enter your PW"
              />
            </Cell>
            <Row align='center'>
              <Cell align='start'>
                <Button onClick={() => handleLoginClick(state.id, state.password)}>
                  Login
                </Button>
              </Cell>
              <Cell align='end'>
                <Button onClick={() => handleSignupClick(state.id, state.password)}>
                  Sign Up
                </Button>
              </Cell>
            </Row>
          </Column>
        </Cell>
        <Cell size="33%" />
      </Row>
      <Popup 
        isPopupOpen={isPopupOpen}
        handlePopupClose={handlePopupClose}
        msg={msg}
      />
    </Panel>
  )
};

export default LoginPanel;