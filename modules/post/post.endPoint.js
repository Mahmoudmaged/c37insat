const { roles } = require("../../middlwear/auth");

const endPoint = {
    createComment: [roles.User, roles.Admin],
    createPost: [roles.Admin, roles.Hr, roles.User]
}
module.exports = endPoint