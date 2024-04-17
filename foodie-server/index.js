const express = require('express');
const app = express();
const cors = require("cors");
const port = process.env.PORT || 6001;
const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');
require('dotenv').config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB configuration using Mongoose
mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@foodie-cluster.vvun5es.mongodb.net/FoodieDB?retryWrites=true&w=majority&appName=Foodie-cluster`)
    .then(() => console.log("Connected Successfully"))
    .catch(error => console.log("Error", error));

// JWT
app.post('/jwt', async (req, res) => {
    const user = req.body;
    const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '1hr'
    });
    res.send({ token });
});

// Routes
const menuRoutes = require('./api/routes/MenuRoutes');
const cartRoutes = require('./api/routes/cartRoutes');
const userRoutes = require('./api/routes/userRoutes');
const paymentRoutes=require('./api/routes/paymentRoutes');
app.use('/menu', menuRoutes);
app.use('/carts', cartRoutes);
app.use('/users', userRoutes);
app.use('/payment',paymentRoutes);

// Create a PaymentIntent with the order amount and currency
app.post("/create-payment-intent", async (req, res) => {
    const { price } = req.body;
    const amount = price * 100;

    const paymentIntent = await stripe.paymentIntents.create({
        amount: amount,
        currency: "usd",
        payment_method_types: ["card"]
    });

    res.send({
        clientSecret: paymentIntent.client_secret,
    });
});

app.get("/", (req, res) => {
    res.send("Hello Foodi Client Server!");
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
