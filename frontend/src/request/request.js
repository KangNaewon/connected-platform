import axios from 'axios';
import { isDevServe } from '../libs/utils';
import debugLog from '../libs/log';
import { mockAPI } from '../../__mocks__/api/request';
import { useAuth } from '../context/AuthContext';

/**
 * General API request function with flexible token management.
 * @param {string} url - API endpoint
 * @param {string} method - HTTP method ('GET', 'POST', etc.)
 * @param {Object} parameters - Request payload or query parameters
 * @param {Object} options - Additional options (token_type, headers)
 * @returns {Promise<Object>} - API response
 */
export const request = async (url, method = 'GET', parameters = {}, options = {}, token = null) => {

  const makeRequest = async () => {
    if (isDevServe()) {
      debugLog("Mock Request[I]", { url, method, parameters });
      return await mockAPI(url, method, parameters);
    }

    const config = {
      url: "http://192.168.0.46:3000" + url,
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
