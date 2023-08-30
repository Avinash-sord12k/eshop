"use client";

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import useTheme from '@mui/material/styles/useTheme';
import { Box, Typography } from '@mui/material';
import { Image } from '@mui/icons-material';



export default function HeroSwiper() {
  const theme = useTheme();
  const slideData = [
    {
      img: '/illustrations/Ecommerce web page-amico.svg',
      title: 'Ecommerce Web App',
      description: 'Craft seamless online shopping experiences with our Ecommerce web application. Elevate user engagement and boost sales with user-friendly interfaces and secure transactions.',
    },
    {
      img: '/illustrations/Data analysis-bro.svg',
      title: 'Online Shopping Solutions',
      description: 'Unlock the potential of your business with our Online Shopping Solutions. Harness data-driven insights for enhanced customer experiences and optimized sales strategies.',
    },
    {
      img: '/illustrations/Data analysis-pana.svg',
      title: 'Advanced Data Analysis',
      description: 'Empower your decision-making with Advanced Data Analysis. Uncover actionable insights from complex data sets and drive strategic growth for your business.',
    }
  ];

  return (
    <Swiper
      modules={[Navigation, Pagination]}
      spaceBetween={50}
      slidesPerView={1}
      navigation={true}
      pagination={{ clickable: true }}
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
            cursor: 'pointer', // 'hand' should be 'pointer'
          }}>
            <img src={slide.img} alt={slide.title}
              style={{
                width: 'auto',
                height: '100%',
                maxWidth: '100%',
                [theme.breakpoints.up('md')]: {
                  maxWidth: '40%',
                },
                [theme.breakpoints.up('lg')]: {
                  maxWidth: '20%',
                },
              }} />
            <Box sx={{
              boxShadow: 'none',
              position: 'relative',
              alignSelf: 'flex-start',
              marginTop: '20px',
              transition: 'all 0.3s ease-in-out',
              padding: '20px',
              [theme.breakpoints.down('md')]: {
                position: 'absolute',
                bottom: '0',
                left: '50%',
                transform: 'translateX(-50%)',
                textAlign: 'center',
                width: '80%',
                background: '#ffffffc7',
                borderRadius: '10px',
                '&:hover': {
                  opacity: '0.1',
                }
              },
            }}>
              <Typography variant='h2'
                sx={{
                  fontWeight: 'bold',
                  fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem', lg: '3rem' },
                  lineHeight: { xs: '1.5rem', sm: '2rem', md: '2.5rem', lg: '3rem' },
                  color: theme.palette.primary.main,
                }}
              >{slide.title}</Typography>
              <Typography variant='subtitle1' >{slide.description}</Typography>
            </Box>
          </Box>

        </SwiperSlide>
      ))}
    </Swiper >
  );
};