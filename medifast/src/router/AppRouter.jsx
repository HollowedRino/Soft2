import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { MedifastPage } from '../medifast'
import { LoginPage } from '../auth'

export const AppRouter = () => {

  const authStatus = 'authenticated' //not-authenticated 

  return (
    <Routes>
        {
          (authStatus === 'not-authenticated')
          ? <Route path='/auth/*' element={<LoginPage />} />
          : <Route path='/*' element={<MedifastPage />} />
        }
        <Route path='/*' element={<Navigate to='/auth/login' />} />
    </Routes>
  )
}
