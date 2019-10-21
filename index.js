// index.js

'use strict';

const Hapi = require('@hapi/hapi');

const server = Hapi.server({
    port: 3000,
    host: 'localhost'
})

server.route({
    method: 'GET',
    path: '/hello',
    handler: (request, reply) => {
        return 'I am hello';
    }
});

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