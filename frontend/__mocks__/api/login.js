export const login = async (url, method, parameters) => {
  const response = {
    '/api/login': {
      POST: { success: true },
    },
  }

  console.log(url);
  console.log(method);
  await new Promise((resolve) => setTimeout(resolve, 500));
  
  if (response[url] && response[url][method]) {
    console.log("success to access to mock data")
    return response[url][method];
  }
  console.log("fail to access to mock data")
  return { success: false, error: `No mock data available for ${url} with method ${method}` };
};