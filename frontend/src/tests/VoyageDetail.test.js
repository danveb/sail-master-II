import React from 'react'
import { render } from '@testing-library/react'
import VoyageDetail from '../components/VoyageDetail'
// smoke test 
it('renders without crashing', () => {
    render(<VoyageDetail />) 
})

// snapshot test
it('matches snapshot', () => {
    const { asFragment } = render(<VoyageDetail />)
    expect(asFragment()).toMatchSnapshot()
})