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
import PersistLogin from "@/components/routes/PersistLogin";
import AboutPage from "@/pages/AboutPage";
import CartPage from "@/pages/CartPage";
import CheckoutPage from "@/pages/CheckoutPage";
import PricingPage from "@/pages/PricingPage";
import SignupPage from "@/pages/Auth/SignupPage";
import PageNotFound from "@/pages/PageNotFound";
import ProtectedRoutes from "@/components/routes/ProtectedRoutes";
import ErrorElement from "@/components/ErrorElement";
import WishlistPage from "@/pages/WishlistPage";
import OrdersPage from "@/pages/OrdersPage";
import TrackOrderPage from "@/pages/TrackOrderPage";
import PaymentSuccessPage from "@/pages/PaymentSuccessPage";
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route errorElement={<ErrorElement />}>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="products/:id" element={<ProductDetails />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/cart" element={<CartPage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/payment-confirm" element={<PaymentSuccessPage />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/orders/:orderId" element={<TrackOrderPage />} />
        </Route>
        <Route path="/pricing" element={<PricingPage />} />
      </Route>
      <Route element={<PersistLogin />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<SignupPage />} />
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Route>
  )
);
export default router;
