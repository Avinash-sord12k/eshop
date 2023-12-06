import React from 'react';
import { Box, Grid, Typography, Rating, Container, CircularProgress } from '@mui/material';
import { connect } from '@/database/connect';
import Products from '@/models/Products';
import ProductOptions from '@/components/specific/shop/ProductPage/ProductOptions';
import SameCategoryProducts from '@/components/specific/shop/ProductPage/SameCategoryProducts';
import SellerInfo from '@/components/specific/shop/ProductPage/SellerInfo';
import ReviewForm from '@/components/shared/Review/Form';
import Reviews from '@/models/Reviews';
import ReviewCard from '@/components/shared/Review/Card';


const ProductPage = async ({ params }) => {

  await connect();
  const product = await Products.findById(params.id)
    .select('_id name price description category image shopperId')
    .lean();

  const reviews = await Reviews.find({ productId: params.id })
    .populate('userId', 'username id')
    .lean();

  console.log("reviews: ", reviews);

  const { category } = product;
  product._id = product._id.toString();

  return (
    <Container sx={{ mt: 4 }}>
      <Grid container spacing={6}>
        <Grid item xs={12} md={4} sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
          <Box elevation={2} >
            {/* // not using next/image because of hostname issue. */}
            <img src={product.image} alt={product.name} style={{
              width: '300px',
            }} />
          </Box>
        </Grid>
        <Grid item xs={12} md={8}>
          <Box>
            <Typography variant="h5" sx={{ fontWeight: '600' }}>
              {product.name[0].toUpperCase() + product.name.slice(1)}
            </Typography>
            <Rating name="read-only" value={4} readOnly />
            <Typography variant="h4" color="primary" sx={{ mt: 1 }}>
              ₹{product.price}
            </Typography>
            {product.description ? <Typography variant="body1" color='textSecondary' sx={{ mt: 2 }}>
              {product.description.slice(0, 300) + '...'}
            </Typography> : null}
            <Box
              sx={{
                display: 'inline',
                py: 2,
                borderRadius: '4px',
                color: 'primary.main',
                my: 4,
                transition: 'all 0.2s ease-in-out',
                '&:hover': {
                  cursor: 'pointer',
                  textDecoration: 'underline',
                }
              }}>
              <React.Suspense fallback={<CircularProgress />}>
                <SellerInfo shopperId={product.shopperId} />
              </React.Suspense>
            </Box>
            <ProductOptions product={product} />
          </Box>
        </Grid>
      </Grid>
      {category ? <React.Suspense fallback={<CircularProgress />}>
        <SameCategoryProducts category={category} />
      </React.Suspense> : null}
      <section>
        <Box mt={10}>
          <Typography variant="h4" sx={{ fontWeight: '600', mt: 4 }}>
            Reviews
          </Typography>
          <Box sx={{
            py: 5,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'stretch',
            justifyContent: 'start',
            borderRadius: '4px',
            border: '1px solid #e8e8e8',
          }}>
            {
              reviews && reviews.length > 0
                ? reviews.map((review) => (
                  <ReviewCard
                    key={review._id}
                    review={{
                      id: review._id,
                      title: review.title,
                      userId: review.userId._id,
                      name: review.userId.username,
                      rating: review.rating,
                      review: review.comment,
                    }}
                  />
                )) : <Typography variant="h5" color="textSecondary">
                  No reviews yet.
                </Typography>
            }
          </Box>
        </Box>
      </section>
      <section>
        <ReviewForm
          productId={params.id} />
      </section>
    </Container>
  );
};

export default ProductPage;
