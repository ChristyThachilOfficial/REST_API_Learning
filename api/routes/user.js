const express = require('express');
const router = express.Router();


const userController = require('../controllers/user')
const checkAuth  = require('../middleware/check-auth')



router.post('/signup',userController.users_create_user )

router.post('/login',userController.users_login_user)

router.delete('/:userId',checkAuth,userController.users_delete_users)

module.exports = router;