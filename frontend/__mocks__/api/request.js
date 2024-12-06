import { sampleRestaurants } from "./sampleRestaurants";

export const mockAPI = async (url, method, parameters = {}) => {
  const response = {
    '/restaurant/recommendations': {
      // keyword에 해당하는 레스토랑들을 불러온다.
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
      // restaurant_id에 해당하는 레스토랑을 불러온다.
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
            media_id: 'test',
            thumbnail: 'https://axwwgrkdco.cloudimg.io/v7/__gmpics3__/0b2fea10bbf74553a1492b0a73c709f1.jpeg”',
            title: '1분만',
            duration: '1:00',
          },
          {
            media_id: 'test2',
            src: 'https://axwwgrkdco.cloudimg.io/v7/__gmpics3__/0b2fea10bbf74553a1492b0a73c709f1.jpeg',
            title: '야키토리 키유 리뷰 영상',
            label: '15:10',
          },
        ]
      },
    },
    '/restaurant': {
      // 레스토랑 검색
      GET: {
        restaurant_id: 1
      }
    },
    '/user/login': {
      // 로그인한 다음 user의 access token과 refresh token을 받아온다.
      POST: {
        access_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjc0MzNjOTI5MDI3NTEyOTcwMzA0MzA4IiwiaWQiOiJrbjEyNSIsImFjdGl2ZV9wcm9maWxlX2lkIjoiNjc0MzNjOTI5MDI3NTEyOTcwMzA0MzA5IiwiaWF0IjoxNzMyNzEyMjEyLCJleHAiOjE3MzI3MTU4MTJ9.DUxJJWEnSmRn-H7c6Cya3pWg2T1fWwxfpQ-gZFXVNco",
        refresh_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjc0MzNjOTI5MDI3NTEyOTcwMzA0MzA4IiwiaWQiOiJrbjEyNSIsImFjdGl2ZV9wcm9maWxlX2lkIjoiNjc0MzNjOTI5MDI3NTEyOTcwMzA0MzA5IiwiaWF0IjoxNzMyNzEyMjEyLCJleHAiOjE3MzMzMTcwMTJ9.H28WhNjGmDvY1XYqBKjvOXqRtngxZHvi7FcA-XYn2RQ"
      }
    },
    '/user/signup': {
      // 회원가입한다. default profile을 생성한다.
      POST: {
        message: "User signed in successfully",
      }
    },
    '/user/refresh': {
      // user의 access token 만료 시 refresh token을 이용해 user의 access token을 재발급한다.
      POST: {
        access_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjc0MzNjOTI5MDI3NTEyOTcwMzA0MzA4IiwiaWQiOiJrbjEyNSIsImFjdGl2ZV9wcm9maWxlX2lkIjoiNjc0MzNjOTI5MDI3NTEyOTcwMzA0MzA5IiwiaWF0IjoxNzMyNzEyMjEyLCJleHAiOjE3MzI3MTU4MTJ9.DUxJJWEnSmRn-H7c6Cya3pWg2T1fWwxfpQ-gZFXVNco",
      },
    },
    'user/refresh-token': {
      // user의 refresh token 만료 시 user의 access token과 refresh token을 새로 발급한다.
      access_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjc0MzNjOTI5MDI3NTEyOTcwMzA0MzA4IiwiaWQiOiJrbjEyNSIsImFjdGl2ZV9wcm9maWxlX2lkIjoiNjc0MzNjOTI5MDI3NTEyOTcwMzA0MzA5IiwiaWF0IjoxNzMyNzEyMjEyLCJleHAiOjE3MzI3MTU4MTJ9.DUxJJWEnSmRn-H7c6Cya3pWg2T1fWwxfpQ-gZFXVNco",
      refresh_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjc0MzNjOTI5MDI3NTEyOTcwMzA0MzA4IiwiaWQiOiJrbjEyNSIsImFjdGl2ZV9wcm9maWxlX2lkIjoiNjc0MzNjOTI5MDI3NTEyOTcwMzA0MzA5IiwiaWF0IjoxNzMyNzEyMjEyLCJleHAiOjE3MzMzMTcwMTJ9.H28WhNjGmDvY1XYqBKjvOXqRtngxZHvi7FcA-XYn2RQ"
    },
    '/user/{user_id}/profile': {
      // 기기에 존재하는 프로필들을 모두 불러온다.
      GET: {
        profiles: [
          { profile_id: '67473b04c12b4df30870272a', name: 'John Doe' },
          { profile_id: '67473b04c12b4df30870272a', name: 'Jane Smith' },
        ],
      },
    },
    '/profile': {
      // 새로운 프로필을 생성한다.
      POST: {
        message: "New profile created successfully",
        created_profile: { profile_id: '67473b04c12b4df30870272a', profile_name: 'profile_name' }
      }
    },
    '/profile/{profile_id}': {
      // profile_id에 해당하는 프로필을 삭제한다.
      DELETE: {
        message: "Profile deleted successfully"
      },
      PATCH: {
        message: 'Profile name updated successfully',
        modified_profile: { profile_id: "67473b04c12b4df30870272", "profile_name": 'profile_name',}
      },
      GET: {
        favorites: [
          { restaurant_id: '67473b04c12b4df30870272a', restaurant_name: 'Gourmet Spot' },
        ],
        visited: [
          { restaurant_id: '67473b04c12b4df30870272a', restaurant_name: 'Mosu' },
        ],
      },
    },
    '/profile/switch/{profile_id}': {
      POST: {
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjc0MzNjOTI5MDI3NTEyOTcwMzA0MzA4IiwiaWQiOiJrbjEyNSIsImFjdGl2ZV9wcm9maWxlX2lkIjoiNjc0MzNjOTI5MDI3NTEyOTcwMzA0MzA5IiwiaWF0IjoxNzMyNDU5OTExLCJleHAiOjE3MzI0NjM1MTF9.j31IIV02WPlzmd10KqQ1aWAJxgDBE1_Oszy2RVZ6NHo"
      }
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
      DELETE: { message: 'restaurant successfully deleted from like list' },
    },
    '/profile/{profile_id}/dislike': {
      // Add restaurant to dislike list
      POST: { message: "restaurant successfully added to dislike list" },
      // Remove restaurant from dislike list
      DELETE: { message: 'restaurant successfully deleted from dislike list' },
    },
    '/profile/{profile_id}/visit': {
      // Add restaurant to visited list
      POST: { message: 'restaurant successfully added to visited list' },
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
