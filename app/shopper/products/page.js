"use client";
import ProductsView from '@/components/specific/shop/ProductsView';
import { Box, Typography, Modal, TextField, Button, Fade, CircularProgress, Tabs, Tab, Input, InputLabel } from '@mui/material'
import SaveIcon from '@mui/icons-material/Save';
import CheckIcon from '@mui/icons-material/Check';
import React from 'react'
import ProductManagementBar from '@/components/specific/shop/ProductManagementBar';
import CustomAlert from '@/components/common/Alert';
import { useSelector, useDispatch } from 'react-redux';
import { setAlert, setDisabledLoading } from '@/store/uiStateSlice/uiStateSlice';
import DisabledPageLoader from '@/components/common/Progress/DisabledPageLoader';
import { set } from 'mongoose';
import NotFound from '@/components/common/Erros/NotFound';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <>{children}</>
        </Box>
      )}
    </div>
  );
}
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const ManageProducts = () => {

  const [products, setProducts] = React.useState([]);
  const [productsToShow, setProductsToShow] = React.useState([]);
  const [openModal, setOpenModal] = React.useState(null);
  const handleClose = () => { setOpenModal(null); setEditedProduct({}) };
  const handleOpen = (index) => { setOpenModal(index); setEditedProduct(products[index]) };
  const [updateLoading, setUpdateLoading] = React.useState(false);
  const [editedProduct, setEditedProduct] = React.useState({});
  const [filterOption, setFilterOption] = React.useState('all');
  const [searchQuery, setSearchQuery] = React.useState('');

  const [addProductModal, setAddProductModal] = React.useState(null);
  const [tabPosition, setTabPosition] = React.useState(0);
  const handleAddProductModalClose = () => setAddProductModal(null);
  const handleAddProductModalOpen = () => setAddProductModal(true);
  const [notFound, setNotFound] = React.useState(false);
  const [newProduct, setNewProduct] = React.useState({
    name: '', price: '', stock: '', image: '', description: '', isFeatured: false, isOnSale: false, category: ''
  });
  const dispatch = useDispatch();

  const handlUpdateProductInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct({ ...editedProduct, [name]: value });
  }
  const handlNewProductInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  }
  const getProducts = async () => {
    dispatch(setDisabledLoading(true));
    const res = await fetch('/api/products/shopper', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'withCredentials': true
      }
    });
    const data = await res.json();
    console.log(data);
    dispatch(setDisabledLoading(false));
    if (!data.body.success) {
      dispatch(setAlert({ message: data.body.message, severity: 'error', open: true }));
      return setNotFound(true);
    } else setNotFound(false);
    if (data.body.products.length == 0) return setNotFound(true);
    setProducts(data.body.products);
    setProductsToShow(data.body.products);
  }
  const handleSaveUpdateToServer = async () => {
    dispatch(setDisabledLoading(true));
    const res = await fetch(`${process.env.NEXT_PUBLIC_CURRENT_DOMAIN}/api/products`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'withCredentials': true
      },
      body: JSON.stringify({ updateData: editedProduct, productId: editedProduct._id })
    });
    const data = await res.json();
    console.log(data);
    dispatch(setDisabledLoading(false));
    if (data.body.success) {
      handleClose();
      getProducts();
    }
    dispatch(setAlert({ message: data.body.message, severity: data.body.success ? "success" : "warning", open: true }));
  }
  const handleSaveNewToServer = async () => {
    dispatch(setDisabledLoading(true));
    console.log("newProduct: ", newProduct);
    console.log("current domain: ", process.env.NEXT_PUBLIC_CURRENT_DOMAIN);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_CURRENT_DOMAIN}/api/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'withCredentials': true
        },
        body: JSON.stringify({ ...newProduct })
      });
      const data = await res.json();
      console.log(data);
      dispatch(setDisabledLoading(false));
      if (data.body.success) {
        handleAddProductModalClose();
      }
      dispatch(setAlert({ message: "", }));
      getProducts();
    } catch (error) {
      dispatch(setDisabledLoading(false));
      console.log(error);
      dispatch(setAlert({ message: error.message, severity: 'error', open: true }));
    }
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
  const handleTabPositionChange = (e, newValue) => {
    setTabPosition(newValue);
  }
  const handleFileUpload = async (e) => {
    try {
      e.preventDefault();
      dispatch(setDisabledLoading(true));
      const file = e.target.files[0];
      if (!file) dispatch(setAlert({ message: "No file selected", severity: 'warning', open: true }));

      const formData = new FormData();
      formData.append('products', file, file.name);
      const requestOptions = {
        method: 'POST',
        headers: { 'withCredentials': true },
        body: formData,
      }
      console.log(data);
      const response = await fetch(`http://localhost:3000/api/products/json`, requestOptions);

      const responseData = await response.json();
      console.log(responseData);
      dispatch(setDisabledLoading(false));

      if (responseData.body.success) {
        dispatch(setAlert({ message: responseData.body.message, severity: 'success', open: true }));
        getProducts();
        return;
      }
      dispatch(setAlert({ message: responseData.body.message, severity: 'warning', open: true }));
    } catch (error) {
      dispatch(setAlert({ message: error.message, severity: 'error', open: true }));
      dispatch(setDisabledLoading(false));
      console.log(error);
    }
  }

  React.useEffect(() => {
    getProducts();
  }, []);


  return (
    <Box mt={5}>
      <CustomAlert />
      <DisabledPageLoader />
      <Box>
        <ProductManagementBar data={{
          handleSelectFilterOption,
          handleAddProductModalOpen,
          handleSearchWithCategory,
          filterOption,
        }} />
      </Box>
      <Box sx={{ mt: '40px', mr: '40px' }} >
        {notFound && <NotFound />}
        <ProductsView products={productsToShow} getProducts={getProducts} openModal={handleOpen} />
      </Box>

      <Modal
        open={openModal != null}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box>
          <Box sx={{
              position: 'absolute',
              top: '10%',
              left: '50%',
              rounded: 'lg',
              transform: 'translate(-50%, 0%)',
              width: 400,
              bgcolor: 'background.paper',
              boxShadow: 24,
              p: 2,
              borderRadius: '10px',
              maxHeight: "80vh",
              overflowY: 'auto',
              '&::-webkit-scrollbar': {
                width: '0.4em'
              },
              '&::-webkit-scrollbar-track': {
                backgroundColor: 'transparent'
              },
              '&::-webkit-scrollbar-thumb': {
                backgroundColor: 'primary.main'
              }
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
              label="Category"
              name="category"
              value={editedProduct.category || ''}
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
            <Button variant="contained"
              startIcon={updateLoading ? <CircularProgress color="inherit" sx={{
                transform: 'scale(0.5)',
              }} /> : <SaveIcon />} color="primary" onClick={handleSaveUpdateToServer}>
              Save Changes
            </Button>
          </Box>

        </Box>
      </Modal>

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
        <Fade in={addProductModal !== null}>
          <Box
            sx={{
              position: 'absolute',
              top: '10%',
              left: '50%',
              rounded: 'lg',
              transform: 'translate(-50%, 0%)',
              width: 400,
              bgcolor: 'background.paper',
              boxShadow: 24,
              p: 2,
              borderRadius: '10px',
              maxHeight: "80vh",
              overflowY: 'auto',
              '&::-webkit-scrollbar': {
                width: '0.4em'
              },
              '&::-webkit-scrollbar-track': {
                backgroundColor: 'transparent'
              },
              '&::-webkit-scrollbar-thumb': {
                backgroundColor: 'primary.main'
              }
            }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={tabPosition} onChange={handleTabPositionChange} aria-label="basic tabs example">
                <Tab label="Upload One" {...a11yProps(0)} />
                <Tab label="UPload Many" {...a11yProps(1)} />
              </Tabs>
            </Box>
            <CustomTabPanel value={tabPosition} index={0}>
              <Box sx={{
                p: 2,
              }}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Add Product
                </Typography>
                <TextField size='small'
                  label="Name"
                  name="name"
                  value={newProduct.name || ''}
                  onChange={handlNewProductInputChange}
                  fullWidth
                  margin="dense"
                />
                <TextField size='small'
                  label="Price"
                  name="price"
                  type="number"
                  value={newProduct.price || ''}
                  onChange={handlNewProductInputChange}
                  fullWidth
                  margin="dense"
                />
                <TextField size='small'
                  label="Stock"
                  name="stock"
                  type="number"
                  value={newProduct.stock || ''}
                  onChange={handlNewProductInputChange}
                  fullWidth
                  margin="dense"
                />
                <TextField size='small'
                  label="Image"
                  name="image"
                  type="text"
                  value={newProduct.image || ''}
                  onChange={handlNewProductInputChange}
                  fullWidth
                  margin="dense"
                />
                <TextField size='small'
                  label="Category"
                  name="category"
                  type="text"
                  value={newProduct.category || ''}
                  onChange={handlNewProductInputChange}
                  fullWidth
                  margin="dense"
                />
                <Button size='small' variant={newProduct.isFeatured ? 'contained' : 'text'} sx={{ mr: 2 }}
                  startIcon={newProduct.isFeatured && <CheckIcon />}
                  onClick={() => setNewProduct({ ...newProduct, isFeatured: !newProduct.isFeatured })}>
                  Featured
                </Button>
                <Button size='small' variant={newProduct.isOnSale ? 'contained' : 'text'} sx={{ mr: 2 }}
                  startIcon={newProduct.isOnSale && <CheckIcon />}
                  onClick={() => setNewProduct({ ...newProduct, isOnSale: !newProduct.isOnSale })}>
                  On Sale
                </Button>
                <TextField size='small'
                  id="outlined-multiline-flexible"
                  label="Description"
                  name='description'
                  multiline
                  fullWidth
                  maxRows={4}
                  value={newProduct.description || ''}
                  onChange={handlNewProductInputChange}
                  margin="dense"
                />
                <Button variant="contained"
                  startIcon={updateLoading
                    ? <CircularProgress color="inherit" />
                    : <SaveIcon />}
                  color="primary"
                  onClick={handleSaveNewToServer}>
                  Save Changes
                </Button>
              </Box>
            </CustomTabPanel>
            <CustomTabPanel value={tabPosition} index={1}>
              <Typography id="modal-modal-title" variant="h6" component="h2">Upload Json</Typography>
              <InputLabel htmlFor="json-file-upload">Upload JSON File</InputLabel>
              <Input
                type="file"
                accept=".json"
                onChange={handleFileUpload}
              />
            </CustomTabPanel>
          </Box>
        </Fade>
      </Modal>
    </Box>
  )
}

export default ManageProducts
