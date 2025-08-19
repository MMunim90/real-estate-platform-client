![MasterHead](https://i.ibb.co/0VW7M2g4/Screenshot-2025-07-21-173448.png)

# Project overview

project name : Real Estate Website

webpage name : BrickBase

### Real Estate Server Repository -> [Click Here](https://github.com/MMunim90/real-estate-platform-server)

purpose :
BrickBase is a Real Estate Platform designed to simplify the buying, renting, and listing of properties. It offers agents the ability to list properties with detailed information, images, and pricing, while allowing buyers and renters to explore verified listings with filters, favorites, and tracking features. Admins maintain data integrity by verifying listings, managing user access, and ensuring content quality. BrickBase makes the real estate journey more transparent, efficient, and user-friendly for everyone involved.

# Technologies :
Vite, Node.js, React.js, LocalStorage, React Router DOM, Tailwind CSS, DaisyUI, React Icons, React-toastify, sweetaleart, MongoDB, Express.js, JSON Web Token (JWT), Imgbb, stripe.

# Features :

- Firebase-based secure login and registration for admin, agent, and buyer

- Role-based dashboard for admin, agent, and buyer

- Private/protected routing

- Add, edit, and delete property listings for agents

- Admin can verify properties before they appear publicly

- Real-time toast and SweetAlert2 notifications

- Image upload via Cloudinary

- Property tracking, filtering, and searching

- Responsive layout for all screen sizes

- Favorite property feature for buyers

- user can wishlist, review, report any properties,

- Clean UI with real estate card layout

# Frontend (React) Dependencies :

- vite : 6.3.5

- firebase : 11.6.1

- axios : 1.10.0

- react : 19.1.0

- react-dom : 19.1.0

- react-router-dom : 7.5.1

- tailwindcss : 4.1.5

- daisyui : 5.0.35

- react-icons : 5.5.0

- sweetalert2 : 11.21.0

- react-hot-toast : 2.5.2

- react-helmet-async : 2.0.5

- react-awesome-reveal : 4.3.1

- aos : 2.3.4

# Backend (Node.js with Express) Dependencies :

- express : 5.1.0

- cors : 2.8.5

- dotenv : 16.5.0

- mongodb : 6.16.0

- firebase-admin : 13.4.0

- jsonwebtoken : 9.0.2

- stripe : 18.0.0

# How to run this website on local machine :
Make sure you have Node.js and npm installed. Clone the frontend and backend repositories.
In the frontend directory, run:

npm install  
npm run dev
Visit: http://localhost:5173

In the backend directory, configure environment variables in a .env file (e.g., MongoDB URI, JWT secret), then run:

npm install  
nodemon index.js
Visit: http://localhost:5000 or similar

Ensure both frontend and backend are connected properly via APIs and authentication headers.

<!--
### Admin email: witired@mailinator.com
### Admin password: Asdfgh!
### Agent email: gora@gari.com
### Agent password: Asdfgh!
-->

# Live Link :
[BrickBase](https://brickbase-47887.web.app/)
