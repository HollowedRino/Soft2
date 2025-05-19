import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { AppRouter } from './router'
import { UserProvider } from './contexts/UserProvider'
import { CartProvider } from './contexts/CartProvider'

export const MedifastApp = () => {
  return (
    <CartProvider>
      <UserProvider>
        <BrowserRouter>
          <AppRouter />
        </BrowserRouter>
      </UserProvider>
    </CartProvider>
  )
}
