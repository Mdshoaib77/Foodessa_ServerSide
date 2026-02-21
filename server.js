// import express from "express"
// import 'dotenv/config'
// import cors from "cors"
// import connectDB from "./config/mongodb.js"
// import connectCloudinary from "./config/cloudinary.js"
// import userRouter from "./routes/userRoute.js"
// import productRouter from "./routes/productRoute.js"
// import cartRouter from "./routes/cartRoute.js"
// import orderRouter from "./routes/orderRoute.js"

// const app = express();  // Initialize Express application
// const port = process.env.PORT || 4000;  // Define server port

// connectDB();  // Establish connection to the database
// connectCloudinary();  // Set up Cloudinary for image storage

// // Middleware setup
// app.use(express.json()); // Enables JSON request body parsing
// app.use(cors()); // Allows cross-origin requests

// // Define API routes
// app.use('/api/user', userRouter); // Routes for user-related operations
// app.use('/api/product', productRouter); // Routes for product management
// app.use('/api/cart', cartRouter); // Routes for cart functionality
// app.use('/api/order', orderRouter); // Routes for handling orders

// // Root endpoint to check API status
// app.get('/', (req, res) => {
//     res.send('API successfully connected!');
// });

// // Start the server
// app.listen(port, () => console.log(`Server is running on PORT: ${port}`));




import express from "express"
import 'dotenv/config'
import cors from "cors"
import connectDB from "./config/mongodb.js"
import connectCloudinary from "./config/cloudinary.js"
import userRouter from "./routes/userRoute.js"
import productRouter from "./routes/productRoute.js"
import cartRouter from "./routes/cartRoute.js"
import orderRouter from "./routes/orderRoute.js"

const app = express();  // Initialize Express application

// ===============================
// Database & Cloudinary Connection
// ===============================
connectDB();
connectCloudinary();

// ===============================
// CORS Configuration (Production Ready)
// ===============================
const allowedOrigins = [
  "http://localhost:5173",

  // Client (Vercel + Netlify)
  "https://foodessa-client-side.vercel.app",
  "https://foodessa.netlify.app",

  // Admin Panel (Vercel + Netlify)
  "https://foodessa-admin.netlify.app",
  "https://foodessa-admin-panel.vercel.app"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);

    if (allowedOrigins.indexOf(origin) === -1) {
      return callback(new Error("CORS not allowed by server"), false);
    }

    return callback(null, true);
  },
  credentials: true
}));

app.options("*", cors());

// ===============================
// Middleware
// ===============================
app.use(express.json());

// ===============================
// API Routes
// ===============================
app.use('/api/user', userRouter);
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/order', orderRouter);

// ===============================
// Health Check Route
// ===============================
app.get('/', (req, res) => {
  res.send('API successfully connected!');
});

// ===============================
// IMPORTANT: For Vercel Deployment
// ===============================
export default app;