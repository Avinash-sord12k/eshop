import React from 'react';
import { Box, Paper, Typography, Chip, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

export default function ShopperOrderBox({ order }) {
  const { _id, totalAmount, status, products, orderDate } = order;
  // console.log(orderDate);
  return (
    <Paper elevation={3} style={{ padding: '20px' }}>
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <Typography variant="subtitle" fontWeight="bold">
          Order id:{_id.toString()}
        </Typography>
        <Chip
          label={status}
          icon={status === 'pending' ? <PriorityHighIcon /> : status === 'completed' ? <CheckIcon /> : <CloseIcon />}
          color={status === 'pending' ? 'warning' : status === 'completed' ? 'success' : 'error'}
          size="small"
          mb={2}
        />
      </Box>
      <Typography variant="body1" fontWeight="" mb={2} fontSize={'small'}>{orderDate.toLocaleString()}</Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell align="center">Price</TableCell>
              <TableCell align="center">Quantity</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Box display="flex" alignItems="center">
                    <img src={product.productId.image} alt={product.productId.name} width={40} height={40} />
                    <Typography variant="subtitle1" ml={2}>
                      {product.productId.name}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell align="center">₹{product.productId.price}</TableCell>
                <TableCell align="center">{product.quantity}</TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell sx={{borderBottom: 'none'}} >
                <Typography variant="subtitle" fontWeight="thin" mt={2}>
                  Total Amount:
                </Typography>
              </TableCell>
              <TableCell sx={{borderBottom: 'none'}} align="center">
                <Typography variant="subtitle" fontWeight="bold" color="primary.main">
                  ₹{totalAmount}
                </Typography>
              </TableCell>
              <TableCell sx={{borderBottom: 'none'}} align="center">

              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      {/* <Box sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        

      </Box> */}
    </Paper>
  );
}
