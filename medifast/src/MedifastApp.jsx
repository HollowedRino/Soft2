import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { AppRouter } from './router'
import { UserProvider } from './contexts/UserProvider'
import { CartProvider } from './contexts/CartProvider'
import { ChatbotProvider } from './contexts/ChatbotProvider'

export const MedifastApp = () => {
  return (
    <CartProvider>
      <UserProvider>
        <ChatbotProvider>
          <BrowserRouter>
            <AppRouter />
          </BrowserRouter>
        </ChatbotProvider>
      </UserProvider>
    </CartProvider>
  )
}
