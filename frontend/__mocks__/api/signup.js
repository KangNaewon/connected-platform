export const signup = async (url, method, parameters) => {
  const response = {
    '/api/signup': {
      POST: { success: true },
    },
  }

  await new Promise((resolve) => setTimeout(resolve, 500));
  
  if (response[url] && response[url][method]) {
    return response[url][method];
  }

  return { success: false, error: `No mock data available for ${url} with method ${method}` };
};