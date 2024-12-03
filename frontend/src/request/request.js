import axios from 'axios';
import { isDevServe } from '../libs/utils';
import debugLog from '../libs/log';
import { mockAPI } from '../../__mocks__/api/request';

<<<<<<< HEAD
// axios.defaults.baseURL='http://10.1.145.195';
=======
axios.defaults.baseURL = '';

export const request = async (url, method = 'GET', parameters = {}, options = {}, token = null) => {
>>>>>>> ce85e0ce09596f6d4ace1394b417d45b7e16af2d

  const makeRequest = async () => {

    if (isDevServe()) {
      debugLog("Mock Request[I]", { url, method, parameters });
      return await mockAPI(url, method, parameters);
    }
    const baseURL = "http://192.168.0.38:3000";
    const config = {
<<<<<<< HEAD
      url: baseURL + url,
=======
      url: "http://10.1.20.94:3000" + url,
>>>>>>> ce85e0ce09596f6d4ace1394b417d45b7e16af2d
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
