## Assignment 9: E-Commerce Application

**The E-Commerce Application is designed to provide a complete online shopping experience for users, vendors, and administrators. It serves as a platform where users can browse and purchase products, vendors can manage their shops and inventories, and administrators can control and monitor the entire system. The application focuses on being intuitive, responsive, and secure, providing a seamless experience for all user roles.**
**The core of this project is to build a scalable, high-performance system using modern web development technologies. It leverages Node.js and Express.js for the backend, React.js (or Next.js) for the front end, and PostgreSQL for data storage. The application integrates with third-party services for payments and file storage, ensuring a professional, enterprise-grade solution**.

---

### **Roles and Responsibilities**

1. **Admin**
   - Full control over the platform, including monitoring and moderation.
   - Manage users (vendors and customers) with the ability to suspend or delete accounts.
   - Blacklist vendor shops to restrict their operations.
   - Dynamically manage product categories (add, edit, delete categories).
   - Monitor transactions and review activities across the platform.
2. **Vendor**
   - Create and manage their shop (name, logo, description, etc.).
   - View customer reviews and ratings.
   - View order history specific to their shop.
3. **User (Customer)**
   - Browse products across all vendor shops from the home page.
   - Use advanced filtering and searching (price range, category, etc.) for convenience.
   - Add products to the cart from either the homepage or individual shop pages.
   - Purchase products and apply coupon codes during checkout for discounts.
   - Compare up to three products at a time based on their attributes.
   - Leave reviews and ratings for purchased products. _(Only after purchase)._
   - Access order history to view past purchases.
   - Follow specific vendor shops to prioritize their products in the listing.
   - View a "Recent Products" page showing the last 10 products they viewed.
   - **Receive a warning if attempting to add products from multiple vendors in the cart, with options:**
     - Replace the cart with the new product(s).
     - Retain the current cart and cancel the addition.

### **Features and Functionalities**

1. **Home Page**
   - Prioritize products from followed shops for logged-in users.
   - Infinite scrolling for product listing.
   - Filtering and searching functionalities (price range, category, keyword, etc.).
   - Scroll-to-top button for better navigation.
   - Show flash sale products and add a button at the bottom. After clicking the button, redirect to the flash sale page and display all flash sale products.
2. **Product Details Page**

   - Related products section showing products in the same category.

4. **Cart Functionality**
   - If attempting to add products from another vendor, show a warning with options:
     - Replace the cart with the new product(s).
     - Retain the current cart and cancel the addition.
5. **Checkout**
6. **Order History**
   - **For Vendors:** View a detailed list of all orders placed for their shop.
   - **For Customers:** View their purchase history with product and order details.
7. **Authentication**
   
   
     - **Password Management:** Change password after logging in.
     - Reset password functionality via email.
8. **Vendor Dashboard**
   - delete products.
   - View and respond to customer reviews.
   - Paginated lists for added products and order history.
9. **Recent Products Page**
   - Display the last 10 products viewed by the user.
   - Include product details, prices, and direct links to the product page.
10. **Comparison Feature**
    - Allow users to compare up to three products, but only if the products are from the same category. Comparison will be based on attributes such as price, category, ratings, and other relevant details. If a user attempts to add a product from a different category for comparison, display a warning message indicating that only products from the same category can be compared.
11. **Responsive Design**
    - Mobile and desktop-friendly interface for all users.
12. **Scalability**
    - Implement paginated APIs for any list-based data to ensure scalability and performance. This includes, but is not limited to:
      - Order History
        - For both vendors and customers, paginate the order history to display a limited number of orders per page. Include options to navigate between pages (e.g., next, previous, or specific page numbers).
      - Product Listings
        - On the homepage, shop page, and "All Products" page, paginate product listings to handle large datasets efficiently.
        - Pagination should work seamlessly with filters and search functionality.

- **Technical Requirements**

1. **Backend**
   - **Authentication:** JWT-based authentication.
   - **Database:** Relational database PostgreSQL with Prisma or Mongodb with Mongoose.
   - **Server:** Node.js with Express for handling APIs. Typescript is optional but highly encouraged.
   - **Image Uploads:** Cloud storage integration for product images (e.g., Cloudinary).
2. **Frontend**
   - **Framework:** React.js or NextJs with state management using Redux or Context API. Typescript is optional but highly encouraged.

---

**Submission Guidelines:**

- **Codebase:** Ensure your codebase is clean, well-organized, and well-documented. Every key section of your code should have comments explaining its functionality clearly.
- **README File:** Your project must include a comprehensive README file that covers the following:
  - **Project Name & Description:** Provide a brief overview of what the project is and its purpose.
  - **Live URL:** Link to the live deployment of your backend and frontend.
  - **Technology Stack & Packages:** List all the technologies and packages used in the project.
  - **Setup Instructions:** Provide clear steps for installation and running the application.
  - **Key Features & Functionality:** Highlight the main features and functionality of your project.
  - **Known Issues/Bugs:** Mention any unresolved issues or bugs.
  - **Professional Formatting:** The README should be neatly formatted and easy to navigate.

---

**What You Need to Submit:**

1. **Live Deployment Link (Backend):** Provide the URL for the live backend of your project. You can deploy your backend using [Superbase](https://www.supabase.com/)/[render](https://render.com/) or any other platform of your choice.
2. **GitHub Repository Link:** Share the link to your GitHub repository where the full code for your project is hosted.
3. Front-End Live deployment URL.

---

**Deadline:**

- **60 Marks:** [6 Dec, 2024, 11:59 PM]
- **50 Marks:** [7 Dec, 2024, 11:59 PM]
- After **8 Dec to 11 Dec, 2024, 11:59 PM**, **30 Marks Deadline**.

---

**Plagiarism Policy:**
Plagiarism will result in 0 marks. Ensure all code submitted is your own work.

---

**Important Notes:**

## **Commit History Requirement:** Your repository must show at least 10 meaningful commits throughout the development process, demonstrating continuous progress.

By adhering to these guidelines, you’ll be well-equipped to complete Assignment 9. Stay focused and committed—this is your opportunity to demonstrate your skills and make a lasting impact. Best of luck! **🍀**