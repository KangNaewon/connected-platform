export const login = async (url, method, parameters) => {
  const response = {
    '/api/login': {
      POST: { success: true, profiles: [
        {
          key: 1,
          name: "Gang Nae Won",
        },
        {
          key: 2,
          name: "Lee Woo Jin",
        },
        {
          key: 3,
          name: "Lee Seung Woo",
        },
      ]},
    },
  }

  await new Promise((resolve) => setTimeout(resolve, 500));
  
  if (response[url] && response[url][method]) {
    return response[url][method];
  }
  return { success: false, error: `No mock data available for ${url} with method ${method}` };
};