import React from 'react'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'

import NavLinks from './NavLinks'
import { AuthContext } from '../../context/auth-context'

describe('Navigation Links', () => {
  it('Should show only certain buttons when not authorized', () => {
    render(
      <BrowserRouter>
        <NavLinks />
      </BrowserRouter>
    )

    expect(screen.getByRole('list')).toHaveClass('nav-links')
    expect(screen.getByText('ALL USERS')).toBeInTheDocument()
    expect(screen.getByText('ALL USERS')).toHaveAttribute('href', '/')

    expect(screen.getByText('AUTHENTICATE')).toBeInTheDocument()
    expect(screen.getByText('AUTHENTICATE')).toHaveAttribute('href', '/auth')
    expect(screen.queryByText('MY PLAN')).toBeNull()
  })

  it('Should show only certain buttons when authorized', () => {
    render(
      <AuthContext.Provider
        value={{ 
          isLoggedIn: true, 
          token: '1234567890-0987654321', 
          userId: 'user1', 
          login: () => {}, 
          logout: () => {}
        }}
      >
        <BrowserRouter>
          <NavLinks />
        </BrowserRouter>
      </AuthContext.Provider>
    )

    expect(screen.getByRole('list')).toHaveClass('nav-links')
    expect(screen.getByText('ALL USERS')).toBeInTheDocument()
    expect(screen.getByText('ALL USERS')).toHaveAttribute('href', '/')
    

    expect(screen.queryByText('AUTHENTICATE')).toBeNull()

    expect(screen.getByText('MY PLANS')).toBeInTheDocument()
    expect(screen.getByText('MY PLANS')).toHaveAttribute('href', '/user1/plans')

    expect(screen.getByText('ADD PLAN')).toBeInTheDocument()
    expect(screen.getByText('ADD PLAN')).toHaveAttribute('href', '/plans/new')

    expect(screen.getByRole('button', { name: 'LOGOUT' })).toBeInTheDocument()
  })
})