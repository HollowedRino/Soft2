import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { MedifastPage } from '../medifast'
import { LoginPage } from '../auth'
import { Navbar } from '../auth/components/Navbar'
import { RegisterUser } from '../auth/pages/RegisterUser'
import { ForgotPass } from '../auth/pages/ForgotPass'

export const AppRouter = () => {

  const authStatus = 'not-authenticated' //not-authenticated 

  return (
    <>
      <Navbar />
      <Routes>
        {/* Si no estas autenticado no deberias poder ver tu carrito ni tu perfil xd */}
          {/* {
            (authStatus === 'not-authenticated')
            ? <Route path='/auth/*' element={<MyAccountPage />} />
            : <Route path='/*' element={<LoginPage />} />
          } */}
          <Route path='/login/' element={<LoginPage />} />
          <Route path='/*' element={<MedifastPage />} />
          <Route path='/registro/' element={<RegisterUser/>} />
          <Route path='/forgotpass/' element={<ForgotPass/>} />
          
      </Routes>
    </>
  )
}
