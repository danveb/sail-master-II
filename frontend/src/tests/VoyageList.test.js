import React from 'react'
import { render } from '@testing-library/react'
import VoyageList from '../components/VoyageList'

// smoke test 
it('renders without crashing', () => {
    render(<VoyageList />) 
})

// snapshot test
it('matches snapshot', () => {
    const { asFragment } = render(<VoyageList />)
    expect(asFragment()).toMatchSnapshot()
})