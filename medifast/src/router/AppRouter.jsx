import { Route, Routes } from 'react-router-dom'
import { AdditionalNavbar, Navbar} from '../auth'
import { CheckoutPage, OrderPage, PaymentPage} from '../medifast'
import { PrivateRoutes } from './PrivateRoutes'
import { publicRoutes } from './PublicRoutes'

export const AppRouter = () => {

  return (
    <>
      <Navbar />
      <AdditionalNavbar />
      <Routes>

        {/* Rutas protegidas del checkout */}
        <Route path="/checkout" element={<PrivateRoutes><CheckoutPage /></PrivateRoutes>} />
        <Route path="/checkout/payment" element={<PrivateRoutes><PaymentPage /></PrivateRoutes>} />
        <Route path="/checkout/order" element={<PrivateRoutes><OrderPage /></PrivateRoutes>} />

        {/* Rutas publicas */}
        {publicRoutes}
      </Routes>
    </>
  )
}
