import axios from 'axios';
import { isDevServe } from '../libs/utils';
import debugLog from '../libs/log';
import { mockAPI } from '../../__mocks__/api/request';

/**
 * General API request function
 * Uses mock data in development mode, axios in production.
 * @param {string} url - API endpoint
 * @param {string} method - HTTP method ('GET', 'POST', etc.)
 * @param {Object} parameters - Request payload or query parameters
 * @returns {Promise<Object>} - API response
 */
export const request = async (url, method = 'GET', parameters = {}) => {
  try {
    if (isDevServe()) {
      debugLog("Mock Request[I]]", {url, method, parameters});
      return await mockAPI(url, method, parameters);
    }

    const config = {
      url,
      method,
      data: method === 'POST' ? parameters : null,
      params: method === 'GET' ? parameters : null,
    };

    debugLog("API Request[I]", config);
    const response = await axios(config);
    return response.data;

  } catch (error) {
    debugLog("API Request[E]", {error});
    throw error.response?.data || error.message;
  }
};
