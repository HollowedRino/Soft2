import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { AppRouter } from './router'
import { UserProvider } from './contexts/UserContext'

export const MedifastApp = () => {
  return (
    <UserProvider>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </UserProvider>
  )
}
