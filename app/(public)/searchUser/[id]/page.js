import React from 'react';
import { Grid, Paper, Avatar, Typography, Box, Badge, Container } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Users from '@/models/Users';
import { connect } from '@/database/connect';
import mongoose from 'mongoose';
import { stringToColor } from '@/utils/extras/extras';

const UserById = async ({ params }) => {
  await connect();
  const userId = new mongoose.Types.ObjectId(params.id);
  const {
    username,
    email,
    role,
    image,
    address,
    contactEmail,
    contactPhone,
    description } = await Users.findById(userId)
      .select('username email role image address contactEmail contactPhone description')
      .lean();

  const stringAvatar = (name) => {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name.trim()[0].toUpperCase()}`,
    };
  };
  return (
    <Container sx={{
      margin: '30px 0px 30px 0',
      maxWidth: '800px',
      mx: 'auto',
    }}>
      <Box sx={{
        minHeight: 'calc(100vh - 64px)'
      }}>
        <Box mb={2}>
          <Paper elevation={0} sx={{
            padding: 6,

            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            height: '100%',
            boxShadow: 1,
          }}>
            <Box sx={{
              position: 'relative',
              flex: '0 0 30%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Badge horizontal={'right'} vertical="bottom" color="primary" badgeContent={role} sx={{ marginTop: 1 }}>
                {(image) ? (
                  <Avatar alt="user image" src={image} sx={{ width: '100px', height: '100px' }} />
                ) : (
                  <Avatar {...stringAvatar(username || "A")} sx={{ width: '100px', height: '100px' }} />
                )}
              </Badge>
              <Typography variant="h6" sx={{ marginTop: 2 }}>
                {username}
              </Typography>
            </Box>
            <Box sx={{
              position: 'relative',
              flex: '1 1 70%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              justifyContent: 'flex-start',
              alignSelf: 'flex-start',
              gap: '10px',
            }}>
              {email && (
                <>
                  <Typography variant="body2" color="textSecondary" sx={{ display: 'flex', alignItems: 'center' }}>
                    <EmailIcon fontSize='small' sx={{ marginRight: 1, color: 'primary.main' }} />
                    {email}
                  </Typography>
                </>
              )}
              {address && (
                <>
                  <Typography variant="body2" color="textSecondary" sx={{ display: 'flex', alignItems: 'center' }}>
                    <LocationOnIcon fontSize='small' sx={{ mr: 1, color: 'primary.main' }} />
                    {address}
                  </Typography>
                </>
              )}
              {(contactEmail || contactPhone) && (
                <>
                  {contactEmail && <Typography color='textSecondary' sx={{ display: 'flex', alignItems: 'center' }}>
                    <EmailIcon fontSize='small' sx={{ marginRight: 1, color: 'primary.main' }} /> {contactEmail} <br /></Typography>}
                  {contactPhone && <Typography color='textSecondary' sx={{ display: 'flex', alignItems: 'center' }}>
                    <PhoneIcon fontSize='small' sx={{ marginRight: 1, color: 'primary.main' }} /> {contactPhone}</Typography>}
                </>
              )}
            </Box>
          </Paper>
        </Box>
        <Box>
          <Paper elevation={0} sx={{
            padding: 6,
            height: '100%',
            boxShadow: 1,
            display: 'flex',
            alignItems: 'flex-start',
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
          }}>
            <Box sx={{
              flex: '1 0 300px',
            }}>
              {description ?
                <>
                  <Typography variant="body1" sx={{ mt: 2, mb: 2 }}>
                    Description
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {description}
                  </Typography>
                </>
                :
                <Typography variant="body2" color="textSecondary">
                  No description provided.
                </Typography>
              }
            </Box>
            <Box sx={{
              flex: '1 0 300px',
            }}>
              <Typography variant="body1" sx={{ mt: 2, mb: 2 }}>
                Browse other products by {username}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Coming soon...
              </Typography>
            </Box>
          </Paper>
        </Box>
      </Box>
    </Container>
  );
}

export default UserById
