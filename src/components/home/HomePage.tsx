import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllCategories,
  getAllProducts,
  getUserDetails,
  setLoginStatus,
} from "../../reducers";
import jwtDecode from "jwt-decode";
import Header from "../header/Header";
// import ProductCard from "../ProductCard";
import { Box } from "@mui/material";
import { RootState } from "../../redux/store";
import CategoryChip from "./CategoryChip";
import ProductCard from "../productCard/ProductCard";

interface UserDetails {
  iat: Number;
  sub: number;
  user: String;
}

export interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
}

type Category = Product; // Reuse the Product interface for Category

const HomePage: React.FC = () => {
  const dispatch = useDispatch();
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [allCategories, setAllCategories] = useState<string[]>([]);

  const { isLoginSuccess } = useSelector(
    (state: RootState) => state.loginReducer
  );
  const productReducer = useSelector(
    (state: RootState) => state.productReducer
  );
  const categoryReducer = useSelector(
    (state: RootState) => state.categoryReducer
  );

  useEffect(() => {
    setAllProducts(productReducer.products);
  }, [productReducer]);

  useEffect(() => {
    if (categoryReducer?.categories)
      setAllCategories([...categoryReducer?.categories]);
  }, [categoryReducer]);

  useEffect(() => {
    const token = localStorage.getItem("app_token");
    if (token) {
      dispatch(setLoginStatus(false));
      setUserDetails(jwtDecode(token));
    } else {
      setUserDetails(null);
    }
  }, []);

  useEffect(() => {
    if (userDetails?.sub) {
      dispatch(getUserDetails({ id: userDetails?.sub }));
      dispatch(getAllProducts());
      dispatch(getAllCategories());
    }
  }, [userDetails, dispatch]);

  return (
    <>
      <Header />
      <Box m={4}>
        <CategoryChip categories={allCategories} />
        <Box
          display='flex'
          flexWrap='wrap'
          gap='16px' // Space between cards
        >
          {allProducts.map((product: Product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </Box>
      </Box>
    </>
  );
};

export default HomePage;
