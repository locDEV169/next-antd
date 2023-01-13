import { combineReducers } from '@reduxjs/toolkit';

import hello from './hello/slide';

const createRootReducer = () => {
  return combineReducers({
    hello,
  });
};

export default createRootReducer;
