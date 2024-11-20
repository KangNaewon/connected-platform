import {configureStore} from '@reduxjs/toolkit';
import navigationReducer from './navigation';
import userReducer from './user';

const store = configureStore({
  reducer: {
    navigation: navigationReducer,
    user: userReducer,
  },
});

export default store;