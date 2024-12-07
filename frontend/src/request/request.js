import axios from 'axios';
import { isDevServe } from '../libs/utils';
import debugLog from '../libs/log';
import { mockAPI } from '../../__mocks__/api/request';

const baseURL = "http://192.168.0.38:3000";

export const request = async (url, method = 'GET', parameters = {}, options = {}, token = null) => {

  const makeRequest = async () => {

    if (isDevServe()) {
      debugLog("Mock Request[I]", { url, method, parameters });
      return await mockAPI(url, method, parameters);
    }
    debugLog('MakeRequest[I]', token);


    const config = {
      url: baseURL + url,
      method,
      data: method === 'POST' ? parameters : null,
      params: method === 'GET' ? parameters : null,
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
    };

    debugLog("API Request[I]", config);
    const response = await axios(config);
    return response.data;
  };

  try {
    return await makeRequest();
  } catch (error) {
    debugLog("API Request[E]", { error });
    throw error.response?.data || error.message;
  }
};

// export baseURL
export { baseURL };