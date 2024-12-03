import { sampleRestaurants } from "./sampleRestaurants";

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
          },
          {
            media_id: '67473b04c12b4df30870272a',
            src: 'https://example.com/mosu.jpg',
            title: 'Mosu review',
            label: '15:10',
          },
          {
            media_id: '67473b04c12b4df30870272a',
            src: 'https://example.com/mosu.jpg',
            title: 'Mosu review',
            label: '15:10',
          }
        ]
      },
    },
    '/restaurant/search': {
      GET: {
        restaurant_id: 1
      }
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
    '/user/login': {
      POST: {
        access_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjc0MzNjOTI5MDI3NTEyOTcwMzA0MzA4IiwiaWQiOiJrbjEyNSIsImFjdGl2ZV9wcm9maWxlX2lkIjoiNjc0MzNjOTI5MDI3NTEyOTcwMzA0MzA5IiwiaWF0IjoxNzMyNzEyMjEyLCJleHAiOjE3MzI3MTU4MTJ9.DUxJJWEnSmRn-H7c6Cya3pWg2T1fWwxfpQ-gZFXVNco",
        refresh_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjc0MzNjOTI5MDI3NTEyOTcwMzA0MzA4IiwiaWQiOiJrbjEyNSIsImFjdGl2ZV9wcm9maWxlX2lkIjoiNjc0MzNjOTI5MDI3NTEyOTcwMzA0MzA5IiwiaWF0IjoxNzMyNzEyMjEyLCJleHAiOjE3MzMzMTcwMTJ9.H28WhNjGmDvY1XYqBKjvOXqRtngxZHvi7FcA-XYn2RQ"
      }
    },
    '/user/signup': {
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
    '/profile': {
      POST: {
        message: "New profile created successfully",
        created_profile: { profile_id: '67473b04c12b4df30870272a', profile_name: 'profile_name' }
      }
    },
    '/profile/{profile_id}': {
      DELETE: {
        message: "Profile deleted successfully"
      }
    },
    '/profile/{profile_id}': {
      PATCH: {
        message: 'Profile name updated successfully',
        modified_profile: {
          profile_id: "67473b04c12b4df30870272", "profile_name": 'profile_name',
        }
    },
    '/profile/switch/{profile_id}': {
      POST: {
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjc0MzNjOTI5MDI3NTEyOTcwMzA0MzA4IiwiaWQiOiJrbjEyNSIsImFjdGl2ZV9wcm9maWxlX2lkIjoiNjc0MzNjOTI5MDI3NTEyOTcwMzA0MzA5IiwiaWF0IjoxNzMyNDU5OTExLCJleHAiOjE3MzI0NjM1MTF9.j31IIV02WPlzmd10KqQ1aWAJxgDBE1_Oszy2RVZ6NHo"
      }
    },
    '/profile/{profile_id}': {
      GET: {
        likes: [
          { restaurant_id: '67473b04c12b4df30870272a', restaurant_name: 'Gourmet Spot' },
        ],
        visited: [
          { restaurant_id: '67473b04c12b4df30870272a', restaurant_name: 'Mosu' },
        ],
      },
    },
    '/profile/{profile_id}/{restaurant_id}': {
      GET: {
        liked: true,
        disliked: false,
        visited: true,
      }
    },
    '/profile/{profile_id}/like': {
      POST: { message: "restaurant successfully added to like list" },
    },
    '/profile/{profile_id}/like': {
      DELETE: { message: 'restaurant successfully deleted from like list' },
    },
    '/profile/{profile_id}/dislike': {
      POST: { message: "restaurant successfully added to dislike list" },
    },
    '/profile/{profile_id}/dislike': {
      DELETE: { message: 'restaurant successfully deleted from dislike list' },
    },
    '/profile/{profile_id}/visit': {
      POST: { message: 'restaurant successfully added to visited list' },
    },
    '/profile/{profile_id}/visit': {
      DELETE: { message: 'restaurant successfully deleted from visited list' },
    },
    /* 미확정 Mocks */
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
      '/profile/switch/{profile_id}': {
        POST: {
          token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjc0MzNjOTI5MDI3NTEyOTcwMzA0MzA4IiwiaWQiOiJrbjEyNSIsImFjdGl2ZV9wcm9maWxlX2lkIjoiNjc0MzNjOTI5MDI3NTEyOTcwMzA0MzA5IiwiaWF0IjoxNzMyNDU5OTExLCJleHAiOjE3MzI0NjM1MTF9.j31IIV02WPlzmd10KqQ1aWAJxgDBE1_Oszy2RVZ6NHo"
        }
      },
      '/profile/{profile_id}': {
        // Get profile details (liked, unvisited, visited)
        GET: {
          favorites: [
            { restaurant_id: '67473b04c12b4df30870272a', restaurant_name: 'Gourmet Spot' },
          ],
          visited: [
            { restaurant_id: '67473b04c12b4df30870272a', restaurant_name: 'Mosu' },
          ],
        },
      },
      '/profile/{profile_id}/{restaurant_id}': {
        // Get restaurant details for a specific profile (liked, disliked, visited)
        GET: {
          liked: true,
          disliked: false,
          visited: true,
        }
      },
      '/profile/{profile_id}/like': {
        // Add restaurant to like list
        POST: { message: "restaurant successfully added to like list" },
      },
      '/profile/{profile_id}/like': {
        // Remove restaurant from like list
        DELETE: { message: 'restaurant successfully deleted from like list' },
      },
      '/profile/{profile_id}/visit': {
        // Add restaurant to visited list
        POST: { message: 'restaurant successfully added to visited list' },
      },
      '/profile/{profile_id}/visit': {
        // Remove restaurant from visited list
        DELETE: { message: 'restaurant successfully deleted from visited list' },
      },
      /* 미확정 Mocks */
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
    }
  }
  };

  await new Promise((resolve) => setTimeout(resolve, 500));

  const queryIdx = url.indexOf('?');
  const baseUrl = queryIdx > -1 ? url.slice(0, queryIdx) : url;

  if (response[baseUrl] && response[baseUrl][method]) {
    return response[baseUrl][method];
  }

  // Handle dynamic paths
  const dynamicPaths = Object.keys(response).filter((key) => key.includes('{'));
  for (const path of dynamicPaths) {
    const regex = new RegExp(
      '^' + path.replace(/{[^}]+}/g, '([^/]+)') + '$'
    );
    const match = url.match(regex);
    if (match && method in response[path]) {
      return response[path][method];
    }
  }

  return { success: false, error: `No mock data available for ${url} with method ${method}` };
};
