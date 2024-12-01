import { createSlice } from '@reduxjs/toolkit';

const mapper = {
  login: 0,
  select: 1,
  main: 2,
  profile: 3,
  info: 4,
  dashboard: 5,
}

const initialState = {
  panelName: 'profile',
  panelData: null,
};

const navigatorSlice = createSlice({
  name: 'navigator',
  initialState,
  reducers: {
    navigate: (state, action) => {
      const { panelName, panelData } = action.payload;
      state.panelName = panelName;
      state.panelData = panelData || null;
    },
  },
});

export const { navigate } = navigatorSlice.actions;
export const selectPanelName = (state) => state.navigator.panelName;
export const selectPanelData = (state) => state.navigator.panelData;
export const panelIndex = (state) => mapper[state.navigator.panelName];

export default navigatorSlice.reducer;