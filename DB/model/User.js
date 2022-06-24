const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const userSchema = new mongoose.Schema({
    userName: { type: String, required: true },
    firstName: String,
    lastName: String,
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    age: { type: Number, required: true },
    phone: { type: String },
    gender: { type: String, required: true, enum: ['Male', 'Female'], default: 'Male' },
    confirmEmail: { type: Boolean, default: false },
    isBlooked: { type: Boolean, default: false },
    profilePic: { type: String },
    coverPic: { type: Array },
    gallary: { type: Array },
    online: { type: Boolean, default: false },
    follwer: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    role: { type: String, default: 'User' },
    socialLink: Array,
    pdfLink: String,
    story: Array,
    lastSeen:String
}, {
    timestamps: true
})


userSchema.pre('save', async function (next) {
    this.password = await bcrypt.hash(this.password, parseInt(process.env.saltRound))
    next()
})


userSchema.pre('findOneAndUpdate', async function (next) {
    console.log(this.model);
    console.log(this.getQuery());
    const hookData = await this.model.findOne(this.getQuery()).select("__v");
    if (hookData) {
        this.set({ __v: hookData.__v + 1 })
        next()
    }else{
        next()
    }
  

})
const userModel = mongoose.model('User', userSchema)
module.exports = userModel