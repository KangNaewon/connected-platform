import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  id: '',               //user id
  profile_id: '',       //current profile id
  cookie: '',           //cookie
  profiles: [],         //profiles
  recommendations: [],  //recommended videos
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.id = action.payload.id;
      state.cookie = action.payload.cookie;
      state.profiles = action.payload.profiles;
    },
    setProfile: (state, action) => {
      state.profile_id = action.payload.profile_id;
    },
    setRecommendations: (state, action) => {
      state.recommendations = action.payload.recommendations;
    },
    resetUser: () => initialState,
  },
});

// Export actions and reducer
export const {setUser, resetUser, setProfile, setRecommendations} = userSlice.actions;
export default userSlice.reducer;
