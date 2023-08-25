"use client";

import ProductsView from '@/components/specific/shop/ProductsView';
import { Box, Grid, Typography, Modal, TextField, Button, Fade, Checkbox, CircularProgress } from '@mui/material'
import SaveIcon from '@mui/icons-material/Save';
import LoopIcon from '@mui/icons-material/Loop';
import CheckIcon from '@mui/icons-material/Check';
import React from 'react'
import ProductManagementBar from '@/components/specific/shop/ProductManagementBar';



const ManageProducts = () => {

  const [products, setProducts] = React.useState([]);
  const [productsToShow, setProductsToShow] = React.useState([]);
  const [openModal, setOpenModal] = React.useState(null);
  const handleClose = () => { setOpenModal(null); setEditedProduct({}) };
  const handleOpen = (index) => { setOpenModal(index); setEditedProduct(products[index]) };
  const [updateAlert, setUpdateAlert] = React.useState('');
  const [updateLoading, setUpdateLoading] = React.useState(false);
  const [editedProduct, setEditedProduct] = React.useState({});
  const [filterOption, setFilterOption] = React.useState('all');
  const [searchQuery, setSearchQuery] = React.useState('');
  const [addProductModal, setAddProductModal] = React.useState(null);
  const handleAddProductModalClose = () => setAddProductModal(null);
  const handleAddProductModalOpen = () => setAddProductModal(true);
  const [newProduct, setNewProduct] = React.useState({
    name: '', price: '', stock: '', image: '', description: '', isFeatured: false, isOnSale: false, category: ''
  });
  const handlUpdateProductInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct({ ...editedProduct, [name]: value });
  }
  const handlNewProductInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  }
  const getProducts = async () => {
    const res = await fetch('/api/products/shopper', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'withCredentials': true
      }
    });
    const data = await res.json();
    console.log(data);
    setProducts(data.body.products);
    setProductsToShow(data.body.products);
  }
  const handleSaveUpdateToServer = async () => {
    setUpdateLoading(true);
    const res = await fetch(`api/products`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'withCredentials': true
      },
      body: JSON.stringify({ updateData: editedProduct, productId: editedProduct._id })
    });
    const data = await res.json();
    console.log(data);
    if (data.body.success) {
      handleClose();
      setUpdateLoading(false);
      getProducts();
    }
    setUpdateAlert(data.body.message);
  }
  const handleSaveNewToServer = async () => {
    setUpdateLoading(true);
    const res = await fetch(`api/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'withCredentials': true
      },
      body: JSON.stringify({ ...newProduct })
    });
    const data = await res.json();
    console.log(data);
    if (data.body.success) {
      handleAddProductModalClose();
      setUpdateLoading(false);
    }
    setUpdateAlert(data.body.message);
    getProducts();
  }
  const handleSearch = (searchQuery, filterOption) => {
    console.log("searched: ", searchQuery, filterOption);
    switch (filterOption) {
      case 'all':
        return setProductsToShow(products);
      case 'name':
        const filteredProductsByName = products.filter(product => product.name.toLowerCase().includes(searchQuery.toLowerCase()));
        return setProductsToShow(filteredProductsByName);
      case 'price less than':
        const filteredProductsByPrice = products.filter(product => (!isNaN(parseInt(searchQuery)) && (product.price <= searchQuery)));
        return setProductsToShow(filteredProductsByPrice);
      case 'price greater than':
        const filteredProductsByPrice2 = products.filter(product => (!isNaN(parseInt(searchQuery)) && (product.price >= searchQuery)));
        return setProductsToShow(filteredProductsByPrice2);
      case 'category':
        const filteredProducts = products.filter(product => product.category.includes(searchQuery));
        return setProductsToShow(filteredProducts);
      default:
        return setProductsToShow(products);
    }
  }
  const handleSearchWithCategory = (e) => {
    const { value: query } = e.target;
    setSearchQuery(query);
    handleSearch(query, filterOption);
    console.log(products, productsToShow, query);
  }
  const handleSelectFilterOption = (e) => {
    const { value: option } = e.target;
    setFilterOption(option);
    console.log(option, filterOption);
    handleSearch(searchQuery, option);
  }
  React.useEffect(() => {
    getProducts();
  }, []);


  return (
    <Box mt={5}>
      <Box>
        <ProductManagementBar data={{
          handleSelectFilterOption,
          handleAddProductModalOpen,
          handleSearchWithCategory,
          filterOption,
        }} />
      </Box>
      <Box sx={{ mt: '40px', mr: '40px' }} >
        <ProductsView products={productsToShow} getProducts={getProducts} openModal={handleOpen} />
      </Box>
      <Modal
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
        open={addProductModal != null}
        onClose={handleAddProductModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Fade in={addProductModal}>
          <Box sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            rounded: 'lg',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
          }}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Add Product
            </Typography>
            <TextField
              label="Name"
              name="name"
              value={newProduct.name || ''}
              onChange={handlNewProductInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Price"
              name="price"
              type="number"
              value={newProduct.price || ''}
              onChange={handlNewProductInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Stock"
              name="stock"
              type="number"
              value={newProduct.stock || ''}
              onChange={handlNewProductInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Image"
              name="image"
              type="text"
              value={newProduct.image || ''}
              onChange={handlNewProductInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Category"
              name="category"
              type="text"
              value={newProduct.category || ''}
              onChange={handlNewProductInputChange}
              fullWidth
              margin="normal"
            />
            <Button variant={newProduct.isFeatured ? 'contained' : 'text'} sx={{ mr: 2 }}
              startIcon={newProduct.isFeatured && <CheckIcon />}
              onClick={() => setNewProduct({ ...newProduct, isFeatured: !newProduct.isFeatured })}>
              Featured
            </Button>
            <Button variant={newProduct.isOnSale ? 'contained' : 'text'} sx={{ mr: 2 }}
              startIcon={newProduct.isOnSale && <CheckIcon />}
              onClick={() => setNewProduct({ ...newProduct, isOnSale: !newProduct.isOnSale })}>
              On Sale
            </Button>
            <TextField
              id="outlined-multiline-flexible"
              label="Description"
              name='description'
              multiline
              fullWidth
              maxRows={4}
              value={newProduct.description || ''}
              onChange={handlNewProductInputChange}
              margin="normal"
            />
            {/* Add more fields for other product details */}
            <Button variant="contained"
              startIcon={updateLoading
                ? <CircularProgress color="inherit" />
                : <SaveIcon />}
              color="primary"
              onClick={handleSaveNewToServer}>
              Save Changes
            </Button>
          </Box>
        </Fade>

      </Modal>
      <Modal
        open={openModal != null}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          rounded: 'lg',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
        }}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Edit Product
          </Typography>
          <TextField
            label="Name"
            name="name"
            value={editedProduct.name || ''}
            onChange={handlUpdateProductInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Price"
            name="price"
            type="number"
            value={editedProduct.price || ''}
            onChange={handlUpdateProductInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Stock"
            name="stock"
            type="number"
            value={editedProduct.stock || ''}
            onChange={handlUpdateProductInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Image"
            name="image"
            type="text"
            value={editedProduct.image || ''}
            onChange={handlUpdateProductInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            id="outlined-multiline-flexible"
            label="Description"
            name='description'
            multiline
            fullWidth
            maxRows={4}
            value={editedProduct.description || ''}
            onChange={handlUpdateProductInputChange}
            margin="normal"
          />
          {/* Add more fields for other product details */}
          <Button variant="contained"
            startIcon={updateLoading ? <CircularProgress color="inherit" sx={{
              transform: 'scale(0.5)',
            }} /> : <SaveIcon />} color="primary" onClick={handleSaveUpdateToServer}>
            Save Changes
          </Button>
        </Box>

      </Modal>
    </Box>
  )
}

export default ManageProducts
