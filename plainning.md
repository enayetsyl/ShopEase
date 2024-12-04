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
  Get user (/admin/users)(get)

  Get single user (/admin/users/:id)(get)

  Update user (/admin/users/:id)(patch) ({  "isDeleted": true, // or false  "isSuspended": true // or false })

  Delete user (/admin/users/:id)(delete)

  Blacklist vendor (/admin/vendor/:vendorId/blacklist)(patch){  "isBlacklisted": true/ false}

Category (5)
  Get all categories (/admin/categories)(get)

  Get single category (/admin/categories/:id)(get)

  Create a category(/admin/categories)(post) {  "name": "Electronics",  "description": "Category description" }

  Update a category(/admin/categories/:id)(patch) {  "name": "Updated Name",  "description": "Updated Description" }

  Delete a category(/admin/categories/:id)(delete)

Monitor (2)
  get all transactions (/admin/transactions)(get)
  get all reviews (/admin/reviews)(get)

Shop (2)
  create a shop (/shop)(post){  "name": "Vendor Shop",  "description": "Shop Description" }
  get a shop data(/shop) (get)

Product (5)
  Create a product (/products)(post) {  "name": "Smartphone",  "description": "Durable and sleek smartphone case compatible with all major brands.",  "price": 19.99,  "discount": 10,  "categoryId": "8835fd34-bc22-44f6-a13a-d7f1c2eb6507",  "inventory": 200 }
  
  Duplicate a product (/products/duplicate/:productId) (post)
  
  Update a product (/products/:productId)(patch){  "name": "Updated Product Name",  "price": 150.0,   "inventory": 100}

  Get all products (/products)(get)
  
  Get a products (/products/:productId)(get)

Order

Customer	/orders	POST	Create an order.
Customer	/orders/customer	GET	View their own order history.
Vendor	/orders/vendor	GET	View orders related to their shop.
Admin	/admin/orders	GET	View all orders with advanced filtering.

Payment (4)

POST /create-payment-intent to create a payment intent.
POST /payment-confirm save payment information.
GET /payments/:paymentId

Considerations for Scalability
Asynchronous Processing: Use queues to handle post-payment tasks like inventory deduction and email notifications.
Database Transactions: Wrap the order creation and inventory update in a transaction to ensure atomicity.
Audit Logs: Maintain logs for each payment attempt for debugging and reconciliation.



Vendor (9)
  
  view orders (/vendor/orders)(get)
  get customer review (/vendor/:productId)(get)
  get followers (/vendor/:vendorId/followers)
  respond to review(/vendor/reviews/:id/respond)(post){  "response": "Thank you for your feedback!"}

Customer (8)
  checkout (/checkout)(post){  "cartItems": [    { "productId": "productId1", "quantity": 1 },    { "productId": "productId2", "quantity": 3 }  ],  "couponCode": "DISCOUNT10"}
  leave review (/reviews)(post){  "productId": "productId",  "rating": 5,  "comment": "Great product!" }
  follow vendor (/follows)(post){  "vendorId": "vendorId"}
  unfollow vendor (/follows/:id)(delete)
  recent products (/recent-products)(get)
  order history(/orders)(get)

Flash Sale (4)
  Create a flash sale (/flash-sale/)(post) {  "productId": "2f7a8bf8-9aad-4b09-83fa-fba1b1c45cab", "discount": 15,  "startTime": "2024-12-05T00:00:00Z",  "endTime": "2024-12-10T00:00:00Z"}

  Get all flash sale (/flash-sale/)(get)

  Get a flash sale (/flash-sale/:id)(get)

  Update a flash sale (/flash-sale/:id)(patch) { "discount": 15,  "startTime": "2024-12-05T00:00:00Z",  "endTime": "2024-12-10T00:00:00Z"}


Other (3)
  compare products (/products/compare)(post){  "productIds": ["productId1", "productId2", "productId3"]}

  initiate payment (/payment)(post) {  "amount": 200.0,  "currency": "USD",  "paymentMethod": "stripe",  "orderId": "orderId"}
  verify payment(/payment/verify)(post) {  "paymentId": "paymentId",  "orderId": "orderId"}











  