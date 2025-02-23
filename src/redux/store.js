// import { configureStore } from '@reduxjs/toolkit';
// import authReducer from './features/authSlice';
// import reviewReducer from './features/reviewSlice';

// export const store = configureStore({
//   reducer: {
//     auth: authReducer,
//     reviews: reviewReducer,
//   },
// });

import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";
// import authReducer from "./features/authSlice";
import reviewReducer from "./features/reviewSlice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"],
};

const rootReducer = combineReducers({
  // auth: authReducer,
  reviews: reviewReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
