const router = require('express').Router();
const { auth } = require('../../middlwear/auth');
const validation = require('../../middlwear/validation');
const { myMulter, fileValidation } = require('../../service/multer');
const controller = require("./controller/profile");
const endpoint = require('./user.endPoint');
const validators = require("./user.validation")

router.get("/profile", validation(validators.profile),
    auth(endpoint.displayProfile), controller.displayProfile)


router.patch("/profile/pic",
    myMulter('user/profile/profilePic', fileValidation.image).single('image')
    ,validation(validators.profiletwo),
    auth(endpoint.displayProfile), controller.profilePic)


    router.patch("/profile/coverPic",  
     auth(endpoint.displayProfile),
    myMulter('user/profile/profilePic', fileValidation.image).array('image' , 15),
   controller.coverPic)








module.exports = router