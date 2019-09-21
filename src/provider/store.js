import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from 'redux-persist'
import { AsyncStorage } from 'react-native'
import rootReducer from "../reducers"

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
}
const persistedReducer = persistReducer(persistConfig, rootReducer);

const initialState = {};
const middleware = [thunk];
const store = createStore(
    persistedReducer,
    initialState,
    compose(applyMiddleware(...middleware))
);
let persistor = persistStore(store);

export default () => {
    return { store, persistor }
};