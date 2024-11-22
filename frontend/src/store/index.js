import {configureStore} from '@reduxjs/toolkit';
import navigatorReducer from './navigator';
import userReducer from './user';

const store = configureStore({
  reducer: {
    navigator: navigatorReducer,
    user: userReducer,
  },
});

export default store;