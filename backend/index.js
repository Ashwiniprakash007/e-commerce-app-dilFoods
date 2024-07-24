const port = 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const cors = require("cors");

app.use(express.json());
app.use(cors());

// Database connection with MongoDB
mongoose.connect("mongodb+srv://dharmikparmar1887:1887@cluster0.oq8etwb.mongodb.net/e-commerce");

// Routes
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const cartRoutes = require('./routes/cartRoutes');

// Use routes
app.use(productRoutes);
app.use(userRoutes);
app.use(cartRoutes);

// API Creation
app.get("/", (req, res) => {
    res.send("Express App is Running");
});

// Image storage Engine
const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
});

const upload = multer({ storage: storage });

// Creating Upload endpoint images
app.use('/images', express.static('upload/images'));

app.post("/upload", upload.single('product'), (req, res) => {
    res.json({
        success: 1,
        image_url: `https://e-commerce2-uf2x.onrender.com/images/${req.file.filename}`
    });
});

app.listen(port, (error) => {
    if (!error) {
        console.log("Server listening on port " + port);
    } else {
        console.log("Error : " + error);
    }
});


