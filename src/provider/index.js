import React from 'react'
import { Provider } from 'react-redux'

import store from './store'
import Scenes from '../scenes'

export default function withProvider() {
	return (
		<Provider store={store}>
			<Scenes />
		</Provider>
	)
}
