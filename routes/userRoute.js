const Models = require('../models/index')

const Joi = require('@hapi/joi');
const usersHandler = async (request, h) => {
        try {
            const usersModel = await Models.Users.findAll({})
            return { data: usersModel }
        } catch (error) {
            return h.response({ error: error.message }).code(400)
        }
    }
    const createUserHandler = async (request, h) => {
            try {
                const {firstNameReq,lastNameReq, emailReq, passwordReq} = request.payload;
                console.log(request.payload);
                const user = await Models.Users.create({
                    first_name:firstNameReq,
                    last_name:lastNameReq,
                    email:emailReq,
                    password:passwordReq
                })
                return {
                    data: user,
                    message: 'New user has been created.'
                }
            } catch (error) {
                return h.response({
                    error: error.message
                }).code(400)
            }
        }


module.exports = [
      { method: 'GET', path: '/user', handler:usersHandler},
      { method: 'POST', path: '/user', 
    config: {
        validate: {
          payload: { 
            firstNameReq: Joi.string().min(1).required(),
            lastNameReq: Joi.string().min(1).required(),
            passwordReq: Joi.string().min(1).required(),
            emailReq: Joi.string().min(1).required(),
          }
        }
      },
    
    handler:createUserHandler},
];