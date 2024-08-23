// ProductDetailsPage.tsx
import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Button,
  Box,
  Grid,
  Rating,
  IconButton,
  CircularProgress,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Header from "../header/Header";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, getProduct, removeFromCart } from "../../reducers";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import "./ProductDetailPage.css";
import { Product } from "../home/HomePage";

interface ProductDetails {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
  rating?: {
    rate: number;
    count: number;
  };
}

interface cart extends Product {
  count: number;
}

const ProductDetailsPage: React.FC = () => {
  const theme = useTheme();
  const { productId } = useParams<{ productId: string }>();
  const dispatch = useDispatch();
  const [cartItems, setCartItems] = useState<cart[]>([]);
  const [product, setProduct] = useState<ProductDetails>({} as ProductDetails);
  const [count, setCount] = useState(0);
  const [loader, setLoader] = useState<boolean>(false);

  const cartReducer = useSelector((state: any) => state.cartReducer);

  const loaderReducer = useSelector((state: any) => state.loaderReducer);

  useEffect(() => {
    const item: any = cartItems.find((item) => item.id === product.id);
    setCount(item ? item.count : 0);
  }, [cartItems, product]);

  useEffect(() => {
    setLoader(loaderReducer.loaderStatus);
  }, [loaderReducer]);

  useEffect(() => {
    setCartItems([...cartReducer.cartItems]);
  }, [cartReducer]);

  const productReducer = useSelector((state: any) => state.productReducer);

  useEffect(() => {
    setProduct(productReducer.productDetails);
  }, [productReducer]);

  useEffect(() => {
    if (productId) {
      dispatch(getProduct({ productId }));
    }
  }, [productId]);

  const handleIncrease = () => {
    dispatch(
      addToCart({
        cartList: cartItems,
        product,
        totalCount: cartReducer.totalItems,
      })
    );
  };

  const handleDecrease = () => {
    dispatch(
      removeFromCart({
        cartList: cartItems,
        product,
        totalCount: cartReducer.totalItems,
      })
    );
  };

  const handleToCart = () => {
    dispatch(
      addToCart({
        cartList: cartItems,
        product,
        totalCount: cartReducer.totalItems,
      })
    );
  };

  return (
    <>
      <Header />
      {loader ? ( // Show loader based on loader state
        <Box className='loader-container-product'>
          <CircularProgress color='inherit' />
        </Box>
      ) : (
        <Box className='product-container'>
          <Grid container spacing={4}>
            {/* Image Section */}
            <Grid item xs={12} md={6}>
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <img
                  src={product.image}
                  alt={product.title}
                  className='product-image'
                />
              </Box>
            </Grid>

            {/* Details Section */}
            <Grid item xs={12} md={6}>
              <Typography variant='h4' className='product-title'>
                {product.title}
              </Typography>
              <Typography
                variant='body1'
                paragraph
                className='product-description'>
                {product.description}
              </Typography>
              <Box className='product-rating'>
                <Typography variant='h6'>Rating:</Typography>
                <Rating
                  name='product-rating'
                  value={product.rating?.rate || 0}
                  precision={0.1}
                  readOnly
                />
                <Typography variant='body2'>
                  {product.rating?.count || "0"} reviews
                </Typography>
              </Box>

              <Box className='product-price'>
                <Typography variant='h5'>
                  Price: ${product.price?.toFixed(2)}
                </Typography>
              </Box>

              <Box className='add-to-cart-container'>
                {count > 0 ? (
                  <Box display='flex' alignItems='center'>
                    <IconButton onClick={handleDecrease}>
                      <RemoveIcon />
                    </IconButton>
                    <span>{count}</span>
                    <IconButton onClick={handleIncrease}>
                      <AddIcon />
                    </IconButton>
                  </Box>
                ) : (
                  <Button
                    variant='contained'
                    color='primary'
                    onClick={handleToCart}
                    className='add-to-cart-button'>
                    Add to Cart
                  </Button>
                )}
              </Box>
            </Grid>
          </Grid>
        </Box>
      )}
    </>
  );
};

export default ProductDetailsPage;
