const { roles } = require("../../middlwear/auth");

const endPoint = {
    logout:[roles.Admin , roles.User , roles.Hr]
}


module.exports = {
    endPoint
}