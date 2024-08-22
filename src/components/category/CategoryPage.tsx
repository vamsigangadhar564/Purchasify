// CategoryPage.tsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Typography } from "@mui/material";
import ProductCard from "../productCard/ProductCard";
import Header from "../header/Header";
import { useParams } from "react-router-dom";
import { getCategory } from "../../reducers";
import "./CategoryPage.css"; // Import the CSS file

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

  const productReducer = useSelector((state: any) => state.productReducer);

  const { category } = useParams<{ category: string }>();

  useEffect(() => {
    setAllProducts(productReducer.products);
  }, [productReducer]);

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
        <Box className='card-container'>
          {allProducts.map((product: Product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </Box>
      </Box>
    </>
  );
};

export default CategoryPage;
