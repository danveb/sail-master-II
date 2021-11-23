import React from 'react'
import { render } from '@testing-library/react'
import ClubList from '../components/ClubList'
// smoke test 
it('renders without crashing', () => {
    render(<ClubList />) 
})

// snapshot test
it('matches snapshot', () => {
    const { asFragment } = render(<ClubList />)
    expect(asFragment()).toMatchSnapshot()
})