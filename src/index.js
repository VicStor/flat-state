import { createStore as reduxCreateStore } from 'redux'
export { set, get } from './utils'

export const setState = setFn => ({
	type: '@@FLAT_REDUX_ACTION',
	setFn
})

export const createStore = (...args) => {
	const reducer = (state = {}, action) =>
		action.type === '@@FLAT_REDUX_ACTION' ? action.setFn(state) : state

	return reduxCreateStore(reducer, ...args)
}
