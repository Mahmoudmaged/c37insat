const { roles } = require("../../middlwear/auth");


const endpoint = {
    displayProfile  : [ roles.Admin , roles.User , roles.Hr]
}

module.exports = endpoint