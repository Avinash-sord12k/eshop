"use client";

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Box, Paper } from '@mui/material';

const slideData = [
  {
    img: '/illustrations/Ecommerce web page-amico.svg',
    title: 'Ecommerce web page',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    img: '/illustrations/Data analysis-bro.svg',
    title: 'Online shopping',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    img: '/illustrations/Data analysis-pana.svg',
    title: 'Data analysis',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  }
]


export default () => {
  return (
    <Swiper
      modules={[Navigation, Pagination]}
      spaceBetween={50}
      slidesPerView={1}
      navigation={true}
      pagination={{ clickable: true }}
      // onSlideChange={() => console.log('slide change')}
      // onSwiper={(swiper) => console.log(swiper)}
      style={{ height: '300px', backgroundColor: '#fff' }}
      autoplay={{ delay: 5000 }}
    >
      {slideData.map((slide, index) => (
        <SwiperSlide key={index}>
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '50px',
            background: '#fff',
            borderRadius: '10px',
            height: '100%',
            width: '100%',
            padding: '10px',
            boxSizing: 'border-box',
            cursor: 'hand'
          }}>
            <img src={slide.img} alt={slide.title} style={{
              width: 'auto',
              height: '100%',
              maxWidth: { xs: 'none', sm: '20%', md: '40%' },
            }} />
            <Paper sx={{
              boxShadow: 'none',
              display: { xs: 'none', sm: 'block' }
            }}>
              <h1>{slide.title}</h1>
              <p>{slide.description}</p>
            </Paper>
          </Box>
        </SwiperSlide>
      ))}
    </Swiper >
  );
};