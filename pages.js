
const pages = [
  {
    title: 'Products',
    description: 'Explore our wide range of high-quality products.',
    href: '/products',
    rolesPermitted: ['shopper', 'user', 'admin'],
  },
  {
    title: 'Dashboard',
    description: 'Access your administrative dashboard.',
    href: '/dashboard',
    rolesPermitted: ['admin'],
  }
];

const Categories = [
  {
    title: 'Electronics',
    description: 'Explore our wide range of high-quality products.',
    href: '/products/electronics',
  },
  {
    title: 'Clothing',
    description: 'Explore our wide range of high-quality products.',
    href: '/products/clothing',
  },
  {
    title: 'Furniture',
    description: 'Explore our wide range of high-quality products.',
    href: '/products/furniture',
  },
  {
    title: 'Books',
    description: 'Explore our wide range of high-quality products.',
    href: '/products/books',
  },
  {
    title: 'Sports',
    description: 'Explore our wide range of high-quality products.',
    href: '/products/sports',
  },
  {
    title: 'Toys',
    description: 'Explore our wide range of high-quality products.',
    href: '/products/toys',
  },
  {
    title: 'Food',
    description: 'Explore our wide range of high-quality products.',
    href: '/products/food',
  },
  {
    title: 'Health',
    description: 'Explore our wide range of high-quality products.',
    href: '/products/health',
  },
  {
    title: 'Beauty',
    description: 'Explore our wide range of high-quality products.',
    href: '/products/beauty',
  },
  {
    title: 'Jewelry',
    description: 'Explore our wide range of high-quality products.',
    href: '/products/jewelry',
  },
  {
    title: 'Automotive',
    description: 'Explore our wide range of high-quality products.',
    href: '/products/automotive',
  },
  {
    title: 'Garden',
    description: 'Explore our wide range of high-quality products.',
    href: '/products/garden',
  },
  {
    title: 'Pet',
    description: 'Explore our wide range of high-quality products.',
    href: '/products/pet',
  },
  {
    title: 'Baby',
    description: 'Explore our wide range of high-quality products.',
    href: '/products/baby',
  },
  {
    title: 'Tools',
    description: 'Explore our wide range of high-quality products.',
    href: '/products/tools',
  },
  {
    title: 'Office',
    description: 'Explore our wide range of high-quality products.',
    href: '/products/office',
  },
  {
    title: 'Movies',
    description: 'Explore our wide range of high-quality products.',
    href: '/products/movies',
  },
]

const userSpecificPages = [
  {
    title: 'Wishlist',
    description: 'Curate your desired items for a personalized shopping experience.',
    href: '/wishlist',
    permissions: [{resource: "wishlist", action: ["read"]}],
  },
  {
    title: 'Cart',
    description: 'Efficiently manage your shopping cart for seamless purchases.',
    href: '/cart',
    permissions: [{resource: "cart", action: ["read"]}],
  },
  {
    title: 'Orders',
    description: 'Track and manage your orders for a hassle-free experience.',
    href: '/orders',
    permissions: [{resource: "orders", action: ["read"]}],
  },
  {
    title: 'Reviews',
    description: 'View and manage your reviews for a personalized experience.',
    href: '/reviews',
    permissions: [{resource: "reviews", action: ["read"]}],
  },
  {
    title: 'Shop',
    description: 'View and manage your shop for a personalized experience.',
    href: '/shop',
    permissions: [{resource: "shop", action: ["read"]}],
  },
];

const settings = [
  {
    title: 'Profile',
    description: 'Manage and personalize your profile information.',
    href: '/profile',
    permissions: [],
  },
  {
    title: 'Account',
    description: 'View and update your account settings.',
    href: '/account',
    permissions: [],
  },
  {
    title: 'Dashboard',
    description: 'Access your administrative dashboard.',
    href: '/dashboard',
    permissions: [],
  },
  {
    title: 'Logout',
    description: 'Logout from your account.',
    href: '/logout',
    permissions: [],
  },
];
