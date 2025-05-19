import { Route, Routes, useLocation} from 'react-router-dom'
import { AdditionalNavbar, Navbar, Footer} from '../auth'
import { CheckoutPage, OrderPage, PaymentPage} from '../medifast'
import { PrivateRoutes } from './PrivateRoutes'
import { publicRoutes } from './PublicRoutes'
import UserProfile from '../medifast/pages/UserProfile'
import AdminProfile from '../medifast/pages/AdminProfile'
import { Layout } from '../layout/Layout'

export const AppRouter = () => {


  return (
      <Routes>

        <Route path="/" element={<Layout />}>
          {/* Rutas protegidas del checkout */}
          <Route path="/checkout" element={<PrivateRoutes><CheckoutPage /></PrivateRoutes>} />
          <Route path="/checkout/payment" element={<PrivateRoutes><PaymentPage /></PrivateRoutes>} />
          <Route path="/checkout/order" element={<PrivateRoutes><OrderPage /></PrivateRoutes>} />
          <Route path="/UserProfile" element={<PrivateRoutes><UserProfile /></PrivateRoutes>} />
          <Route path="/AdminProfile" element={<PrivateRoutes><AdminProfile /></PrivateRoutes>} />
          {/* Rutas publicas */}
          {publicRoutes}
        </Route>
      </Routes>
  )
}
