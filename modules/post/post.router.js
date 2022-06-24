const router = require('express').Router()
const multer = require('multer')
const { auth } = require('../../middlwear/auth')
const { myMulter, fileValidation } = require('../../service/multer')
const endpoint = require('./post.endPoint')
const postController = require("./controller/post")
const commentController = require("./controller/comment")

router.get ("/" , postController.postList)
router.post("/", auth(endpoint.createPost),
    myMulter('/post/image', fileValidation.image).array('image', 10),
    postController.createPost)

router.put("/:id", auth(endpoint.displayProfile),
    myMulter('/post/image', fileValidation.image).array('image', 10),
    postController.updatePost)

router.delete("/:id", auth(endpoint.displayProfile),
    postController.deletePost)
router.patch("/:id/like", auth(endpoint.displayProfile),
    postController.likePost)
router.patch("/:id/unlike", auth(endpoint.displayProfile),
    postController.unlikePost)


/////////////////////////// comment =========================

router.patch("/:id/comment" , auth(endpoint.createComment) , commentController.createComment )


router.patch("/:id/comment/:commentID/reply" , auth(endpoint.createComment) , commentController.replyOnComment )



router.patch("/comment/:id/like" , auth(endpoint.createComment) , commentController.likeComment )
router.patch("/comment/:id/unlike" , auth(endpoint.createComment) , commentController.unlikecomment )









module.exports = router