import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  path: '/login',
  data: null,
};

const navigationSlice = createSlice({
  name: 'navigation',
  initialState,
  reducers: {
    navigate: (state, action) => {
      state.path = action.payload.path;
      state.data = action.payload.data; 
    },
  },
});

export const {navigate} = navigationSlice.actions;
export default navigationSlice.reducer;