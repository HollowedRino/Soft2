import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { MedifastPage } from '../medifast'
import { LoginPage } from '../auth'
import { Navbar } from '../auth/components/Navbar'

export const AppRouter = () => {

  const authStatus = 'not-authenticated' //not-authenticated 

  return (
    <>
    <Navbar/>
    <Routes>
        {
          (authStatus === 'not-authenticated')
          ? <Route path='/auth/*' element={<LoginPage />} />
          : <Route path='/*' element={<MedifastPage />} />
        }
        <Route path='/*' element={<Navigate to='/auth/login' />} />
    </Routes>

    </>
  )
}
