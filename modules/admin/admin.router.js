const router = require('express').Router();

const { auth } = require('../../middlwear/auth');
const endPoint = require('./admin.endpoint');
const controller = require("./controller/admin")



router.get("/users" , auth(endPoint.getAllUsers),controller.allUsers)


router.patch("/user/:id/role" , auth(endPoint.chageRole) ,controller.changeRole)
router.patch("/user/:id/block" , auth(endPoint.chageRole) ,controller.blockUser)

module.exports  =  router