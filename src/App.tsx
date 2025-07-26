import { BrowserRouter, Route, Routes } from "react-router"
import ProductsApp from "@/components/ProductsApp.tsx";
import HomePage from "@/pages/HomePage.tsx";
import LoginPage from "@/pages/LoginPage.tsx";
import NotFoundPage from "@/pages/NotFoundPage.tsx";
import RegisterPage from "@/pages/RegisterPage.tsx";
import ProductsPage from "@/pages/ProductsPage.tsx";
import RegistrationSuccess from "@/pages/RegistrationSuccess.tsx";
import {useEffect} from "react";

function App() {

  useEffect(() => {
    document.title = "Products App";
  }, [])

  return (
    <>
        <BrowserRouter>
          <Routes>
            <Route element={<ProductsApp/>}>
              <Route index element={<HomePage/>} />

              <Route path="login" element={<LoginPage/>}/>
              <Route path="register" element={<RegisterPage/>}/>
              <Route path="register-success" element={<RegistrationSuccess/>}/>


              <Route path="products" element={<ProductsPage/>}/>


              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </BrowserRouter>

    </>
  )
}

export default App
