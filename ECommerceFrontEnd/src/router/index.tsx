import AppLayout from "@/layout";
import HomePage from "@/pages";
import LoginPage from "@/pages/Auth/LoginPage";
import ProductsPage from "@/pages/ProductsPage";
import ProductDetails from "@/pages/ProductDetails";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import PersistLogin from "@/components/auth/PersistLogin";
import AboutPage from "@/pages/AboutPage";
import CartPage from "@/pages/CartPage";
import CheckoutPage from "@/pages/CheckoutPage";
import PricingPage from "@/pages/PricingPage";
import SignupPage from "@/pages/Auth/SignupPage";
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="products/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route element={<PersistLogin />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<SignupPage />} />
        </Route>
      </Route>
    </>
  )
);
export default router;
