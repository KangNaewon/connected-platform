import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  id: '',
  password: '',
  profile: '',
  videos: {},
  restaurants: [],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.id = action.payload.id;
      state.password = action.payload.password;
    },
    setProfile: (state, action) => {
      state.profile = action.payload.profile;
      state.videos = action.payload.videos;
      state.restaurants = action.payload.restaurants;
    },
    resetUser: () => initialState,
  },
});

// Export actions and reducer
export const {setUser, resetUser, setProfile} = userSlice.actions;
export default userSlice.reducer;
