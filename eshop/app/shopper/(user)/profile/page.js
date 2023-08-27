import React from 'react';
import { Grid, Paper, Avatar, Typography, Box, Divider } from '@mui/material';
import BusinessIcon from '@mui/icons-material/Business';
import WorkIcon from '@mui/icons-material/Work';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';

// import FacebookIcon from '@mui/icons-material/Facebook';
// import InstagramIcon from '@mui/icons-material/Instagram';
// import TwitterIcon from '@mui/icons-material/Twitter';

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
  // function stringToColor(string) {
  //   let hash = 0;
  //   let i;

  //   /* eslint-disable no-bitwise */
  //   for (i = 0; i < string.length; i += 1) {
  //     hash = string.charCodeAt(i) + ((hash << 5) - hash);
  //   }

  //   let color = '#';

  //   for (i = 0; i < 3; i += 1) {
  //     const value = (hash >> (i * 8)) & 0xff;
  //     color += `00${value.toString(16)}`.slice(-2);
  //   }
  //   /* eslint-enable no-bitwise */

  //   return color;
  // }

  await connect();
  const token = cookies().get('token').value;
  const { username, email } = await getUserfromJwt(token);
  const user = await User.findOne({ email });
  const { image, businessType, description, products, services, address, startedYear, contactEmail, contactPhone, socialLinks } = user;

  console.log(image);
  console.log("user: ", JSON.stringify(user), "\n\n");

  // let username = 'John Doe';
  // let email = '';
  // let image = '';
  // let businessType = 'Retail';
  // let description = 'A leading retail company specializing in electronics and gadgets.';
  // let products = ['Smartphones', 'Laptops', 'Accessories'];
  // let services = 'Product repair, Warranty services';
  // let address = '123 Main Street, Cityville';
  // let startedYear = '2005';
  // let contactEmail = 'info@example.com';
  // let contactPhone = '+123-456-7890';
  // let socialLinks = {
  //   facebook: 'https://www.facebook.com/companyXYZ',
  //   instagram: 'https://www.instagram.com/companyXYZ',
  //   twitter: 'https://www.twitter.com/companyXYZ',
  // };


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
              <Typography variant="body1"><BusinessIcon sx={{ mr: 1, color: 'primary.main' }} /> {businessType}</Typography>
              {/* <Typography variant="body2" sx={{ mt: 1 }}><DescriptionIcon sx={{ mr: 1 }} /> {description}</Typography> */}
              <Typography variant="body2" sx={{ mt: 1 }}><WorkIcon sx={{ mr: 1, color: 'primary.main' }} /> {services}</Typography>
              {/* Contact information */}
              <Divider sx={{ my: 2 }} />
              <Typography variant="body1"><LocationOnIcon sx={{ mr: 1, color: 'primary.main' }} /> {address}</Typography>
              <Typography variant="body2" sx={{ mt: 1 }}><EmailIcon sx={{ mr: 1, color: 'primary.main' }} /> {contactEmail}</Typography>
              <Typography variant="body2" sx={{ mt: 1 }}><PhoneIcon sx={{ mr: 1, color: 'primary.main' }} /> {contactPhone}</Typography>
              {/* Social media links */}
              <Divider sx={{ my: 2 }} />
              <Box sx={{ mt: 2 }}>
                <Link href={socialLinks.facebook} target="_blank" rel="noopener noreferrer">
                  Facebook
                </Link>
                <Link href={socialLinks.instagram} target="_blank" rel="noopener noreferrer">
                  Instagram
                </Link>
                <Link href={socialLinks.twitter} target="_blank" rel="noopener noreferrer">
                  Twitter
                </Link>
              </Box>

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
