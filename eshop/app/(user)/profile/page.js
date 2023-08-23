"use client";
import React from 'react';
import { Grid, Paper, Avatar, Typography, Box, Badge } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import useTheme from '@mui/material/styles/useTheme';
import { useSelector } from 'react-redux';
import { stringToColor } from '@/utils/extras/extras';


const ProfilePage = () => {
  const stringAvatar = (name) => {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name.trim()[0].toUpperCase()}`,
    };
  }
  const theme = useTheme();
  const { image, username, role, permissions, email } = useSelector(state => state.auth);

  return (
    <Box sx={{ margin: '30px 30px 30px 0' }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Paper elevation={0} sx={{ padding: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Badge
              badgeContent={<AddCircleIcon onClick={() => console.log('clicked')} />}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              sx={{
                '& .MuiBadge-badge': {
                  color: theme.palette.primary.main,
                },
                '&::after': {
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  borderRadius: '50%',
                  animation: 'ripple 1.2s infinite ease-in-out',
                  border: '1px solid currentColor',
                  content: '""',
                },
                '&::after:hover': {
                  animationDuration: '0.8s',
                },
              }}
            >
              {(image) ? (
                <Avatar alt="user image" src={image} sx={{ width: '100px', height: '100px' }} />
              ) : (
                <Avatar {...stringAvatar(username || "A")} sx={{ width: '100px', height: '100px' }} />
              )}
            </Badge>
            <Typography variant="h6" sx={{ marginTop: 2 }}>
              {username}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {role}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={8}>
          <Paper elevation={0} sx={{ padding: 2 }}>
            <Typography variant="h6">Role</Typography>
            <Typography variant="body1">{role}</Typography>
            <Typography variant="h6" sx={{ marginTop: 2 }} gutterBottom>
              Permissions
            </Typography>
            <Grid container>
              {permissions.map((permission, index) => (
                <React.Fragment key={index}>
                  <Grid item xs={3} sx={{ p: 2 }}>
                    <Typography variant="body1">{permission.resource}</Typography>
                  </Grid>
                  <Grid item xs={9}>
                    {permission.actions.map((action, index2) => (
                      <Typography variant={'span'} key={index2} sx={{
                        mr: 3,
                        backgroundColor: stringToColor(action),
                        px: '8px', py: '4px', borderRadius: 3, color: 'white',
                        border: '2px solid #11111150',
                        boxSizing: 'border-box',
                        textTransform: 'capitalize'
                      }}>
                        {action}
                      </Typography>
                    ))}
                  </Grid>
                </React.Fragment>
              ))}
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProfilePage;
