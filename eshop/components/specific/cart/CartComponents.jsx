import { Card, CardContent, CardMedia, Typography, Button, Box, Grid, Paper, IconButton } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { useSelector, useDispatch } from 'react-redux';
import { addCartItem, removeCartItem, deleteCartItem, resetCart } from '@/store/cartSlice/cartSlice';
import { setAlert } from '@/store/uiStateSlice/uiStateSlice';

export const CartListItem = ({ item }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  return (
    <Card sx={{ display: 'flex', marginBottom: theme.spacing(2) }}>
      <CardMedia
        component="img"
        sx={{ width: 150, minWidth: 150, objectFit: 'cover' }}
        image={item.image}
        alt={item.name}
      />
      <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <Box>
          <Typography variant="h6" sx={{ marginBottom: theme.spacing(1) }}>
            {item.name}
          </Typography>
          <Box>
            <IconButton onClick={() => dispatch(removeCartItem(item))}>
              <RemoveCircleIcon />
            </IconButton>
            <Typography variant="body1" sx={{ display: 'inline-block', margin: '0 10px' }}>
              {item.quantity}
            </Typography>
            <IconButton onClick={() => dispatch(addCartItem(item))}>
              <AddCircleIcon />
            </IconButton>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box>
            <Typography variant="subtitle1" color="primary">
              ₹{Math.floor(item.price)}
            </Typography>
          </Box>
          <IconButton aria-label="remove from cart" color="error" onClick={() => dispatch(deleteCartItem(item))}>
            <DeleteIcon />
          </IconButton>
        </Box>
      </CardContent>
    </Card>
  );
};
export const CheckOutCart = ({ cart }) => {
  const { email } = useSelector(state => state.auth);
  console.log({ email });
  const dispatch = useDispatch();
  const handlePlaceOrder = async () => {
    try {
      const cartData = {
        email,
        products: cart.map(item => {
          return {
            productId: item.id,
            shopperId: item.shopperId,
            quantity: item.quantity
          }
        }),
        totalAmount: cart.reduce((total, item) => total + item.price * item.quantity, 0),
        status: "pending"
      }
      console.log(cartData);
      const response = await fetch('api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'credentials': 'include'
        },
        body: JSON.stringify(cartData)
      });

      const data = await response.json();
      console.log({ data });
      if (!data.body.success) {
        return dispatch(setAlert({ message: data.body.message, severity: 'error', open: true }));
      }

      dispatch(setAlert({ message: data.body.message, severity: 'success', open: true }));
      dispatch(resetCart());

    } catch (error) {
      console.error(error);
    }
  }
  return (
    <Box sx={{ mt: 4 }}>
      <Button fullWidth variant='contained' onClick={handlePlaceOrder}>Place order</Button>
    </Box>
  )
};
export const CartSummary = ({ cart, cartItems }) => {
  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  return (
    <Box sx={{ mt: 4 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h6" fontWeight={'bold'}>Cart Summary</Typography>
        <hr />
        {cart.map(item => (
          <Box sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }} key={item.id}>
            <Typography variant="body1">
              {item.name} {item.quantity > 1 ? `x ${item.quantity}` : null}
            </Typography>
            <Typography variant="body1">
              ₹{Math.floor(item.price * item.quantity)}
            </Typography>
          </Box>
        ))}
        <hr />
        <Box sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <Typography variant="body1">Total items</Typography>
          <Typography variant="body1">{cartItems}</Typography>
        </Box>
        <Box sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <Typography variant="body1">Total</Typography>
          <Typography variant="body1">₹{Math.floor(cartTotal)}</Typography>
        </Box>
        <hr />
        <CheckOutCart cart={cart} />
      </Paper>
    </Box>
  );
};