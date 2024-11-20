import { request } from './request';

/**
 * Login API
 * @param {string} id - User ID
 * @param {string} password - User password
 * @returns {Promise<Object>} - API response
 */
export const login = async (id, password) => {
  return await request('/api/login', 'POST', { id, password });
};

/**
 * Sign Up API
 * @param {string} id - User ID
 * @param {string} password - User password
 * @returns {Promise<Object>} - API response
 */
export const signUp = async (id, password) => {
  return await request('/api/signup', 'POST', { id, password });
};