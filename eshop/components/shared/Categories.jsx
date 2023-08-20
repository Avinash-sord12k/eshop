"use client";
import { useTheme } from '@emotion/react';
import { Box } from '@mui/material';
import Link from 'next/link';
import React from 'react'

const categories = [
  {
    title: 'Electronics',
    description: 'Explore our wide range of high-quality products.',
    href: '/products/electronics',
  },
  {
    title: 'Clothing',
    description: 'Explore our wide range of high-quality products.',
    href: '/products/clothing',
  },
  {
    title: 'Furniture',
    description: 'Explore our wide range of high-quality products.',
    href: '/products/furniture',
  },
  {
    title: 'Books',
    description: 'Explore our wide range of high-quality products.',
    href: '/products/books',
  },
  {
    title: 'Sports',
    description: 'Explore our wide range of high-quality products.',
    href: '/products/sports',
  },
  {
    title: 'Toys',
    description: 'Explore our wide range of high-quality products.',
    href: '/products/toys',
  },
  {
    title: 'Food',
    description: 'Explore our wide range of high-quality products.',
    href: '/products/food',
  },
  {
    title: 'Health',
    description: 'Explore our wide range of high-quality products.',
    href: '/products/health',
  },
  {
    title: 'Beauty',
    description: 'Explore our wide range of high-quality products.',
    href: '/products/beauty',
  },
  {
    title: 'Jewelry',
    description: 'Explore our wide range of high-quality products.',
    href: '/products/jewelry',
  },
  {
    title: 'Automotive',
    description: 'Explore our wide range of high-quality products.',
    href: '/products/automotive',
  },
  {
    title: 'Garden',
    description: 'Explore our wide range of high-quality products.',
    href: '/products/garden',
  },
  {
    title: 'Pet',
    description: 'Explore our wide range of high-quality products.',
    href: '/products/pet',
  },
  {
    title: 'Baby',
    description: 'Explore our wide range of high-quality products.',
    href: '/products/baby',
  },
  {
    title: 'Tools',
    description: 'Explore our wide range of high-quality products.',
    href: '/products/tools',
  },
  {
    title: 'Office',
    description: 'Explore our wide range of high-quality products.',
    href: '/products/office',
  },
  {
    title: 'Movies',
    description: 'Explore our wide range of high-quality products.',
    href: '/products/movies',
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
        backgroundColor: 'background.paper'
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
