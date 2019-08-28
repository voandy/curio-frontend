import React from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import configureStore from './store'
import Scenes from '../scenes'

const {store, persistor} = configureStore();

export default function withProvider() {
	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<Scenes />
			</PersistGate>
		</Provider>
	)
}
