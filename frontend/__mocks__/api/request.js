import { sampleRestaurants } from "./sampleRestaurants";

export const mockAPI = async (url, method, parameters = {}) => {
  const response = {
    '/login': {
      POST: {
        id: 'mockUser',
        cookie: 'mockCookie',
        profiles: [
          { profile_id: 1, name: 'Kang Nae Won' },
          { profile_id: 2, name: 'Lee Woo Jin' },
          { profile_id: 3, name: 'Lee Seung Woo' },
          { profile_id: 4, name: 'Kim' },
        ],
      }
    },
    '/signup': {
      POST: {
        success: true,
      }
    },
    '/restaurant/recommendations': {
      GET: [
        {
          type: 'Italian',
          restaurants: sampleRestaurants,
        },
        {
          type: 'Chinese',
          restaurants: sampleRestaurants,
        },
        {
          type: 'Korean',
          restaurants: sampleRestaurants,
        },
      ],
    },
    '/restaurant/{id}': {
      GET: {
        restaurant_name: 'Mosu',
        location: 'Seoul, Korea',
        rating: 4.9,
        type: 'Contemporary',
        phone: '+82-10-1234-5678',
        price: '$$$$',
      },
    },
    '/restaurant': {
      GET: {
        restaurants: [
          {
            restaurant_id: 1,
            name: 'Mosu',
            location: 'Seoul, Korea',
            rating: 4.9,
            img: 'https://example.com/mosu.jpg',
          },
          {
            restaurant_id: 2,
            name: 'Sukiyabashi Jiro',
            location: 'Tokyo, Japan',
            rating: 4.8,
            img: 'https://example.com/jiro.jpg',
          },
        ],
      },
    },
    '/user/{user_id}': {
      GET: {
        profiles: [
          { profile_id: 1, name: 'John Doe' },
          { profile_id: 2, name: 'Jane Smith' },
        ],
      },
    },
    '/profiles/{profile_id}': {
      GET: {
        favorites: [
          { restaurant_id: 3, restaurant_name: 'Gourmet Spot' },
        ],
        visited: [
          { restaurant_id: 1, restaurant_name: 'Mosu' },
        ],
      },
    },
    '/profile/{profile_id}/favorite': {
      POST: { success: true, message: 'Added to favorites' },
    },
    '/profile/{profile_id}/favorite/{restaurant_id}': {
      DELETE: { success: true, message: 'Removed from favorites' },
    },
    '/profile/{profile_id}/visit': {
      POST: { success: true, message: 'Added to visit history' },
    },
    '/profile/{profile_id}/visit/{restaurant_id}': {
      DELETE: { success: true, message: 'Removed from visit history' },
    },
    '/profile/{profile_id}/watch-history': {
      POST: { success: true, message: 'Watch history updated' },
    },
    '/media/{media_id}': {
      GET: {
        media_id: 123,
        title: 'Cooking Masterclass',
        duration: '2 hours',
        url: 'https://example.com/media/cooking.mp4',
      },
    },
  };

  await new Promise((resolve) => setTimeout(resolve, 500));

  if (response[url] && response[url][method]) {
    return response[url][method];
  }

  // Handle dynamic paths
  const dynamicPaths = Object.keys(response).filter((key) => key.includes('{'));

  for (const path of dynamicPaths) {
    const regex = new RegExp('^' + path.replace(/{[^}]+}/g, '[^/]+') + '$');
    if (regex.test(url) && method in response[path]) {
      return response[path][method];
    }
  }

  return { success: false, error: `No mock data available for ${url} with method ${method}` };
};
