import React from 'react'
import { Provider } from 'react-redux'

import store from './store'
import Test from '../scenes/Test'

export default function withProvider() {
	return (
		<Provider store={store}>
			<Test />
		</Provider>
	)
}
