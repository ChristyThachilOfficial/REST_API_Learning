const express = require('express');
const router = express.Router();
const checkAuth= require('../middleware/check-auth')
const ordersController = require('../controllers/order')


router.get('/', checkAuth, ordersController.orders_get_all )

router.post('/',checkAuth, ordersController.orders_create_order )

router.get('/:orderId',checkAuth, ordersController.orders_get_singleorder)

router.delete('/:orderId',checkAuth,ordersController.orders_delete_order)



module.exports = router;