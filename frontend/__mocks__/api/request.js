import { sampleRestaurants } from "./sampleRestaurants";

/* 확정된 Mock
GET /restaurant/recommendations
GET /restuarant/{restaurant_id}
GET /restaurant
POST /user/login
POST /user/signup
POST /user/refresh
POST /user/refresh-token
GET /user/{user_id}/profile
*/

export const mockAPI = async (url, method, parameters = {}) => {
  const response = {
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
    '/restaurant/{restaurant_id}': {
      GET: {
        restaurant_name: 'Mosu',
        location: 'Seoul, Korea',
        description: 'Mosu는 대한민국의 레스토랑입니다.',
        rating: 4,
        type: 'Contemporary',
        phone: '+82-10-1234-5678',
        price: '$$$$',
        media: [
          {
            media_id: '67473b04c12b4df30870272a',
            src: 'https://example.com/mosu.jpg',
            title: 'Mosu review',
            label: '15:10',
          }
        ]
      },
    },
    '/restaurant': {
      GET: {
        restaurants: [
          {
            restaurant_id: '67473b04c12b4df30870272a',
            name: 'Mosu',
            location: 'Seoul, Korea',
            rating: 4,
            img: 'https://example.com/mosu.jpg',
          },
          {
            restaurant_id: '67473b04c12b4df30870272a',
            name: 'Sukiyabashi Jiro',
            location: 'Tokyo, Japan',
            rating: 3,
            img: 'https://example.com/jiro.jpg',
          },
        ],
      },
    },
    'user/login': {
      POST: {
        access_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjc0MzNjOTI5MDI3NTEyOTcwMzA0MzA4IiwiaWQiOiJrbjEyNSIsImFjdGl2ZV9wcm9maWxlX2lkIjoiNjc0MzNjOTI5MDI3NTEyOTcwMzA0MzA5IiwiaWF0IjoxNzMyNzEyMjEyLCJleHAiOjE3MzI3MTU4MTJ9.DUxJJWEnSmRn-H7c6Cya3pWg2T1fWwxfpQ-gZFXVNco",
        refresh_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjc0MzNjOTI5MDI3NTEyOTcwMzA0MzA4IiwiaWQiOiJrbjEyNSIsImFjdGl2ZV9wcm9maWxlX2lkIjoiNjc0MzNjOTI5MDI3NTEyOTcwMzA0MzA5IiwiaWF0IjoxNzMyNzEyMjEyLCJleHAiOjE3MzMzMTcwMTJ9.H28WhNjGmDvY1XYqBKjvOXqRtngxZHvi7FcA-XYn2RQ"
      }
    },
    'user/signup': {
      POST: {
        message: "User signed in successfully",
      }
    },
    '/user/refresh': {
      POST: {
        access_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjc0MzNjOTI5MDI3NTEyOTcwMzA0MzA4IiwiaWQiOiJrbjEyNSIsImFjdGl2ZV9wcm9maWxlX2lkIjoiNjc0MzNjOTI5MDI3NTEyOTcwMzA0MzA5IiwiaWF0IjoxNzMyNzEyMjEyLCJleHAiOjE3MzI3MTU4MTJ9.DUxJJWEnSmRn-H7c6Cya3pWg2T1fWwxfpQ-gZFXVNco",
      },
    },
    'user/refresh-token': {
        access_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjc0MzNjOTI5MDI3NTEyOTcwMzA0MzA4IiwiaWQiOiJrbjEyNSIsImFjdGl2ZV9wcm9maWxlX2lkIjoiNjc0MzNjOTI5MDI3NTEyOTcwMzA0MzA5IiwiaWF0IjoxNzMyNzEyMjEyLCJleHAiOjE3MzI3MTU4MTJ9.DUxJJWEnSmRn-H7c6Cya3pWg2T1fWwxfpQ-gZFXVNco",
        refresh_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjc0MzNjOTI5MDI3NTEyOTcwMzA0MzA4IiwiaWQiOiJrbjEyNSIsImFjdGl2ZV9wcm9maWxlX2lkIjoiNjc0MzNjOTI5MDI3NTEyOTcwMzA0MzA5IiwiaWF0IjoxNzMyNzEyMjEyLCJleHAiOjE3MzMzMTcwMTJ9.H28WhNjGmDvY1XYqBKjvOXqRtngxZHvi7FcA-XYn2RQ"
    },
    '/user/{user_id}/profile': {
      GET: {
        profiles: [
          { profile_id: '67473b04c12b4df30870272a', name: 'John Doe' },
          { profile_id: '67473b04c12b4df30870272a', name: 'Jane Smith' },
        ],
      },
    },

    /* 미확정 Mocks */
    '/profile/{profile_id}': {
      GET: {
        favorites: [
          { restaurant_id: '67473b04c12b4df30870272a', restaurant_name: 'Gourmet Spot' },
        ],
        visited: [
          { restaurant_id: '67473b04c12b4df30870272a', restaurant_name: 'Mosu' },
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
        media_id: '67473b04c12b4df30870272a',
        title: 'Cooking Masterclass',
        duration: '2 hours',
        url: 'https://example.com/media/cooking.mp4',
      },
    },
  };2

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
