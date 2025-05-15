import { Route, Routes, useLocation} from 'react-router-dom'
import { AdditionalNavbar, Navbar, Footer} from '../auth'
import { CheckoutPage, OrderPage, PaymentPage} from '../medifast'
import { PrivateRoutes } from './PrivateRoutes'
import { publicRoutes } from './PublicRoutes'
import UserProfile from '../medifast/pages/UserProfile'
import AdminProfile from '../medifast/pages/AdminProfile'
export const AppRouter = () => {
  const location = useLocation();
  const pagsdeInicioSesion = ['/login','/registro','/forgotpass'];
  const ocultarNavBarFooter = !pagsdeInicioSesion.includes(location.pathname);

  return (
    <>
      {ocultarNavBarFooter && <Navbar />}
      {ocultarNavBarFooter && <AdditionalNavbar />}
      
      <Routes>

        {/* Rutas protegidas del checkout */}
        <Route path="/checkout" element={<PrivateRoutes><CheckoutPage /></PrivateRoutes>} />
        <Route path="/checkout/payment" element={<PrivateRoutes><PaymentPage /></PrivateRoutes>} />
        <Route path="/checkout/order" element={<PrivateRoutes><OrderPage /></PrivateRoutes>} />
        <Route path="/UserProfile" element={<PrivateRoutes><UserProfile /></PrivateRoutes>} />
        <Route path="/AdminProfile" element={<PrivateRoutes><AdminProfile /></PrivateRoutes>} />
        

        {/* Rutas publicas */}
        {publicRoutes}
      </Routes>
      {ocultarNavBarFooter && <Footer />}
    </>
  )
}
