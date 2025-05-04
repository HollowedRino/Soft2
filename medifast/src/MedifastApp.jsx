import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { AppRouter } from './router'
import { UserProvider } from './contexts/UserContext'
import { CartProvider } from './contexts/CartContext'

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
