// const express=require("express");
// const cors = require('cors');
// const trainroute= require('./routes/train');
// const bookingsroute=require('./routes/bookings');
// const authenticateToken=require('./middleware/authenticateToken');
//  require('./scheduler');
//  const authroute=require('./routes/auth');
//  const profileRoutes = require('./routes/profileRoutes'); 
// const app=express();
// app.use(cors());
// // Middleware to parse JSON
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// // Add error logging middleware
// app.use((req, res, next) => {
//     console.log(`${req.method} ${req.path}`, req.body);
//     next();
// });
// app.use('/api/users', profileRoutes); // ✅ handler must be a function

// //Routes
// //1. Auth routes(signup,login)-public
// app.use('/api/auth',authroute);
// //2.Protected bookings route-requires token
// app.use('/api/bookings',authenticateToken,bookingsroute);
// //3.Trains route
// app.use('/api/trains',trainroute);


// //port no of hosting
// const port=3000;
// app.get("/",(req,res)=>{
//     res.send('Hello,Railway-Management system');
// });
// app.listen(port,()=>{
//     console.log(`Server running on http://localhost:${port}`);
// });
// index.js
const express = require('express');
const cors = require('cors');

const trainroute = require('./routes/train');
const bookingsroute = require('./routes/bookings');
const authroute = require('./routes/auth');
const profileRoutes = require('./routes/profileRoutes');
const authenticateToken = require('./middleware/authenticateToken');
const changePasswordRoute = require('./routes/changePassword');
const coachRoute = require('./routes/coachPosition');
const adminRoutes=require('./routes/admin');
const adminAuthRoute=require('./routes/adminAuth');
require('./scheduler'); // no export, just runs

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`, req.body);
  next();
});

app.use('/api/users', profileRoutes);
app.use('/api/auth', authroute);
app.use('/api/bookings', authenticateToken, bookingsroute);
app.use('/api/trains', trainroute);
app.use('/api/changepassword', changePasswordRoute);
app.use('/api/coach-position', coachRoute);
app.use('/api/admin',adminRoutes);
app.use('/api/admin',adminAuthRoute);
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello, Railway-Management system');
});

app.listen(port, () => {
  console.log(`🚆 Server running on http://localhost:${port}`);
});
