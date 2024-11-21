import {useDispatch} from 'react-redux';
import {setUser} from '../store/user';
import {login, signUp} from '../request/api';
import * as PATH from '../constants/path';
import {useNavigate} from './useNavigate';
import debugLog from '../libs/log';

export const useLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (id, password) => {
    try {
      const loginData = await login(id, password);

      if (loginData?.success) {
        debugLog('Login[S]', {loginData});
        dispatch(setUser({id, password}));

        const profiles = loginData.profiles || [];
        navigate(PATH.select_profile, profiles);
      } else {
        debugLog('Login[F]', {});
      }
    } catch (err) {
      debugLog('Login[E]', {error: err.message});
    }
  };

  return {handleLogin};
};


export const useSignUP = () => {

  const handleSignUp = async (id, password) => {
    try {
      const signUpData = await signUp(id, password);

      if (signUpData?.success) {
        debugLog('Sign Up[S]', {});
      } else {
        debugLog('Sign Up[F]', {});
      }
    } catch (err) {
      debugLog('Sign Up[E]', {error: err.message});
    }
  };

  return {handleSignUp};
}