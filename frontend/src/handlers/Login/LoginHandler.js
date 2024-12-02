import { useCallback } from "react";
import { request } from "../../request/request";
import { panelName } from "../../constants/panelName";
import debugLog from "../../libs/log";
import { useAuth } from "../../context/AuthContext";
import {useNavigate} from '../../hooks/useNavigate';

/**
 * Login handler function
 * Handles user login and updates context and panel state.
 * @param {Object} state - Contains user input (id and password)
 * @param {Function} setPanelData - Function to update panel state
 */
const useLoginHandler = (state, setPanelData) => {
  const { setUserAccessToken, setRefreshToken } = useAuth();
  const navigate = useNavigate();

  return useCallback(async () => {
    try {
      const response = await request('/user/login', 'POST', {
        id: state.id,
        password: state.password,
      });

      debugLog('LoginResult[I]', response);

      setUserAccessToken(response.access_token);
      setRefreshToken(response.refresh_token);

      navigate(panelName.select, {userId: state.id});

    } catch (error) {
      console.error('Login Failed:', error.message || error);
    }
  }, [setUserAccessToken, setRefreshToken, setPanelData, state]);
};

export default useLoginHandler;
