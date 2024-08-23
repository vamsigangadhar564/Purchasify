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
import { Box, CircularProgress } from "@mui/material";
import { RootState } from "../../redux/store";
import CategoryChip from "./CategoryChip";
import ProductCard from "../productCard/ProductCard";
import "./HomePage.css"; // Import the CSS file

interface UserDetails {
  iat: number;
  sub: number;
  user: string;
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
  const [loader, setLoader] = useState<boolean>(false);

  const { isLoginSuccess } = useSelector(
    (state: RootState) => state.loginReducer
  );
  const productReducer = useSelector(
    (state: RootState) => state.productReducer
  );
  const categoryReducer = useSelector(
    (state: RootState) => state.categoryReducer
  );
  const loaderReducer = useSelector((state: any) => state.loaderReducer);

  useEffect(() => {
    setAllProducts(productReducer.products);
  }, [productReducer]);

  useEffect(() => {
    setLoader(loaderReducer.loaderStatus);
  }, [loaderReducer]);

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
  }, [dispatch]);

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

      {loader ? ( // Show loader based on loader state
        <Box className='loader-container-home'>
          <CircularProgress color='inherit' />
        </Box>
      ) : (
        <Box className='product-container'>
          <CategoryChip categories={allCategories} />
          <Box className='card-container'>
            {allProducts.map((product: Product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </Box>
        </Box>
      )}
    </>
  );
};

export default HomePage;
