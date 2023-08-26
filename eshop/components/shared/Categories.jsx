"use client";
import { useTheme } from '@emotion/react';
import { Box } from '@mui/material';
import Link from 'next/link';
import React from 'react'

const categories = [
  {
    title: 'All',
    href: '/',
  },
  {
    title: 'Electronics',
    href: '/products/category/electronics',
  },
  {
    title: 'Headphones',
    href: '/products/category/headphones',
  },
  {
    title: 'Clothing',
    href: '/products/category/clothing',
  },
  {
    title: 'Furniture',
    href: '/products/category/furniture',
  },
  {
    title: 'Books',
    href: '/products/category/books',
  },
  {
    title: 'Sports',
    href: '/products/category/sports',
  },
  {
    title: 'Toys',
    href: '/products/category/toys',
  },
  {
    title: 'Food',
    href: '/products/category/food',
  },
  {
    title: 'Health',
    href: '/products/category/health',
  },
  {
    title: 'Beauty',
    href: '/products/category/beauty',
  },
  {
    title: 'Jewelry',
    href: '/products/category/jewelry',
  },
  {
    title: 'Automotive',
    href: '/products/category/automotive',
  },
  {
    title: 'Garden',
    href: '/products/category/garden',
  },
  {
    title: 'Pet',
    href: '/products/category/pet',
  },
  {
    title: 'Baby',
    href: '/products/category/baby',
  },
  {
    title: 'Tools',
    href: '/products/category/tools',
  },
  {
    title: 'Office',
    href: '/products/category/office',
  },
  {
    title: 'Movies',
    href: '/products/category/movies',
  },
];

const Categories = () => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        backgroundColor: 'background.paper',
        overflowX: 'auto',
        '&::-webkit-scrollbar': {
          display: 'none',
        },
      }}
    >
      {categories.map((category, index) => (
        <Link
          href={category.href}
          key={index}
          style={{
            textDecoration: 'none',
            padding: '4px 8px',
            color: 'gray', // Text color
            '&:hover': {
              color: theme.palette.primary.main, // Text color on hover
              backgroundColor: 'background.paper', // Background color on hover
              borderRadius: '4px', // Rounded corners on hover
            },
            transition: 'color 0.3s, background-color 0.3s', // Smooth transition
            marginRight: '8px', // Space between categories
          }}
        >
          {category.title}
        </Link>
      ))}
    </Box>
  );
};

export default Categories
