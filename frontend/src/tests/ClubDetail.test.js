import React from 'react'
import { render } from '@testing-library/react'
import ClubDetail from '../components/ClubDetail'
// smoke test 
it('renders without crashing', () => {
    render(<ClubDetail />) 
})

// snapshot test
it('matches snapshot', () => {
    const { asFragment } = render(<ClubDetail />)
    expect(asFragment()).toMatchSnapshot()
})