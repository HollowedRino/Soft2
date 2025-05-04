import { Route } from 'react-router-dom'
import { ForgotPass, LoginPage, RegisterUser } from '../auth'
import { AttendancePage, CategoryPage, ContactUsPage, MapPage, MedifastPage, MyCartPage } from '../medifast'

export const publicRoutes = [
  <Route key="mycart" path="/mycart" element={<MyCartPage />} />,
  <Route key="login" path="/login" element={<LoginPage />} />,
  <Route key="registro" path="/registro" element={<RegisterUser />} />,
  <Route key="forgotpass" path="/forgotpass" element={<ForgotPass />} />,
  <Route key="map" path="/map" element={<MapPage />} />,
  <Route key="medical" path="/medical-assistance" element={<AttendancePage />} />,
  <Route key="category" path="/category/:categoryName" element={<CategoryPage />} />,
  <Route key="home" path="/*" element={<MedifastPage />} />,
  <Route key="contactUs" path="/contactUs*" element={<ContactUsPage />} />,
]
