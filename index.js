// index.js

'use strict';
require("dotenv").config(); 
const Hapi = require('@hapi/hapi');
const Joi = require('@hapi/joi');
const server = Hapi.server({
    port:process.env.NODE_PORT,
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
         const contentData =                { 
                      data: 'hello detail users',
                      panjang: panjangRequest,
                      lebar : lebarRequest,
                      hasil: hasil 
         }

         const data = {
           statusCode : 200,
           error : "",
           message : "Hitung luas persegi",
           content : contentData 
         }
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