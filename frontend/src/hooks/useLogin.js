import {useState} from 'react';
import {useDispatch} from 'react-redux';
import {setUser} from '../store/user';
import {login, signUp} from '../request/api';
import * as PATH from '../constants/path';
import {useNavigate} from './useNavigate';
import debugLog from '../libs/log';

export const useLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleLogin = async (id, password) => {
    setError(null);

    try {
      const loginData = await login(id, password);

      if (loginData?.success) {
        debugLog('Login[S]', {loginData});
        dispatch(setUser({id, password}));
        navigate(PATH.select_profile);
      } else {
        debugLog('Login[F]', {});
        setError('Login failed.');
      }
    } catch (err) {
      debugLog('Login[E]', {err});
      setError('Login error');
    }
  };

  return {handleLogin, error};
};

export const useSignUP = () => {
  const [error, setError] = useState(null);

  const handleSignUp = async (id, password) => {
    setError(null);

    try {
      const signUpData = await signUp(id, password);

      if (signUpData?.success) {
        debugLog('Sign Up[S]', {});
      } else {
        debugLog('Sign Up[F]', {});
        setError('Login failed.');
      }
    } catch (err) {
      debugLog('Sign Up[E]', {});
      setError('Login error');
    }
  };

  return {handleSignUp, error};
}