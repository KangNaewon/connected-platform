import { useCallback } from "react";
import { request } from "../../request/request";
import debugLog from "../../libs/log";

const useSignup = () => {

  return useCallback(async (id, password) => {
    try {
      const response = await request('/user/signup', 'POST', {
        id: id,
        password: password,
      });

      debugLog('SignupResult[I]', response);

    } catch (error) {
      console.error('Signup Failed:', error.message || error);
    }
  }, []);
};

export default useSignup;
