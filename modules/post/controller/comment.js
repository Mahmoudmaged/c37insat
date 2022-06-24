const commentModel = require("../../../DB/model/comment");
const postModel = require("../../../DB/model/post");



const createComment = async (req, res) => {
    const { text } = req.body;
    const { id } = req.params; // postID
    const { _id } = req.user
    const post = await postModel.findById(id)
    if (!post) {
        res.status(404).json({ message: "In-valid post ID" })
    } else {
        const newComment = new commentModel({ text, createdBy: _id, postID: id })
        const savedComment = await newComment.save();
        await postModel.findOneAndUpdate(id, { $push: { comments: savedComment._id } })
        res.status(200).json({ message: "Done" })
    }
}




const replyOnComment = async (req, res) => {

    const { text } = req.body;
    const { id, commentID } = req.params;
    const { _id } = req.user

    const post = await postModel.findById(id);
    if (!post) {
        res.status(404).json({ message: "In-valid post ID" })
    } else {
        const comment = await commentModel.findOne({ _id: commentID, isDeleted: false });
        if (!comment) {
            res.status(404).json({ message: "In-valid comment ID" })
        } else {
            const newComment = new commentModel({ text, createdBy: _id, postID: id })
            const savedComment = await newComment.save();
            console.log(comment);
            await commentModel.findOneAndUpdate({ _id: comment._id }, { $push: { replyIds: savedComment._id } })
            res.status(200).json({ message: "Done", comment })
        }

    }
}


const likeComment = async (req, res) => {
    try {
        const { id } = req.params
        const comment = await commentModel.findOneAndUpdate({ _id: id }, {
            $push: { likes: req.user._id }
        }, { new: true })
        if (!comment) {
            res.status(404).json({ message: "in-valid comment id  " })
        } else {
            res.status(200).json({ message: "Done", comment })
        }
    } catch (error) {
        res.status(500).json({ message: "catch error", error })
    }
}

const unlikecomment = async (req, res) => {
    try {
        const { id } = req.params
        const comment = await commentModel.findOneAndUpdate({ _id: id }, {
            $pull: { likes: req.user._id }
        }, { new: true })
        if (!comment) {
            res.status(404).json({ message: "in-valid comment id  " })
        } else {
            res.status(200).json({ message: "Done", comment })
        }
    } catch (error) {
        res.status(500).json({ message: "catch error", error })
    }
}

module.exports = {
    createComment,
    replyOnComment,
    likeComment ,
    unlikecomment
}
