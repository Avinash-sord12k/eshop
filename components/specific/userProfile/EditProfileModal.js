"use client";
import React from 'react';
import { Typography, Box, Modal, Fade, TextField, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useDispatch } from 'react-redux';
import { setDisabledLoading, setAlert } from '@/store/uiStateSlice/uiStateSlice';


const EditProfileModal = () => {
  const dispatch = useDispatch();
  
  const [openModal, setOpenModal] = React.useState(null);
  const handleClose = () => { setOpenModal(null) };
  const handleOpen = (index) => { setOpenModal(index); };
  
  const [data, setData] = React.useState({
    image: "",
    description: "",
    address: "",
    contactEmail: "",
    contactPhone: "",
  });

  const handleSubmit = async () => {
    dispatch(setDisabledLoading(true));
    try {
      const response = await fetch('/api/profile/user', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const resJson = await response.json();
      const responseData = resJson.body;
      console.log("responseData: ", responseData);
      dispatch(setDisabledLoading(false));
      if (!responseData.success) {
        dispatch(setAlert({ message: responseData.message, severity: "error", open: true }));
        dispatch(setDisabledLoading(false));
        return;
      }
      dispatch(setAlert({ message: responseData.message, severity: "success", open: true }));
      dispatch(setDisabledLoading(false));
      handleClose();
    } catch (error) {
      console.log("error in updating shopper: ", error.message);
      dispatch(setAlert({ message: "Internal server error", severity: "error", open: true }));
      dispatch(setDisabledLoading(false));
    }
  }

  return (
    <>
      <Button variant={'contained'} mt="20px" onClick={handleOpen}>
        <EditIcon sx={{ mr: 1 }} />
        Edit Profile
      </Button> 
      <Modal
        open={openModal != null}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ zIndex: 10000 }}
      >
        <Fade in={openModal != null}>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              bgcolor: 'background.paper',
              boxShadow: 24,
              p: 4,
              width: { xs: '90%', sm: '60%', md: '40%' },
              maxHeight: "80vh",
              borderRadius: '5px',
              overflowY: 'auto',
              '&::-webkit-scrollbar': {
                width: '0.4em'
              },
              '&::-webkit-scrollbar-track': {
                backgroundColor: 'rgba(0,0,0,0)'
              },
              '&::-webkit-scrollbar-thumb': {
                backgroundColor: 'primary.main'
              }
            }}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Edit Profile
            </Typography>

            <TextField
              label="Image link"
              fullWidth
              margin="normal"
              name="image"
              value={data.image}
              onChange={(e) => setData({ ...data, image: e.target.value })}
            />


            <TextField
              label="Description"
              fullWidth
              multiline
              rows={4}
              margin="normal"
              name='description'
              value={data.description}
              onChange={(e) => setData({ ...data, description: e.target.value })}
            />
            <TextField
              label="Address"
              fullWidth
              rows={4}
              margin="normal"
              name='address'
              value={data.address}
              onChange={(e) => setData({ ...data, address: e.target.value })}
            />
            <TextField
              label="Contact Email"
              fullWidth
              margin="normal"
              name='contactEmail'
              value={data.contactEmail}
              onChange={(e) => setData({ ...data, contactEmail: e.target.value })}
            />
            <TextField
              label="Contact Phone"
              fullWidth
              margin="normal"
              name='contactPhone'
              value={data.contactPhone}
              onChange={(e) => setData({ ...data, contactPhone: e.target.value })}
            />

            <Button variant="contained" color="primary" sx={{ marginTop: 2 }} onClick={handleSubmit}>
              Save Changes
            </Button>
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

export default EditProfileModal;