"use client"
import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

export default function ProductManagementBar({ data }) {
  const {
    handleAddProductModalOpen,
    handleSearchWithCategory,
    filterOption,
    handleSelectFilterOption
  } = data;

  return (
    <AppBar position="static" sx={{ backgroundColor: '#f5f5f5', borderRadius: 2 }} elevation={0}>
      <Typography variant="h5" fontWeight="bold" color="#333">Manage Products</Typography>
      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        gap: 3,
        
        ['@media (max-width: 762px)']: {
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: 4,
          marginTop: 2,
        }
      }}>
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
        }}>
          <Button
            startIcon={<AddIcon />}
            variant="outlined"
            size="medium"
            onClick={handleAddProductModalOpen}
            pl={0}
          >
            Add Product
          </Button>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <FormControl sx={{ minWidth: '140px' }}>
            <InputLabel id="category-select" sx={{ backgroundColor: '#f1f1f1', borderRadius: 2 }}>Select Filter</InputLabel>
            <Select
              labelId="category-select"
              id="category-select"
              value={filterOption}
              onChange={handleSelectFilterOption}
              label="Select Filter"
              size="small"
            >
              <MenuItem value={'all'}>All</MenuItem>
              <MenuItem value={'name'}>Name</MenuItem>
              <MenuItem value={'category'}>Category</MenuItem>
              <MenuItem value={'price less than'}>Price Less Than</MenuItem>
              <MenuItem value={'price more than'}>Price More Than</MenuItem>
            </Select>
          </FormControl>
          <TextField
            size='small'
            id="search-by-category"
            label="Search by Category"
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
        </Box>
      </Box>
    </AppBar>
  );
}
