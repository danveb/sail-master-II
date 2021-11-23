import React from 'react'
import { render } from '@testing-library/react'
import Home from '../components/Home' 

// smoke test 
it('renders without crashing', () => {
    render(<Home />) 
})

// snapshot test
it('matches snapshot', () => {
    const { asFragment } = render(<Home />)
    expect(asFragment()).toMatchSnapshot()
})