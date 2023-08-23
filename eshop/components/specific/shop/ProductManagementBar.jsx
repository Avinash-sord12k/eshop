"use client";
import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import MenuIcon from '@mui/icons-material/Menu';
import { Button, MenuItem, TextField } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import SearchIcon from '@mui/icons-material/Search';
import Select from '@mui/material/Select';

export default function ProductManagementBar({ data }) {
  const {
    handleAddProductModalOpen,
    handleSearchWithCategory,
    filterOption,
    handleSelectFilterOption
  } = data;
  return (
    <Box sx={{ flexGrow: 1, mr: '40px', mt: '20px' }}>
      <AppBar position="static" sx={{ backgroundColor: '#f5f5f5', p: 2, borderRadius: 2 }} elevation={0}>
        <Toolbar variant="dense" sx={{ display: 'flex', justifyContent: 'space-between', gap: 3 }}>
          <Typography variant="h5" fontWeight="bold" color="#333">Manage Products</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Button
              startIcon={<AddIcon />}
              variant="outlined"
              size="medium"
              onClick={handleAddProductModalOpen}
            >
              Add Product
            </Button>
            <FormControl sx={{ minWidth: '140px' }}>
              <InputLabel id="category-select" sx={{ backgroundColor: '#f1f1f1', borderRadius: 2 }}>select filter</InputLabel>
              <Select
                labelId="category-select"
                id="category-select"
                value={filterOption}
                onChange={handleSelectFilterOption}
                label="Price"
                size="small"
              >
                <MenuItem value={'all'}>all</MenuItem>
                <MenuItem value={'name'}>name</MenuItem>
                <MenuItem value={'category'}>category</MenuItem>
                <MenuItem value={'price less than'}>price less than</MenuItem>
                <MenuItem value={'price more than'}>price more than</MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{ minWidth: '200px' }}>
              <TextField
                size='small'
                id="search-by-category"
                label="Search by category"
                variant="outlined"
                onChange={handleSearchWithCategory}
                InputProps={{
                  endAdornment: (
                    <IconButton>
                      <SearchIcon />
                    </IconButton>
                  ),
                }}
              />
            </FormControl>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
