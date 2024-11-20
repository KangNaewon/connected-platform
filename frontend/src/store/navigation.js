import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  path: '/login',
};

const navigationSlice = createSlice({
  name: 'navigation',
  initialState,
  reducers: {
    navigate: (state, action) => {
      state.path = action.payload; 
    },
  },
});

export const {navigate} = navigationSlice.actions;
export default navigationSlice.reducer;