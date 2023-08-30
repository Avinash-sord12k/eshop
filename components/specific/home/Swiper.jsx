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
              [theme.breakpoints.down('md')]: {
                position: 'absolute',
                bottom: '0',
                left: '50%',
                transform: 'translateX(-50%)',
                textAlign: 'center',
                width: '80%',
                background: '#ffffffc7',
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
              <p>{slide.description}</p>
            </Box>
          </Box>

        </SwiperSlide>
      ))}
    </Swiper >
  );
};