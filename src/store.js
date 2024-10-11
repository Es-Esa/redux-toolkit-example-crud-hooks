// store/store.js
import { configureStore } from '@reduxjs/toolkit';
import tutorialReducer from './slices/tutorials'; 
import commentsReducer from './slices/comments'; // lisää comments reducer storeen


// tämä muuttuja sisältää kaikki reducerit ja niiden nimet
const reducer = {
  tutorials: tutorialReducer,
  comments: commentsReducer, // lisää comments reducer storeen
};

const store = configureStore({
  reducer: reducer,
  devTools: true,
});

// debugataan storea
store.subscribe(() => {
  console.log('Current State:', store.getState());
});

// debugataan dispatchia
const originalDispatch = store.dispatch;
store.dispatch = (action) => {
  if (typeof action === 'function') {
    console.log('Dispatching Thunk Action');
  } else {
    console.log('debug dispach:', action); // debugausta
  }
  return originalDispatch(action);
};

export default store;
