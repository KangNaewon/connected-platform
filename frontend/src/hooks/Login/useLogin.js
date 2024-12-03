import { useCallback } from "react";
import { request } from "../../request/request";
import { panelName } from "../../constants/panelName";
import debugLog from "../../libs/log";
import { useAuth } from "../../context/AuthContext";
import {useNavigate} from '../../hooks/useNavigate';
import { useUserInfo } from "../../context/UserContext";

const useLogin = (handlePopupOpen) => {
  const { setUserAccessToken, setRefreshToken } = useAuth();
  const navigate = useNavigate();
  const {setUserID} = useUserInfo();
  
  return useCallback(async (id, password) => {
    try {
      const response = await request('/user/login', 'POST', {
        id: id,
        password: password,
      });

      debugLog('LoginResult[I]', response);

      setUserAccessToken(response.access_token);
      setRefreshToken(response.refresh_token);
      setUserID(id);

      navigate(panelName.select, {});

    } catch (error) {
      debugLog('Login[F]', {error: error});
      handlePopupOpen('Login fail');
    }
  }, [setUserAccessToken, setRefreshToken]);
};

export default useLogin;