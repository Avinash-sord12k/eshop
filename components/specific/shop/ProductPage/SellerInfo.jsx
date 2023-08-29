import { Box, Typography } from '@mui/material'
import React from 'react'
import Users from '@/models/Users'
import Link from 'next/link';

const SellerInfo = async ({ shopperId }) => {
  const { username, email } = await Users.findById(shopperId).select('username email').lean();

  return (
    <>
      <span style={{ marginRight: 10 }}>View seller:</span>
      <Link
        href={`${process.env.NEXT_PUBLIC_CURRENT_DOMAIN}/searchUser/${shopperId.toString()}`}
        style={{ textDecoration: 'none', color: 'inherit' }}
      >
        {username}
      </Link>
    </>
  )
}

export default SellerInfo
