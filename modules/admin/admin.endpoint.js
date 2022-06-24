const { roles } = require("../../middlwear/auth");


const endPoint = {
    getAllUsers: [roles.Admin],
    chageRole: [roles.Admin]
}

module.exports = endPoint