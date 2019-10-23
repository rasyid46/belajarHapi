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
    path: '/persegi',
    config: {
      validate: {
        payload: { 
          panjang: Joi.number().min(1).required(),
          lebar: Joi.number().min(1).required()
        }
      }
    },
    handler: (request, h) => { 
         console.log(request.payload);      
         let panjangRequest= request.payload.panjang;
         let lebarRequest= request.payload.lebar;
         let hasil = parseInt (panjangRequest) * parseInt (lebarRequest)
         const data =                { data: 'hello detail users',...request.payload,hasil: hasil }
        return h.response(data).code(200)
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