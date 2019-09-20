import { createStore, applyMiddleware, compose } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import { AsyncStorage } from "react-native";
import rootReducer from "../reducers";
// thunk
import thunk from "redux-thunk";
// sagas
import createSagaMiddleware from "redux-saga";
import rootSaga from "../sagas";

const initialState = {};
// make redux store persistent
const persistConfig = {
  key: "root",
  storage: AsyncStorage
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
// make saga middleware
const sagaMiddleware = createSagaMiddleware();
// combine middleware
const middleware = [thunk, sagaMiddleware];
// store config
const store = createStore(
  persistedReducer,
  initialState,
  compose(applyMiddleware(...middleware))
);
let persistor = persistStore(store);
// saga config
sagaMiddleware.run(rootSaga);

export default () => {
  return { store, persistor };
};
