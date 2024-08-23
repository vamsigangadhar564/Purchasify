import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Typography, CircularProgress } from "@mui/material";
import ProductCard from "../productCard/ProductCard";
import Header from "../header/Header";
import { useParams } from "react-router-dom";
import { getCategory } from "../../reducers";
import "./CategoryPage.css";

interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
}

const CategoryPage: React.FC = () => {
  const dispatch = useDispatch();
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loader, setLoader] = useState<boolean>(false);

  const productReducer = useSelector((state: any) => state.productReducer);
  const loaderReducer = useSelector((state: any) => state.loaderReducer);

  const { category } = useParams<{ category: string }>();

  useEffect(() => {
    setAllProducts(productReducer.products);
  }, [productReducer]);

  useEffect(() => {
    setLoader(loaderReducer.loaderStatus);
  }, [loaderReducer]);

  useEffect(() => {
    if (category) {
      dispatch(getCategory({ categoryType: category }));
    }
  }, [category, dispatch]);

  return (
    <>
      <Header />
      <Box m={4}>
        <Typography variant='h4' className='category-title'>
          {decodeURIComponent(category || "")}
        </Typography>

        {loader ? ( // Show loader based on loader state
          <Box className='loader-container-category'>
            <CircularProgress color='inherit' />
          </Box>
        ) : (
          <Box className='card-container'>
            {allProducts.map((product: Product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </Box>
        )}
      </Box>
    </>
  );
};

export default CategoryPage;
