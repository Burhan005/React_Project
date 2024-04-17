const express = require('express');
const mongoose = require('mongoose');

const Payment = require('../models/Payment');
const router = express.Router();
const Cart = require('../models/Carts');
const ObjectId = mongoose.Types.ObjectId;

// Verification middleware
const verifyToken = require('../middlewares/verifyToken');

// POST endpoint for handling payments and cart deletion
router.post('/', verifyToken, async (req, res) => {
    const payment = req.body;
    try {
        // Create payment record in the database
        const paymentRequest = await Payment.create(payment);

        // Delete carts associated with the payment
        const cartIds = payment.cartItems.map(id => new ObjectId(id));
        const deleteCartRequest = await Cart.deleteMany({ _id: { $in: cartIds } });

        // Send a successful response
        res.status(200).json({
            message: 'Payment processed successfully',
            payment: paymentRequest,
            deletedCarts: deleteCartRequest
        });
    } catch (error) {
        // Log the error to the server console
        console.error('Error processing payment:', error);
        // Send an error response
        res.status(500).json({ message: 'An error occurred while processing the payment' });
    }
});

// router.get('/',verifyToken,async(req,res)=>{
// const email=req.query.email;
// const query={email:email}
// try{
//     const decodedEmail=req.decoded.email;
//     if(email !==decodedEmail){
//         res.status(403).json({message:"Forbidden Access"})
//     }
//     const res=await Payment.find(query).sort({createdAt:-1}).exec()
//     res.status(200).json(result)

// }catch{
//     res.status(404).json({message: error.message});
// }
// });
router.get('/', verifyToken, async (req, res) => {
    const email = req.query.email;
    const query = { email: email };
    try {
        const decodedEmail = req.decoded.email;
        if (email !== decodedEmail) {
            return res.status(403).json({ message: "Forbidden Access" });
        }
        const result = await Payment.find(query).sort({ createdAt: -1 }).exec();
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});


module.exports = router;
