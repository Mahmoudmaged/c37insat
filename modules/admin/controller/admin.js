const userModel = require("../../../DB/model/User")
const sendEmail = require("../../../service/sendEmail")



const allUsers = async (req, res) => {

    const users = await userModel.find({ $or: [{ role: { $in: ['HR'] } }, { age: { $lt: 18 } }] })
    res.status(200).json({ message: "Done", users })
}


const changeRole = async (req, res) => {
    const { id } = req.params //userID
    const user = await userModel.findByIdAndUpdate(id, { role: req.body.role }, { new: true })
    if (!user) {
        res.status(404).json({ message: "in-valid user id" })

    } else {

        sendEmail(user.email, `<p>your role hase been changed to ${req.body.role}</p>`)
        res.status(200).json({ message: "Done", user })

    }
}

const blockUser = async (req, res) => {
    const { id } = req.params //userID
    const user = await userModel.findOneAndUpdate({_id:id , role:{$nin:[req.user.role]}}, { isBlooked: true }, { new: true })
    if (!user) {
        res.status(404).json({ message: "in-valid user id" })
    } else {
        sendEmail(user.email, `<p>your role hase been blocked</p>`)
        res.status(200).json({ message: "Done", user })

    }
}
module.exports = {
    allUsers,
    changeRole,
    blockUser
}