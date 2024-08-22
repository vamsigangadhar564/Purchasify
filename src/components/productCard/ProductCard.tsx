// ProductCard.tsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
  Box,
  Tooltip,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../../reducers/cartSlice";
import "./ProductCard.css"; // Import the CSS file
import { Product } from "../home/HomePage";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [count, setCount] = useState<number>(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [cartItems, setCartItems] = useState<any[]>([]);

  const cartReducer = useSelector((state: any) => state.cartReducer);

  useEffect(() => {
    const item = cartItems.find((item) => item.id === product.id);
    setCount(item?.count || 0);
  }, [cartItems, product.id]);

  useEffect(() => {
    setCartItems(cartReducer.cartItems);
  }, [cartReducer]);

  const handleProductClick = () => {
    navigate(`/product/${product.id}`);
  };

  const handleCartClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(
      addToCart({
        cartList: cartItems,
        product: product,
        totalCount: cartReducer.totalItems,
      })
    );
  };

  const handleIncrease = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(
      addToCart({
        cartList: cartItems,
        product: product,
        totalCount: cartReducer.totalItems,
      })
    );
  };

  const handleDecrease = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(
      removeFromCart({
        cartList: cartItems,
        product: product,
        totalCount: cartReducer.totalItems,
      })
    );
  };

  return (
    <Card onClick={handleProductClick} className='card'>
      <CardMedia
        component='img'
        alt={product.title}
        height='140'
        image={product.image}
        title={product.title}
      />
      <CardContent>
        <Tooltip title={product.title} arrow>
          <Typography variant='h5' component='div' className='card-title'>
            {product.title}
          </Typography>
        </Tooltip>
        <Typography variant='body2' color='text.secondary'>
          ${product.price}
        </Typography>
        <Box
          display='flex'
          alignItems='center'
          justifyContent='space-between'
          mt={1}>
          {count > 0 ? (
            <Box display='flex' alignItems='center'>
              <IconButton className='icon-button' onClick={handleDecrease}>
                <RemoveIcon />
              </IconButton>
              <span>{count}</span>
              <IconButton className='icon-button' onClick={handleIncrease}>
                <AddIcon />
              </IconButton>
            </Box>
          ) : (
            <IconButton className='icon-button' onClick={handleCartClick}>
              <ShoppingCartIcon />
            </IconButton>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
