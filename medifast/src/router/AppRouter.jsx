import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { MedifastPage } from '../medifast'
import { AdditionalNavbar, ForgotPass, LoginPage, Navbar, RegisterUser } from '../auth'
import { MyCartPage } from '../medifast/Pages/MyCartPage'

export const AppRouter = () => {

  const authStatus = 'not-authenticated' //not-authenticated 

  return (
    <>
      <Navbar />
      <AdditionalNavbar />
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
          <Route path='/mycart' element={<MyCartPage/>} />
          
      </Routes>
    </>
  )
}
