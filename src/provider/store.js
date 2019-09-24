import { createStore, applyMiddleware, compose } from "redux";
import { AsyncStorage } from "react-native";
// external redux library
import { persistStore, persistReducer } from "redux-persist";
import thunk from "redux-thunk";
// import combined reducers
import rootReducer from "../reducers";

// initial blank state
const initialState = {};
// persistent redux config
const persistConfig = {
  key: "root",
  storage: AsyncStorage
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
// import and apply middleware
const middleware = [thunk];
// setup redux store
const store = createStore(
  persistedReducer,
  initialState,
  compose(applyMiddleware(...middleware))
);
// apply persistence
let persistor = persistStore(store);

export default () => {
  return { store, persistor };
};
