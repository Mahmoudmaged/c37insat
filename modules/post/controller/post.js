
const commentModel = require("../../../DB/model/comment");
const postModel = require("../../../DB/model/post");
const paginate = require("../../../service/paginate");

const createPost = async (req, res) => {
    try {
        const { text } = req.body;
        let imagesURL = []
        if (req.files) {
            req.files.forEach(file => {
                imagesURL.push(`${req.finalDistination}/${file.filename}`)
            });
        }
        const newPost = new postModel({ text, createdBy: req.user._id, image: imagesURL })
        const savedPost = await newPost.save()
        res.status(201).json({ message: "Done", savedPost })
    } catch (error) {
        res.status(500).json({ message: "catch error", error })

    }
}


const updatePost = async (req, res) => {
    try {
        const { id } = req.params
        const post = await postModel.findOne({ _id: id, createdBy: req.user._id })
        if (!post) {
            res.status(404).json({ message: "in-valid post id or u not owner " })
        } else {
            let imagesURL = []
            checkImage = false
            if (req.files) {
                req.files.forEach(file => {
                    imagesURL.push(`${req.finalDistination}/${file.filename}`)
                });
                checkImage = true
            } else {
                imagesURL = post.image
                checkImage = true
            }
            req.body.image = imagesURL
            console.log(req.body.image);
            const uPost = await postModel.findOneAndUpdate({ _id: id, createdBy: req.user._id }, { ...req.body }, { new: true })
            res.status(200).json({ message: "Done", uPost, dd: req.body })
        }

    } catch (error) {
        res.status(500).json({ message: "catch error", error })

    }
}

const deletePost = async (req, res) => {
    try {
        const { id } = req.params
        const post = await postModel.findOneAndUpdate({ _id: id, createdBy: req.user._id }, {
            isDeleted: true,
            deletedBy: req.user._id, deletdedAt: Date.now()
        }, {
            new: true
        })
        if (!post) {
            res.status(404).json({ message: "in-valid post id or u not owner " })
        } else {
            res.status(200).json({ message: "Done", post })
        }
    } catch (error) {
        res.status(500).json({ message: "catch error", error })
    }
}

const likePost = async (req, res) => {
    try {
        const { id } = req.params
        const post = await postModel.findOneAndUpdate({ _id: id }, {
            $push: { likes: req.user._id }
        }, { new: true })
        if (!post) {
            res.status(404).json({ message: "in-valid post id  " })
        } else {
            res.status(200).json({ message: "Done", post })
        }
    } catch (error) {
        res.status(500).json({ message: "catch error", error })
    }
}

const unlikePost = async (req, res) => {
    try {
        const { id } = req.params
        const post = await postModel.findOneAndUpdate({ _id: id }, {
            $pull: { likes: req.user._id }
        }, { new: true })
        if (!post) {
            res.status(404).json({ message: "in-valid post id  " })
        } else {
            res.status(200).json({ message: "Done", post })
        }
    } catch (error) {
        res.status(500).json({ message: "catch error", error })
    }
}





const postList = async (req, res) => {

    const { page, size } = req.query
    const { skip, limit }  = paginate(page, size)
    const post = await postModel.find({}).populate([
        {
            path: 'createdBy',
            select: 'email userName'
        }, {
            path: 'comments',
            match: { isDeleted: false },
            populate: [
                {
                    path: 'createdBy',
                    select: 'email userName'

                },
                {
                    path: 'replyIds',
                    populate: [
                        {
                            path: 'createdBy',
                            select: 'email userName'
                        },
                        {
                            path: 'replyIds',
                            populate: [
                                {
                                    path: 'createdBy',
                                    select: 'email userName'
                                }
                            ]
                        }
                    ]
                },
                {
                    path: 'likes',
                    select: 'email userName'
                }
            ]
        }
        , {
            path: 'likes',
            select: 'email userName'
        }
    ]).limit(limit).skip(skip)
    res.status(200).json({ message: "Done", post })

}

module.exports = {
    createPost,
    updatePost,
    deletePost,
    likePost,
    unlikePost,
    postList
}