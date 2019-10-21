'use strict';
const Joi = require('@hapi/joi');

exports.plugin = {
    pkg: require('../../package.json'),
    name: 'route-books',
    register: async (server, options, next) => {
        const basePath = '/api/v1/';
        server.route([
            {
                method: 'GET',
                path: basePath + 'users',
                handler: (request, h) => {
                    const data = { data: 'hello from users' }
                    return h.response(data).code(200)
                }
            },
            {
                    method: 'POST',
                    path: basePath + 'details',
                   handler: (request, h) => { 
        console.log(request.payload);      
                        let startRequest= request.payload.start;
                        let endRequest= request.payload.end;
                        let hasil = parseInt (startRequest) + parseInt (endRequest)
                        const data =                { data: 'hello detail users',...request.payload,hasil: hasil }
                        return h.response(data).code(200)

                    }
                },
            {
                method: 'GET',
                path: basePath + 'users/{id}',
                options:{
                    validate:{
                        params:{
                             id: Joi.number().required().min(1)
                        },
                        query: {
                            page: Joi.number().min(0).default(1),
                        }
                    }
                },
                handler: (request, h) => { 
                    console.log(request.params);
                    return 'Hello from user ' + request.params.id;
                }
            }, 
{
                    method: 'POST',
                    path: basePath + 'register',
                   handler: (request, h) => { 
        console.log(request.payload);      
                        let startRequest= request.payload.start;
                        let endRequest= request.payload.end;
                        let hasil = parseInt (startRequest) + parseInt (endRequest)
                        const data =                { data: 'hello user Register',...request.payload,hasil: hasil }
                        return h.response(data).code(200)

                    }
                }, 
        ]);
    }
};