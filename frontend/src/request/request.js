import axios from 'axios';
import { isDevServe } from '../libs/utils';
import { login } from '../../__mocks__/api/login';
import { signup } from '../../__mocks__/api/signup';

const mockRequest = async (url, method, parameters) => {
  const routes = {
    '/api/login': login,
    '/api/signup': signup,
    // Add more mock routes as needed
  }
  const mockHandler = routes[url];
  if (mockHandler) {
    return await mockHandler(url, method, parameters);
  }
}

/**
 * General API request function
 * Uses mock data in development mode, axios in production.
 * @param {string} url - API endpoint
 * @param {string} method - HTTP method ('GET', 'POST', etc.)
 * @param {Object} parameters - Request payload or query parameters
 * @returns {Promise<Object>} - API response
 */

export const request = async (url, method = 'GET', parameters = {}) => {
  // Use mock data in development
  if (isDevServe()) {
    return await mockRequest(url, method, parameters);
  }

  // Use axios for real API requests
  try {
    const config = {
      url,
      method,
      data: method === 'POST' ? parameters : null,
      params: method === 'GET' ? parameters : null,
    };
    const response = await axios(config);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
