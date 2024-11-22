import {useDispatch} from 'react-redux';
import {setProfile, setUser, setRecommendations} from '../store/user';
import { request } from '../request/request';
import {useNavigate} from '../hooks/useNavigate';
import debugLog from '../libs/log';

export const useLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (id, password) => {
    const config = {id, password};
    const loginData = await request('/login', 'POST', config);

    if (loginData) {
      dispatch(
        setUser({
          id: loginData.id,
          cookie: loginData.cookie,
          profiles: loginData.profiles,          
        })
      );
      navigate('select');
    } else {

    }
  };

  return {handleLogin};
};

export const useSignUP = () => {

  const handleSignUp = async (id, password) => {
    const config = { id: id, password: password }
    const signUpData = await request('/signup', 'POST', config);

    if (signUpData?.success) {
      
    } else {
      
    }
  };

  return {handleSignUp};
}

export const useSelectProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSelectProfile = async (profile) => {
    debugLog('SelectProfile[I]', {});
    dispatch(setProfile({ profile }));

    const recommendations = await request('/restaurant/recommendations', 'GET');
    if (recommendations) {
      dispatch(setRecommendations({recommendations}));
      debugLog('Recommendations[S]', {recommendations});

      navigate('main');
    } else {

    }
  };
  return {handleSelectProfile};
}