import { Route } from 'react-router-dom'
import { ForgotPass, LoginPage, RegisterUser } from '../auth'
import { AttendancePage, CategoryPage, ContactUsPage, FilterPage, MapPage, MedifastPage, MyCartPage, ProductPage } from '../medifast'
import { AdminProfile, CheckoutPage, OrderPage, PaymentPage } from '../medifast'
import UserProfile from '../medifast/Pages/UserProfile'
import { ChatTest } from '../medifast/Pages/ChatTest'

export const publicRoutes = [
  <Route key="mycart" path="/mycart" element={<MyCartPage />} />,
  <Route key="login" path="/login" element={<LoginPage />} />,
  <Route key="register" path="/registro" element={<RegisterUser />} />,
  <Route key="forgotpass" path="/forgotpass" element={<ForgotPass />} />,
  <Route key="map" path="/map" element={<MapPage />} />,
  <Route key="medical" path="/medical-assistance" element={<AttendancePage />} />,
  <Route key="category" path="/category/:categoryName" element={<CategoryPage />} />,
  <Route key="home" path="/" element={<MedifastPage />} />,
  <Route key="auxiliar" path="/*" element={<MedifastPage />} />,
  <Route key="contactUs" path="/contactUs" element={<ContactUsPage />} />,
  <Route key="product" path="/product/:id" element={<ProductPage />} />,
  <Route key="filtro" path="/medicamentos/:filtro" element={<FilterPage />} />,
  <Route key="chat" path="/chat" element={<ChatTest />} />,
  
  
]

{/* <Route key="checkout" path="/checkout" element={<CheckoutPage />} />,
<Route key="payment" path="/checkout/payment" element={<PaymentPage />} />,
<Route key="order" path="/checkout/order" element={<OrderPage />} />,
<Route key="user" path="/userProfile" element={< UserProfile/>} />,
<Route key="admin" path="/adminProfile" element={<AdminProfile/>} />, */}