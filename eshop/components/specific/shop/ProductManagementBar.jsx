import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import MenuIcon from '@mui/icons-material/Menu';
import { useTheme } from '@emotion/react';
import { Button, MenuItem } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function ProductManagementBar({ openAddProductModlNav }) {
  const theme = useTheme();
  return (
    <Box sx={{ flexGrow: 1, mr: '40px', mt: '20px' }}>
      <AppBar position="static" sx={{ backgroundColor: '#eee', p: 2, borderRadius: 3 }} elevation={8}>
        <Toolbar variant="dense" sx={{ gap: 3 }}>
          <Button startIcon={<AddIcon />} variant={'outlined'} size='medium'
          onClick={openAddProductModlNav}>
            Add Product
          </Button>
          <Box>
            <FormControl sx={{mr: 2, minWidth: '140px'}}>
              <InputLabel id="sort-by">category</InputLabel>
              <Select
                labelId="sort-by"
                id="demo-simple-select"
                value={10}
                label="Age"
                size='small'
              // onChange={handleChange}
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{mr: 2, minWidth: '140px'}}>
              <InputLabel id="sort-by">price</InputLabel>
              <Select
                labelId="sort-by"
                id="demo-simple-select"
                value={10}
                label="Age"
                size='small'
              // onChange={handleChange}
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}