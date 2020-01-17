import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import { add } from 'ramda'
import { useData } from '../hook'

const TestComponent = () => {
  const [data, setData] = useData({ a: 1 })
  return (
    <div>
      <div data-testid='state-value'>{data.a}</div>
      <button data-testid='inc-button' onClick={_ => setData('a', add(1))}>
        Increment
      </button>
    </div>
  )
}

test('set function', () => {
  const { getByTestId } = render(<TestComponent />)
  const incButton = getByTestId('inc-button')
  fireEvent.click(incButton)
  const element = getByTestId('state-value')
  expect(element).toHaveTextContent('2')
})
