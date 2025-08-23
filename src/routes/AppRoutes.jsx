import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import Home from "../pages/Home/Home";
const Shop = lazy(() => import("../pages/Shop/Shop"));
const Cart = lazy(() => import("../pages/Cart/Cart"));
const ProductDetails = lazy(() => import("../pages/Product/ProductDetails"));
const Checkout = lazy(() => import("../pages/Checkout/Checkout"));
const NotFound = lazy(() => import("../pages/NotFound/NotFound"));
const ProtectedRoute = lazy(() => import("./ProtectedRoute"));
const Login = lazy(() => import("../pages/Auth/Login"));
const Register = lazy(() => import("../pages/Auth/Register"));

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route
          path="/shop"
          element={
            <Suspense
              fallback={
                <div className="p-10 text-center text-lg font-semibold py-16">
                  Loading...
                </div>
              }
            >
              <Shop />
            </Suspense>
          }
        />
        <Route
          path="/cart"
          element={
            <Suspense
              fallback={
                <div className="p-10 text-center text-lg font-semibold py-16">
                  Loading...
                </div>
              }
            >
              <Cart />
            </Suspense>
          }
        />
        <Route
          path="/login"
          element={
            <Suspense
              fallback={
                <div className="p-10 text-center text-lg font-semibold py-16">
                  Loading...
                </div>
              }
            >
              <Login />
            </Suspense>
          }
        />
        <Route
          path="/register"
          element={
            <Suspense
              fallback={
                <div className="p-10 text-center text-lg font-semibold py-16">
                  Loading...
                </div>
              }
            >
              <Register />
            </Suspense>
          }
        />
        <Route
          path="/product/:id"
          element={
            <Suspense
              fallback={
                <div className="p-10 text-center text-lg font-semibold py-16">
                  Loading...
                </div>
              }
            >
              <ProductDetails />
            </Suspense>
          }
        />
        <Route
          path="/checkout"
          element={
            <Suspense
              fallback={
                <div className="p-10 text-center text-lg font-semibold py-16">
                  Loading...
                </div>
              }
            >
              <ProtectedRoute>
                <Checkout />
              </ProtectedRoute>
            </Suspense>
          }
        />
        <Route
          path="*"
          element={
            <Suspense fallback={<div v>Loading...</div>}>
              <NotFound />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
