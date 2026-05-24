const express = require('express');

const Order = require('../models/Order');

const router = express.Router();

router.post('/', async (req, res) => {

    try {

        const order = new Order({

            userId: req.body.userId,

            products: req.body.products,

            total: req.body.total

        });

        await order.save();

        res.json({
            message: 'Order Placed Successfully'
        });

    } catch (error) {

        res.status(500).json({
            message: 'Error placing order'
        });
    }
});

module.exports = router;