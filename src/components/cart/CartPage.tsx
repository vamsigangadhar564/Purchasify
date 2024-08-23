import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Paper,
  Divider,
  Slide,
} from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import { addToCart, removeFromCart, clearCart } from "../../reducers/cartSlice";
import { useNavigate } from "react-router-dom";
import Header from "../header/Header";
import "./CartPage.css"; // Import the CSS file

const CartPage = () => {
  const dispatch = useDispatch();
  const cartReducer = useSelector((state: any) => state["cartReducer"]);
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState<any[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    setCartItems(cartReducer.cartItems);
  }, [cartReducer]);

  useEffect(() => {
    const price = cartItems.reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );
    setTotalPrice(price);
  }, [cartItems]);

  const [openDialog, setOpenDialog] = useState(false);
  const [itemToRemove, setItemToRemove] = useState<any>(null);

  const handleOpenDialog = (item: any) => {
    setItemToRemove(item);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setItemToRemove(null);
    setOpenDialog(false);
  };

  const handleRemoveItem = () => {
    dispatch(
      removeFromCart({
        cartList: cartItems,
        product: itemToRemove,
        totalCount: cartReducer.totalItems,
      })
    );
    handleCloseDialog();
  };

  const handleProceedToBuy = () => {
    dispatch(clearCart());
    navigate("/success");
  };

  return (
    <>
      <Header />
      <Box sx={{ ml: 5, mr: 3, mt: 3 }}>
        <Typography variant='h4'>Cart: {cartItems.length} items</Typography>
      </Box>

      <Box sx={{ display: "flex", margin: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Paper className='cart-paper'>
              {cartItems.length > 0 ? (
                cartItems.map((item) => (
                  <Slide direction='up' in key={item.id}>
                    <Card className='cart-card'>
                      <CardMedia
                        component='img'
                        sx={{
                          width: 150,
                          height: 150,
                          borderRadius: "12px",
                          objectFit: "contain",
                        }}
                        image={item.image}
                        alt={item.title}
                      />
                      <CardContent className='cart-content'>
                        <Box>
                          <Typography variant='h6' className='cart-title'>
                            {item.title}
                          </Typography>
                          <Typography
                            variant='body2'
                            color='textSecondary'
                            sx={{ paddingTop: 1 }}>
                            {item.description}
                          </Typography>
                        </Box>
                        <Box className='cart-actions'>
                          <Typography variant='h6' className='cart-price'>
                            ${item.price}
                          </Typography>
                          <Box className='cart-quantity'>
                            <IconButton
                              onClick={() => {
                                if (item.count > 1) {
                                  dispatch(
                                    removeFromCart({
                                      cartList: cartItems,
                                      product: item,
                                      totalCount: cartReducer.totalItems,
                                    })
                                  );
                                } else {
                                  handleOpenDialog(item);
                                }
                              }}>
                              <Remove />
                            </IconButton>
                            <Typography className='cart-count'>
                              {item.count}
                            </Typography>
                            <IconButton
                              onClick={() => {
                                dispatch(
                                  addToCart({
                                    cartList: cartItems,
                                    product: item,
                                    totalCount: cartReducer.totalItems,
                                  })
                                );
                              }}>
                              <Add />
                            </IconButton>
                          </Box>
                        </Box>
                      </CardContent>
                    </Card>
                  </Slide>
                ))
              ) : (
                <Typography variant='h6' align='center'>
                  Your cart is empty.
                </Typography>
              )}
            </Paper>
          </Grid>

          {/* Right section - Summary (1/3 of the screen) */}
          <Grid item xs={12} md={4}>
            <Paper
              className='summary-paper'
              sx={{ backgroundColor: "#f0f4f8" }}>
              <Typography variant='h6'>Order Summary</Typography>
              <Divider sx={{ my: 2 }} />
              <Typography variant='body1'>
                Total Products: {cartReducer.totalItems}
              </Typography>
              <Typography variant='body1'>
                Total Price: ${totalPrice.toFixed(2)}
              </Typography>
              <Button
                variant='contained'
                color='primary'
                onClick={handleProceedToBuy}
                fullWidth
                className='summary-button'>
                Proceed to Buy
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Box>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Remove Item</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to remove this item from the cart?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleRemoveItem} color='error'>
            Remove
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CartPage;
