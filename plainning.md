Backend Tech
express typescript prisma postgresql cloudinary

Frontend Tech

next.js 14.2 react 18 typescript redux shadcn

Sudo Planning

Backend folder structure
Backend db connection
Backend schema
Backend Authentication
Backend other routes


Route Planning


User (1) PENDING
  <!-- get all (get)
  get single (get) -->
  update profile (patch)  <!--REMAINED -->
base url localhost:5002/api/v1
Auth (5) DONE
  login (post) (/auth/login)
  register(post) (/auth/register)
  change-password(post) (/auth/change-password)
  forgot-password (post) (/auth/forget-password)
  reset-password(post) (/auth/reset-password)

Admin (5) DONE
  Get user (/admin/users)(get)

  Get single user (/admin/users/:id)(get)

  Update user (/admin/users/:id)(patch) ({  "isDeleted": true, // or false  "isSuspended": true // or false })

  Delete user (/admin/users/:id)(delete)

  Blacklist vendor shop (/admin/vendor/:vendorId/blacklist)(patch){  "isBlacklisted": true/ false}

Category (5) DONE
  Get all categories (/admin/categories)(get)

  Get single category (/admin/categories/:id)(get)

  Create a category(/admin/categories)(post) {  "name": "Electronics",  "description": "Category description" }

  Update a category(/admin/categories/:id)(patch) {  "name": "Updated Name",  "description": "Updated Description" }

  Delete a category(/admin/categories/:id)(delete)

 

Shop (2) DONE
  create a shop (/shop)(post){  "name": "Vendor Shop",  "description": "Shop Description" }
  get a shop data(/shop) (get)

Product (5) DONE
  Create a product (/products)(post) {  "name": "Smartphone",  "description": "Durable and sleek smartphone case compatible with all major brands.",  "price": 19.99,  "discount": 10,  "categoryId": "8835fd34-bc22-44f6-a13a-d7f1c2eb6507",  "inventory": 200 }
  
  Duplicate a product (/products/duplicate/:productId) (post)
  
  Update a product (/products/:productId)(patch){  "name": "Updated Product Name",  "price": 150.0,   "inventory": 100}

  Get all products (/products)(get)
  
  Get a products (/products/:productId)(get)

Order (2) DONE

/orders	POST Customer	Create an order.

/orders/ Customer	GET	View their own order history. Vendor orders related to their shop. Admin	View all orders with advanced filtering.

Payment (3) DONE

POST /create-payment-intent to create a payment intent.
POST /payment-confirm save payment information.
get all transactions (/payment)(get)

Flash Sale (4) DONE
  Create a flash sale (/flash-sale/)(post) {  "productId": "2f7a8bf8-9aad-4b09-83fa-fba1b1c45cab", "discount": 15,  "startTime": "2024-12-05T00:00:00Z",  "endTime": "2024-12-10T00:00:00Z"}

  Get all flash sale (/flash-sale/)(get)

  Get a flash sale (/flash-sale/:id)(get)

  Update a flash sale (/flash-sale/:id)(patch) { "discount": 15,  "startTime": "2024-12-05T00:00:00Z",  "endTime": "2024-12-10T00:00:00Z"}


Reviews (2) DONE

<!-- get all reviews (/reviews)(get) for admin -->
get review for vendor (/reviews/) for vendor admin
<!-- get single review (/reviews/:reviewId) -->
leave review (/reviews/)(post){  "productId": "productId",  "rating": 5,  "comment": "Great product!" }

Follows (3) DONE
  
  get followers (/follows/)
  follow vendor (/follows)(post){  "vendorId": "vendorId"}
  unfollow vendor (/follows)(delete)
 
OUT OF 37 ROUTES 36 DONE

  
  <!-- recent products (/recent-products)(get) WILL DEAL AT THE FRONTEND-->
  <!-- compare products (/products/compare)(post){  "productIds": ["productId1", "productId2", "productId3"]} WILL DEAL AT THE FRONTEND-->

Frontend folder structure
Color theme use
Frontend route 
Frontend component group
Frontend shared component
Pages develop and integration with be

Tech
Next.js, Typescript, Tailwind, Shadcn, Redux, RTK Query, Stripe, Zod, React Hook Form

Folder structure
  root/
├── public/
│   ├── images/               # Static images
│   ├── favicon.ico           # Favicon
│   └── ...                   # Other static assets
├── src/
│   ├── app/                  # App Router (Next.js 13+)
│   │   ├── layout.tsx        # Main layout
│   │   ├── page.tsx          # Homepage
│   │   ├── cart/
│   │   │   ├── page.tsx      # Cart page
│   │   │   └── ...           
│   │   ├── product/
│   │   │   ├── [id]/         # Dynamic product details page
│   │   │   │   ├── page.tsx  
│   │   │   └── compare/      # Product comparison page
│   │   │       ├── page.tsx  
│   │   ├── vendor/
│   │   │   ├── dashboard/    # Vendor dashboard
│   │   │   │   ├── page.tsx  
│   │   │   └── [shopId]/     # Vendor shop page
│   │   │       ├── page.tsx  
│   │   ├── admin/
│   │   │   ├── dashboard/    # Admin dashboard
│   │   │   │   ├── page.tsx  
│   │   │   ├── users/        # Manage users
│   │   │   │   ├── page.tsx  
│   │   │   └── categories/   # Manage categories
│   │   │       ├── page.tsx  
│   │   ├── auth/
│   │   │   ├── login/        # Login page
│   │   │   │   ├── page.tsx  
│   │   │   ├── signup/       # Signup page
│   │   │   │   ├── page.tsx  
│   │   │   └── reset/        # Reset password
│   │   │       ├── page.tsx  
│   │   ├── profile/
│   │   │   ├── page.tsx      # User profile page
│   │   └── ...               # Other pages
│   ├── components/           # Reusable components
│   │   ├── ui/               # Shadcn UI components
│   │   ├── navbar.tsx        # Navbar component
│   │   ├── footer.tsx        # Footer component
│   │   ├── card.tsx          # Product card
│   │   ├── button.tsx        # Button component
│   │   └── ...
│   ├── features/             # Feature-specific logic and components
│   │   ├── cart/             # Cart logic
│   │   │   ├── cartSlice.ts  # Redux slice for cart
│   │   │   ├── cartUtils.ts  # Cart utilities
│   │   │   └── ...           
│   │   ├── auth/             # Authentication logic
│   │   │   ├── authSlice.ts  # Redux slice for auth
│   │   │   ├── authUtils.ts  # Auth utilities
│   │   │   └── ...
│   │   └── ...
│   ├── hooks/                # Custom React hooks
│   │   ├── useAuth.ts        # Auth-related hooks
│   │   ├── useCart.ts        # Cart-related hooks
│   │   └── ...
│   ├── lib/                  # Utilities and libraries
│   │   ├── api.ts            # API client
│   │   ├── prisma.ts         # Prisma client
│   │   ├── constants.ts      # Project constants
│   │   └── ...
│   ├── redux/                # Redux store setup
│   │   ├── store.ts          # Store configuration
│   │   ├── slices/           # Redux slices
│   │   │   ├── cartSlice.ts  # Cart slice
│   │   │   ├── authSlice.ts  # Auth slice
│   │   │   └── ...
│   ├── styles/               # Global and component styles
│   │   ├── globals.css       # Global CSS
│   │   ├── tailwind.css      # Tailwind imports
│   │   ├── variables.css     # CSS variables
│   │   └── ...
│   ├── types/                # TypeScript types
│   │   ├── auth.d.ts         # Auth-related types
│   │   ├── product.d.ts      # Product-related types
│   │   └── ...
│   └── utils/                # Helper functions
│       ├── formatDate.ts     # Date formatting utilities
│       ├── validateForm.ts   # Form validation
│       └── ...
├── prisma/                   # Prisma schema and migrations
│   ├── schema.prisma         # Prisma schema
│   └── ...
├── .env                      # Environment variables
├── tailwind.config.ts        # Tailwind configuration
├── tsconfig.json             # TypeScript configuration
├── package.json              # Node dependencies
├── README.md                 # Project documentation
└── ...

Folder Structure Adjustments
Add a middleware folder for Next.js middleware to handle:

Authentication.
Role-based access control.
Add a services folder in src/ for reusable logic to call APIs (e.g., authService.ts, productService.ts).

Add a constants file in lib/ for:

API endpoints.
Static texts and reusable strings.

Redux store and rtk query Setup
dark mode setup
Theme set up


1. Authentication Pages
Signup Page
Role selection (User or Vendor).
Redirect vendors to the dashboard after registration.
Login Page
Secure login with JWT authentication.
Forgot Password Page
Enter email to reset password.
Reset Password Page
Reset the password using the token sent via email.
Change Password Page
Allow logged-in users to change their password.
2. Home Page
Display all products from vendors with:
Infinite scrolling.
Filtering and searching functionality.
Categories list with redirect and auto-filtering functionality.
Flash sales section and link to flash sales page.
Scroll-to-top button.
3. Product Pages
Product Details Page

Product details (name, price, category, images, description).
Related products section.
Customer reviews and ratings.
Link to the vendor’s shop.
Product Comparison Page

Compare up to three products from the same category.
4. Shop Pages
Vendor Shop Page
Vendor details (name, logo, description).
List of products from the vendor.
Option for customers to follow/unfollow.
Follower count.
5. User-Specific Pages
Cart Page

Display selected products with a warning for multi-vendor cart additions.
Total cost calculation.
Replace or retain cart options for multi-vendor warnings.
Checkout Page

Product summary with pricing.
Apply coupon codes.
Payment integration with Aamarpay or Stripe.
Order History Page

Display user purchase history with product and order details.
Recent Products Page

Show the last 10 viewed products with links to their details.
6. Vendor Dashboard Pages
Dashboard Overview

Shop information management (name, logo, description).
Sales overview and summary.
Product Management Page

Add, edit, duplicate, or delete products.
Inventory management (update quantities).
Paginated product list.
Order History Page

List of all orders placed for their shop (paginated).
Customer Reviews Page

View and respond to customer reviews.
7. Admin-Specific Pages
Admin Dashboard

Overview of platform activity and statistics.
Manage users (suspend/delete accounts).
Manage vendor shops (blacklist).
Category Management Page

Add, edit, delete product categories.
Transactions Monitoring Page

Review transaction history and activities.
8. Flash Sales Page
List all flash sale products with filtering and searching.
9. Miscellaneous Pages
Error Pages
404 Page Not Found.
500 Internal Server Error.


Page	Rendering Strategy	Reason
Authentication Pages	CSR	User-specific, no SEO needs.
Home Page	SSR (with ISR)	SEO and performance-critical; frequently accessed.
Product Details Page	SSR	SEO-important; metadata for product descriptions.
Product Comparison Page	CSR	Highly interactive and user-specific.
Vendor Shop Page	SSR	Vendor-specific SEO benefits.
Cart Page	CSR	User-specific and no SEO.
Checkout Page	CSR	Sensitive and interactive; no SEO.
Order History Page	CSR	User-specific; no SEO.
Recent Products Page	CSR	User-specific; no SEO.
Vendor Dashboard	CSR	Vendor-specific, highly interactive.
Admin Dashboard	CSR	Admin-only, no SEO.
Flash Sales Page	SSR (with ISR)	SEO-critical; time-sensitive content.
404 Page	SSR or Static	Immediate feedback required.
500 Page	SSR or Static	Immediate feedback required.


 Additional Considerations
Search Functionality Enhancements

Add support for autocomplete suggestions while searching.
Highlight matching terms in search results.
Wishlist Feature

Allow users to save products to a wishlist for later viewing.
Integrate this feature into user-specific pages.
Notification System

Include notifications for:
Order updates (e.g., order shipped, delivered).
Flash sale announcements.
Vendor updates (for followers).
Use a library like react-toastify for toast notifications.
Review Moderation (Admin)

Allow administrators to view and remove inappropriate product reviews.
Vendor Analytics (Dashboard)

Provide insights such as:
Best-selling products.
Monthly revenue.
Most viewed products.
Use a chart library like Chart.js or Recharts.
User Preferences

Allow users to configure preferences (e.g., dark mode toggle, email notifications).
Save preferences in a database or browser storage.
Internationalisation (Optional)

Use next-i18next for multi-language support if the application will serve users from different regions.
Advanced Product Filtering

Include filters for attributes like:
Ratings.
Stock availability.
Vendor-specific filtering.
Multi-Step Checkout

Break checkout into steps:
Delivery address.
Payment details.
Review and confirm.
Provide a progress indicator.
Security Enhancements

Use rate-limiting to prevent brute-force attacks.
Secure sensitive pages with server-side authentication (Next.js middleware).
Validate all user inputs with Zod.
Mobile Optimisation

Ensure the design and functionality are fully responsive.
Include swipe gestures for carousel and navigation on mobile.
Accessibility

Test and improve accessibility (e.g., ARIA roles, keyboard navigation).
Dynamic Flash Sale Timer

Add a countdown timer for flash sale products.
Order Cancellation and Refunds

Allow users to cancel orders before shipping.
Notify vendors/admins for refunds when applicable.
Chat/Support System

Include a real-time chat system for:
Customer support.
Vendor-customer communication.
Use libraries like Socket.io for real-time updates.
Audit Logs (Admin)

Track user and vendor actions:
Product additions/deletions.
Order modifications.
Suspensions or blacklisting.
API Documentation

Generate API documentation for developers using a tool like Swagger.
Deployment

Plan deployment:
Use Vercel for the frontend.
Use Render or Railway for the backend.
Ensure CDN support for static files.
Comprehensive Testing

Write tests for:
UI (using React Testing Library).
API (using Jest or Supertest).
End-to-End workflows (using Playwright or Cypress).
Code Quality

Add a pre-commit hook for linting and formatting (using Husky and lint-staged).
Ensure TypeScript types are strictly followed.











  