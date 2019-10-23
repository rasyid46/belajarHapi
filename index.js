// index.js

'use strict';

const Hapi = require('@hapi/hapi');
const Joi = require('@hapi/joi');
const server = Hapi.server({
    port: 3000,
    host: 'localhost'
})

server.route({
    method: 'GET',
    path: '/',
    handler: (request, reply) => {
        return 'I am hello';
    }
});

server.route({  
    method: 'POST',
    path: '/req',
    config: {
      validate: {
        payload: { 
          password: Joi.string().min(6).max(200).required(),
          start: Joi.number().min(1).required()
        }
      }
    },
     handler: (request, reply) => {
                return 'I am hello';
            }
  })

const main = async () => {
    // register the plugin
    await server.register(require('./src/routes /users'));
    await server.start()
}

main().then(() => {
    console.log('Server running on %s', server.info.uri);
}).catch(err => {
    console.log(err)
    process.exit(1)
})