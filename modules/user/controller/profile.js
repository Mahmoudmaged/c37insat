const userModel = require("../../../DB/model/User")

const displayProfile = async (req, res) => {
    try {
        const user = await userModel.findById(req.user._id)
        res.status(200).json({ message: "Done", user })
    } catch (error) {
        res.status(500).json({ message: "catch error", error })
    }

}


const profilePic = async (req, res) => {
    try {
        if (req.fileErr) {
            res.status(400).json({ message: "in-valid file type", })
        }else{
            const imageUrl = `${req.finalDistination}/${req.file.filename}`
            const user = await userModel.findByIdAndUpdate(req.user._id , {profilePic: imageUrl} , {new:true})
            res.status(200).json({ message: "Done", user })
        }
       
    } catch (error) {
        res.status(500).json({ message: "catch error", error })
    }

}


const coverPic = async (req, res) => {
    try {
        if (req.fileErr) {
            res.status(400).json({ message: "in-valid file type" })
        }else{
            const URLS =[]
            req.files.forEach(file => {
                URLS.push(`${req.finalDistination}/${file.filename}`)
            });
            const user = await userModel.findByIdAndUpdate(req.user._id , {coverPic: URLS} , {new:true})
            res.status(200).json({ message: "Done", user })
        }
       
    } catch (error) {
        res.status(500).json({ message: "catch error", error })
    }

}

module.exports = {
    displayProfile,
    profilePic,
    coverPic
}