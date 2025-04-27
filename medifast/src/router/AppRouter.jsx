import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { MedifastPage } from '../medifast'
import { LoginPage } from '../auth'
import { Navbar } from '../medifast/components/Navbar'

export const AppRouter = () => {

  const authStatus = 'not-authenticated' //not-authenticated 

  return (
    <>
      <Navbar/>
      <Routes>
        {/* Si no estas autenticado no deberias poder ver tu carrito ni tu perfil xd */}
          {/* {
            (authStatus === 'not-authenticated')
            ? <Route path='/auth/*' element={<MyAccountPage />} />
            : <Route path='/*' element={<LoginPage />} />
          } */}
          <Route path='/login/*' element={<LoginPage />} />
          <Route path='/*' element={<MedifastPage />} />
      </Routes>
    </>
  )
}
