import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { AppRouter } from './router'

export const MedifastApp = () => {
  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  )
}
