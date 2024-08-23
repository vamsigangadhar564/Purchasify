import React from "react";
import LoginPage from "../components/loginPage/LoginPage";
import HomePage from "../components/home/HomePage";
import CategoryPage from "../components/category/CategoryPage";
import ProductDetailsPage from "../components/productDetail/ProductDetailPage";
import CartPage from "../components/cart/CartPage";
import SuccessPage from "../components/success/SuccessPage";

// Define the Route interface
export interface RouteInterface {
  path: string;
  component: React.ReactNode; // React component or element
  exact?: boolean;
  isProtected?: boolean;
}

// Define the routes
const allRoutes: RouteInterface[] = [
  {
    path: "/login",
    component: <LoginPage />,
    exact: true,
  },
  {
    path: "/home",
    component: <HomePage />,
    exact: true,
    isProtected: true,
  },
  {
    path: "/categories/:category",
    component: <CategoryPage />,
    exact: true,
    isProtected: true,
  },
  {
    path: "/product/:productId",
    component: <ProductDetailsPage />,
    exact: true,
    isProtected: true,
  },
  {
    path: "/cart",
    component: <CartPage />,
    exact: true,
    isProtected: true,
  },
  {
    path: "/success",
    component: <SuccessPage />,
    exact: true,
    isProtected: true,
  },
  {
    path: "/",
    component: <HomePage />,
    exact: true,
    isProtected: true,
  },
];

export default allRoutes;
