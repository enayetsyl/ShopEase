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


Frontend folder structure
Color theme use
Frontend route 
Frontend component group
Frontend shared component
Pages develop and integration with be

Route Planning

User (1)
  <!-- get all (get)
  get single (get) -->
  update profile (patch)

Auth (5)
  login (post)
  register(post)
  change-password(post)
  forgot-password (post)
  reset-password(post)

Admin (5)
  get user (/admin/users)(get)
  get single user (/admin/users/:id)(get)
  update user (/admin/users/:id)(patch) ({  "isDeleted": true, // or false  "isSuspended": true // or false })
  delete user (/admin/users/:id)(delete)
  blacklist vendor (/admin/vendor/:vendorId/blacklist)(patch){  "isBlacklisted": true/ false}

Category (5)
  get all categories (/admin/categories)(get)
  get single category (/admin/categories/:id)(get)
  create a category(/admin/categories)(post) {  "name": "Electronics",  "description": "Category description" }
  update a category(/admin/categories/:id)(patch) {  "name": "Updated Name",  "description": "Updated Description" }
  delete a category(/admin/categories/:id)(delete)

Monitor (2)
  get all transactions (/admin/transactions)(get)
  get all reviews (/admin/reviews)(get)

Vendor (9)
  create a shop (/vendor/shop)(post){  "name": "Vendor Shop",  "description": "Shop Description",   "logo": "logo_url" }
  get shop data(/vendor/shop/:vendorId)
  add a product (/vendor/products)(post) {  "name": "Product Name",  "description": "Detailed description of the product",  "price": 100.0,  "inventory": 50,  "categoryId": "categoryId",  "image": ["image_url"],  "discount": 10}
  duplicate a product (/vendor/products/:productId/duplicate) (post) {  "name": "Product Name",  "description": "Detailed description of the product",  "price": 100.0,  "inventory": 50,  "categoryId": "categoryId",  "image": ["image_url"],  "discount": 10}
  edit a product (/vendor/products/:id)(patch){  "name": "Updated Product Name",  "price": 150.0,   "inventory": 100,  "image": ["updated_image_url"]}
  view orders (/vendor/orders)(get)
  get customer review (/vendor/:productId)(get)
  get followers (/vendor/:vendorId/followers)
  respond to review(/vendor/reviews/:id/respond)(post){  "response": "Thank you for your feedback!"}

Customer (8)
  browse product (/products)(get)
  view product details(/products/:id)(get)
  checkout (/checkout)(post){  "cartItems": [    { "productId": "productId1", "quantity": 1 },    { "productId": "productId2", "quantity": 3 }  ],  "couponCode": "DISCOUNT10"}
  leave review (/reviews)(post){  "productId": "productId",  "rating": 5,  "comment": "Great product!" }
  follow vendor (/follows)(post){  "vendorId": "vendorId"}
  unfollow vendor (/follows/:id)(delete)
  recent products (/recent-products)(get)
  order history(/orders)(get)

Other (4)
  flash sale (/flash-sale)(get)
  compare products (/products/compare)(post){  "productIds": ["productId1", "productId2", "productId3"]}
  initiate payment (/payment)(post) {  "amount": 200.0,  "currency": "USD",  "paymentMethod": "stripe",  "orderId": "orderId"}
  verify payment(/payment/verify)(post) {  "paymentId": "paymentId",  "orderId": "orderId"}











  