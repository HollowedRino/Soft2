import { Route, Routes} from 'react-router-dom'
import { AdminProfile, CheckoutPage, OrderPage, PaymentPage } from '../medifast'
import { PrivateRoutes } from './PrivateRoutes'
import { publicRoutes } from './PublicRoutes'
import { Layout } from '../layout/Layout'
import UserProfile from '../medifast/Pages/UserProfile' 
export const AppRouter = () => {


  return (
      <Routes>

        <Route path="/" element={<Layout />}>
          {/* Rutas protegidas del checkout */}
          <Route path="/checkout" element={<PrivateRoutes><CheckoutPage /></PrivateRoutes>} />
          <Route path="/checkout/payment" element={<PrivateRoutes><PaymentPage /></PrivateRoutes>} />
          <Route path="/checkout/order" element={<PrivateRoutes><OrderPage /></PrivateRoutes>} />
          <Route path="/userProfile" element={<PrivateRoutes>< UserProfile/></PrivateRoutes>} />
          <Route path="/adminProfile" element={<PrivateRoutes><AdminProfile/></PrivateRoutes>} />
          {/* Rutas publicas */}
          
          {publicRoutes}
        </Route>
      </Routes>
  )
}
