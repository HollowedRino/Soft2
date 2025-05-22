import { Route } from 'react-router-dom'
import { ForgotPass, LoginPage, RegisterUser } from '../auth'
import { AttendancePage, CategoryPage, ContactUsPage, FilterPage, MapPage, MedifastPage, MyCartPage, ProductPage } from '../medifast'

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
  <Route key="meds" path="/medicamentos/:filtro" element={<FilterPage />} />
]
