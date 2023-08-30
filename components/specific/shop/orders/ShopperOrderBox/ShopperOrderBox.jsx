import React from 'react';
import { Box, Paper, Typography, Chip, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Link from 'next/link';


const IconWithText = ({ text, icon }) => {
  return (
    <Typography color={'textSecondary'}
      fontWeight='thin'
      fontSize={'small'}
      variatnt="body2"
      sx={{
        display: 'flex',
        alignItems: 'center',
        '& svg': {
          mr: 1,
        }
      }}>
      {icon}
      {text}
    </Typography>
  )
}


export default function ShopperOrderBox({ order }) {
  const { _id, totalAmount, status, products, orderDate } = order;

  console.log('order: ', order);
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
      <Typography variant="body1" fontWeight="" fontSize={'small'} mb={2}>
        {orderDate.toLocaleString()}
      </Typography>
      <Box mb={2} fontSize={'small'}>
        {order.userId.username &&
          <Typography variant="body1" color={'textPrimary'} fontWeight="bold">
            User details:
            <Link href={`${process.env.NEXT_PUBLIC_CURRENT_DOMAIN}/searchUser/${order.userId._id}`}
              style={{
                marginLeft: 4,
                fontWeight: 'thin',
                color: 'textSecondary',
                textDecoration: 'none',
              }}
            >
              profile link
            </Link>
          </Typography>}
        {order.userId.username && <IconWithText text={order.userId.username} icon={<AccountCircleIcon transform='scale(0.8)' />} />}
        {order.userId.email && <IconWithText text={order.userId.email} icon={<AlternateEmailIcon transform='scale(0.8)' />} />}
        {order.userId.address && <IconWithText text={order.userId.address} icon={<LocationOnIcon transform='scale(0.8)' />} />}
        {order.userId.contactPhone && <IconWithText text={order.userId.contactPhone} icon={<LocalPhoneIcon transform='scale(0.8)' />} />}
      </Box>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Product</TableCell>
              <TableCell align="center">Price</TableCell>
              <TableCell align="center">Quantity</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product, index) => (
              <TableRow key={index}>
                <TableCell sx={{ position: 'relative' }}>
                  <img src={product.productId.image} alt={product.productId.name} width={'auto'} height={40} style={{
                    position: 'absolute',
                    maxHeight: '100%',
                    top: '50%',
                    left: '0%',
                    transform: 'translate(0%, -50%)',
                  }} />
                </TableCell>
                <TableCell>
                  <Box display="flex" alignItems="center">
                    <Typography variant="subtitle1">
                      {product.productId.name.length > 40 ? product.productId.name.slice(0, 40) + '...' : product.productId.name}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell align="center">₹{product.productId.price}</TableCell>
                <TableCell align="center">{product.quantity}</TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell sx={{ borderBottom: 'none' }} >
                <Typography variant="subtitle" fontWeight="thin" >
                  Total Amount:
                </Typography>
              </TableCell>
              <TableCell></TableCell>
              <TableCell sx={{ borderBottom: 'none' }} align="center">
                <Typography variant="subtitle" fontWeight="bold" color="primary.main">
                  ₹{totalAmount}
                </Typography>
              </TableCell>
              <TableCell sx={{ borderBottom: 'none' }} align="center">
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
