const Joi = require('Joi');



const profile = {
    headers: Joi.object().required().keys({
        authorization: Joi.string().required()
    }).options({ allowUnknown: true }),
    // body: Joi.object().required().keys({
    //     name: Joi.string().required()
    // })
}
const  profiletwo = {
    body: Joi.object().required().keys({
        name: Joi.string().required()
    })
}

module.exports = { profile  , profiletwo}