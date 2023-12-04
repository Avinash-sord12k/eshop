import React from 'react';
import { Grid, Paper, Avatar, Typography, Box, Divider, Chip } from '@mui/material';
import BusinessIcon from '@mui/icons-material/Business';
import WorkIcon from '@mui/icons-material/Work';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';

// not working icons below
// import FacebookIcon from '@mui/icons-material/Facebook';
// import InstagramIcon from '@mui/icons-material/Instagram';
// import TwitterIcon from '@mui/icons-material/Twitter';

// import { BsFacebook } from 'react-icons/bs';
// import { BsInstagram } from 'react-icons/bs';
// import { BsTwitter } from 'react-icons/bs';

import { stringToColor } from '@/utils/extras/extras';
import Link from 'next/link';
import EditProfileModal from '@/components/specific/shopperProfile/EditProfileModal';
import { connect } from '@/database/connect';
import User from '@/models/Users';
import Products from '@/models/Products';
import { cookies } from 'next/headers';
import { getUserfromJwt } from '@/utils/auth/auth';

const ProfilePage = async () => {
  const stringAvatar = (name) => {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name.trim()[0].toUpperCase()}`,
    };
  };

  await connect();
  const token = cookies().get('token').value;
  const { username, email } = await getUserfromJwt(token);
  const user = await User.findOne({ email });
  const { image, businessType, description, products, services, address, startedYear, contactEmail, contactPhone, socialLinks } = user;

  console.log(image);
  console.log("user: ", JSON.stringify(user), "\n\n");

  return (
    <Box>
      <Grid container spacing={2} sx={{ minHeight: 'calc(100vh - 64px)' }}>
        <Grid item xs={12} md={5} justifySelf={'stretch'} >
          <Paper elevation={0} sx={{ padding: 6, display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', boxShadow: 1 }}>
            {(image) ? (
              <Avatar alt="user image" src={image} sx={{ width: '100px', height: '100px' }} />
            ) : (
              <Avatar {...stringAvatar(username || "A")} sx={{ width: '100px', height: '100px' }} />
            )}
            <Typography variant="h6" sx={{ marginTop: 2 }}>
              {username}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {email}
            </Typography>
            {/* Business information */}
            <Divider sx={{ my: 2, backgroundColor: 'black' }} />
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
              }}>
              {businessType && <Typography variant="body1"><BusinessIcon sx={{ mr: 1, color: 'primary.main' }} /> {businessType}</Typography>}
              {services && <Typography variant="body2" sx={{ mt: 1 }}><WorkIcon sx={{ mr: 1, color: 'primary.main' }} /> {services}</Typography>}
              <Divider sx={{ my: 2 }} />
              {address && <Typography variant="body1"><LocationOnIcon sx={{ mr: 1, color: 'primary.main' }} /> {address}</Typography>}
              {contactEmail && <Typography variant="body2" sx={{ mt: 1 }}><EmailIcon sx={{ mr: 1, color: 'primary.main' }} /> {contactEmail}</Typography>}
              {contactPhone && <Typography variant="body2" sx={{ mt: 1 }}><PhoneIcon sx={{ mr: 1, color: 'primary.main' }} /> {contactPhone}</Typography>}
              {/* Social media links */}
              <Divider sx={{ my: 2 }} />
              <Divider>
                <Box sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                  color: 'primary.main',
                  '&a': {
                    color: 'primary.main',
                    display: 'flex',  
                    alignItems: 'center',
                    justifyContent: 'center',
                    '&:hover': {
                      color: 'primary.main',
                    }
                  }
                }}>
                  {socialLinks.facebook &&
                    <Link href={socialLinks.facebook || '#'} target="_blank" rel="noopener noreferrer">
                      {/* <BsFacebook style={{ color: '#673ab7', fontSize: '1.2rem' }} /> */}
                    </Link>}
                  {socialLinks.instagram &&
                    <Link href={socialLinks.instagram || "#"} target="_blank" rel="noopener noreferrer">
                      {/* <BsInstagram style={{ color: '#673ab7', fontSize: '1.2rem' }} /> */}
                    </Link>}
                  {socialLinks.twitter &&
                    <Link href={socialLinks.twitter || "#"} target="_blank" rel="noopener noreferrer">
                      {/* <BsTwitter style={{ color: '#673ab7', fontSize: '1.2rem' }} /> */}
                    </Link>}
                </Box>
              </Divider>

            </Box>
          </Paper>
        </Grid>
        {/* Add the rest of your layout here */}
        <Grid item xs={12} md={7}>
          <Paper elevation={0} sx={{ padding: 6, height: '100%', boxShadow: 1 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Products</Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', mt: 2 }}>
              {products.map((product, index) => (
                <Box key={index} sx={{ bgcolor: 'primary.main', color: 'white', borderRadius: '5px', p: 1, mr: 1, mb: 1 }}>{product}
                </Box>
              ))}
            </Box>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mt: 4 }}>About</Typography>
            <Typography variant="body2" sx={{ mt: 2 }}>{description}</Typography>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mt: 4 }}>History</Typography>
            <Typography variant="body2" sx={{ mt: 2 }}>Founded in {startedYear}, we have been serving our customers for over 15 years.</Typography>
            <EditProfileModal />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProfilePage;
