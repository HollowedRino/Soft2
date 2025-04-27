import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { MedifastPage } from '../medifast'
import { LoginPage } from '../auth'
import { Navbar } from '../auth/components/Navbar'
import { AdditionalNavbar } from '../auth/components/AdditionalNavbar'

export const AppRouter = () => {

  const authStatus = 'not-authenticated' //not-authenticated 

  return (
    <>
      <Navbar />
      <AdditionalNavbar/>
      <Routes>
        {/* Si no estas autenticado no deberias poder ver tu carrito ni tu perfil xd */}
          {/* {
            (authStatus === 'not-authenticated')
            ? <Route path='/auth/*' element={<MyAccountPage />} />
            : <Route path='/*' element={<LoginPage />} />
          } */}
          <Route path='/login/' element={<LoginPage />} />
          <Route path='/' element={<MedifastPage />} />
          <Route path='/medicinas' element={<LoginPage />} />

      </Routes>
    </>
  )
}
