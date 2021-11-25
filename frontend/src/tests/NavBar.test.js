import React from 'react'
import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom' 
import NavBar from '../components/NavBar'

// smoke test 
it('renders without crashing', () => {
    render(<MemoryRouter><NavBar /></MemoryRouter>) 
})