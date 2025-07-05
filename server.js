const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const AuthRoutes=require("./routes/AuthRoutes");
const DoctorRoutes=require("./routes/DoctorRoutes")
const PaymentRoutes =require("./routes/PaymentRoutes")
// const PatientRoutes =require("./routes/PatientRoutes")
dotenv.config();


connectDB();

const app = express();


app.use(cors());
app.use(express.json());
// app.use("/auth" ,AuthRoutes)
app.use("/doctor",DoctorRoutes)
// app.use("/payment",PaymentRoutes)
app.use("/patient",PatientRoutes)

app.get("/", (req, res) => {
    res.send("Working");
  });

// Start the Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
