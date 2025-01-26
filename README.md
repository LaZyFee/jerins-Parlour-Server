# Jerins Parlour

Jerins Parlour is a comprehensive web application built with React and Vite, designed to manage salon services efficiently. It includes both customer and admin functionalities, allowing seamless booking, payments, and service management.

## Features

### Customer
- Register and log in via email/password or Google (OAuth2 with Passport.js)
- Browse and choose service plans
- Book services with available time slots
- Make payments via Stripe or PayPal
- Submit reviews for services
- View booking history and payment status

### Admin
- Add, edit, or delete salon services
- Manage customer bookings
- View payment details (including Payment ID and timestamps)
- Promote users to admin role

## Tech Stack

- **Frontend:** React, Vite, Tailwind CSS, DaisyUI
- **Authentication:** Email/password authentication and Google OAuth2 (via Passport.js)
- **Payment:** Stripe (stripe/react-stripe-js, stripe/stripe-js), PayPal (paypal/react-paypal-js)
- **State Management:** Zustand
- **Other Libraries:** Axios, Lucide React, React-Icons, React-Calendar, React-Hook-Form, React-Hot-Toast, React-Router-Dom, Swiper, SweetAlert2

## Installation

1. Clone the repository:

   git clone ``` https://github.com/LaZyFee/jerins-parlor-client```

   cd jerins-parlour

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables for Stripe, PayPal, and OAuth in a .env file:
```bash
VITE_STRIPE_PUBLIC_KEY=your_stripe_public_key
VITE_PAYPAL_CLIENT_ID=your_paypal_client_id
VITE_GOOGLE_CLIENT_ID=your_google_client_id
VITE_GOOGLE_CLIENT_SECRET=your_google_client_secret
``` 
4. Start the development server:
```bash
npm run dev
```
## Scripts
  1. npm run dev: Start the development server
  2. npm run build: Build the project for production
  3. npm run preview Preview the production build locally

## Usage
**Customer Route:** Allows users to browse services, book appointments, make payments, review services, and sign in/sign up with email/password or Google.

**Admin Route:** Provides admins with access to manage services, view bookings and payments, and manage user roles.

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
