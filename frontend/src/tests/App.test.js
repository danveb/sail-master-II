import React from 'react'
import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import App from '../App'

// specialized test 
test('/ route', () => {
    const { getByText } = render((
        <MemoryRouter initialEntries={['/']}>
            <App />
        </MemoryRouter>
    ));
    expect(getByText('Welcome to Sail Master II')).toBeInTheDocument()
})

test('/clubs route', () => {
    const { getByText } = render((
        <MemoryRouter initialEntries={['/clubs']}>
            <App />
        </MemoryRouter>
    ));
    expect(getByText('Sailing Clubs')).toBeInTheDocument() 
})

test('/voyage route', () => {
    const { getByText } = render((
        <MemoryRouter initialEntries={['/voyage']}>
            <App />
        </MemoryRouter>
    ));
    expect(getByText('Voyage List')).toBeInTheDocument() 
})