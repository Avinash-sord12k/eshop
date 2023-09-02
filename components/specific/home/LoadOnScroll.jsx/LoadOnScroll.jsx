"use client";
import { Box, Button, Typography } from '@mui/material';
import Card, { CardSkeletonLoading } from '@/components/common/ProductCard/ProductCard';
import React, { useState, useEffect, useRef } from 'react';

const LoadOnScroll = ({ initialBasicProducts }) => {
  const [basicProducts, setBasicProducts] = useState(initialBasicProducts);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (
        containerRef.current &&
        containerRef.current.getBoundingClientRect().bottom <= window.innerHeight
      ) {
        handleGetMoreData();
      }
    };

    containerRef.current.addEventListener('scroll', handleScroll);

    return () => {
      if (containerRef.current) {
        containerRef.current.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  const handleGetMoreData = async () => {
    try {
      setLoading(true);
      const res = await fetch(`http://localhost:3000/api/products?page=${page + 1}`);
      const { body } = await res.json();
      let data = body.data;
      data = data.map(item => { item._id = item._id.toString(); return item; })
      setBasicProducts([...basicProducts, ...data]);
      setPage(page + 1);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Typography variant="h6" fontWeight={'bold'} mt={10}>
        All Products
      </Typography>
      <Box
        ref={containerRef}
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
          gridGap: '1rem',
          my: 2,
          overflowY: 'auto', // Enable vertical scrolling for the container
        }}
      >
        {basicProducts.map((product) => (
          <Card key={product._id} product={product} />
        ))}
        {loading &&
          [...Array(4)].map((_, i) => <CardSkeletonLoading key={i} />)}
      </Box>

      <Box sx={{display: 'flex', justifyContent: 'center', mt: 5}}>
        <Button variant="contained" onClick={handleGetMoreData} disabled={loading}>
          {loading ? "Loading more..." : "Load more"}
        </Button>
      </Box>
    </>
  );
};

export default LoadOnScroll;
