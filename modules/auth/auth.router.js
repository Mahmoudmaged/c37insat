const router = require('express').Router();
const controller = require("./controller/registration")
const validators = require('./auth.validation');
const validation = require('../../middlwear/validation');
const { auth } = require('../../middlwear/auth');
const { endPoint } = require('./auth.endPoint');





//signup
router.post('/signup', validation(validators.signup), controller.signup)
//confirmEmail
router.get('/confirmEmail/:token', validation(validators.confirmEmail), controller.confirmEmail)


//login
router.post('/login', validation(validators.login), controller.login)



router.patch('/logout', auth(endPoint.logout) ,controller.logout)






module.exports = router