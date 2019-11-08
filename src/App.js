import React from 'react'
import { connect } from 'react-redux'
import { pipe } from 'ramda'

import { setState, set, get } from './flat-redux'
import logo from './logo.svg'
import './App.css'

function App({ val, setState }) {
	return (
		<div className='App'>
			<header className='App-header'>
				<img src={logo} className='App-logo' alt='logo' />
				<input
					type='text'
					value={val}
					onChange={pipe(
						get('target.value'),
						set('val'),
						setState
					)}
				/>
				<p>
					Edit <code>src/App.js</code> and save to reload.
				</p>
			</header>
		</div>
	)
}

const stateToProps = state => ({
	val: state.val || ''
})
const dispatchToProps = dispatch => ({
	setState: (...args) => dispatch(setState(...args))
})

export default connect(
	stateToProps,
	dispatchToProps
)(App)
