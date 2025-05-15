# 🛍️ E-Commerce Website

A baisc full-stack, responsive E-commerce web application built with **Next.js**, **MongoDB**, and **Nodemailer**. The project includes a dynamic product catalog, cart management system, payment simulation, and email confirmation system. Clean UI is supported by **Lucide React** icons and Tailwind CSS.



## 📌 Features

- 🔍 **Product Listing & Filtering**
  - Dynamic product pages fetched from MongoDB.
  - Category-based navigation.
  
- 🛒 **Cart Management**
  - Add/remove products to/from the cart.
  - Cart items are synced with MongoDB in real-time.
  - Visual feedback for actions (success/failure alerts).

- 💳 **Buy Now / Payment Simulation**
  - Full checkout flow with order summary.
  - Order confirmation triggers email notification.

- 📧 **Nodemailer Integration**
  - Sends confirmation email to admin after payment.
  - Also used in the **Contact Us** page for user queries.

- 📱 **Responsive UI**
  - Mobile-first design using **Tailwind CSS**.
  - Icons integrated using **Lucide React** (cart, phone, etc.).

- 🧩 **MongoDB Integration**
  - Products, cart, and messages stored and retrieved via Mongoose models.
  - Object ID validation and error handling.



## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **Next.js** | Frontend + Backend API routes |
| **MongoDB Atlas** | Cloud database for product/cart data |
| **Mongoose** | MongoDB object modeling |
| **Nodemailer** | Sending transactional and contact emails |
| **Tailwind CSS** | Responsive UI design |
| **Lucide React** | UI icons (cart, phone, etc.) |



## 📁 Project Structure

```bash
eco-web/
│
├── app/
│   ├── api/                   # All API route handlers
│   ├── bundle/                # Product bundle pages and AddToCart logic
│   ├── cart/                  # Cart API (Add/Delete from DB)
│   ├── categories/            # Product category APIs
│   ├── contact/               # Nodemailer Contact API
│   ├── popular/               # Popular product API
│   ├── product/[id]/          # Product detail page and API
│   ├── send-payment/          # Handles payment completion
│   ├── contactus/             # Contact form UI
│   ├── mycart/                # Cart UI
│   ├── pay-now/, paynow/[id]/ # Payment pages
│   ├── category/[category]/   # Filtered category view
│   ├── popularproduct/        # Popular products page
│   ├── profile/               # User profile
│   ├── search/                # Search functionality
│
├── components/
│   ├── Home/
│   ├── Footer.jsx
│   ├── Navbar.jsx
│   └── ProductCard.jsx
│
├── models/                    # MongoDB models
├── utils/                     # Utility functions (connectMongo, etc.)
├── public/                    # Static files
├── .env.local                 # Environment variables
└── compass-connections.json  # MongoDB Compass config
```
## 🖼️ Demo Video

> [E-commerce-Website](https://drive.google.com/file/d/1ZwSZ9_KMCMTCSxMOtC1WN-uiwwW5VChL/view?usp=sharing)

## 🚀 Getting Started

**Clone the repository**
```bash
git clone https://github.com/harshitarr/eGrocery-ECommerce-Website.git
cd eGrocery-ECommerce-Website
```

## ⚙️ Installation & Setup

```bash
# Clone the repo
git clone https://github.com/yourusername/eco-web.git

# Navigate into the directory
cd eco-web

# Install dependencies
npm install

# Add .env.local
MONGODB_URI=<your_mongo_connection_string>
EMAIL_USER=<your_email>
EMAIL_PASS=<your_email_app_password>

# Start the development server
npm run dev

```

## 🔧 Planned Improvements
- User Authentication-Implement a login and registration system to enable personalized shopping experiences.
- User Switching-Support multiple user sessions, allowing users to switch between accounts seamlessly.

## 👩‍💻 Author
### Your Name - harshitarr ❤


