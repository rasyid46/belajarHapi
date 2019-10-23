const Models = require('../models/index')
const todos = require('../models/todo');
module.exports = [].concat(todos);
const todosHandler = async (request, h) => {
    try {
        const todos = await Models.Todo.findAll({})
        return { data: todos }
    } catch (error) {
        return h.response({ error: error.message }).code(400)
    }
}

const createTodoHandler = async (request, h) => {
    try {
        const { title, description } = request.payload;
        console.log(request.payload);
        const todo = await Models.Todo.create({
            title: title,
            description: description
        })
        return {
            data: todo,
            message: 'New todo has been created.'
        }
    } catch (error) {
        return h.response({
            error: error.message
        }).code(400)
    }
}

const updateTodoHandler = async (request, h) => {
    try {
        const todo_id = request.params.id;
        const { title, description } = request.payload;
        const todo = await Models.Todo.update({
            title: title,
            description: description
        }, {
            where: {
                id: todo_id
            }
        })
   
        const dataRequest = {
            title:title, 
            description: description
        }
        console.log('dataRequest');
        console.log(dataRequest);
        return {
            data: dataRequest,
            message: 'Todo has been updated.zz'
        }

    } catch (error) {
        return h.response({
            error: error.message
        }).code(400)
    }
}

const deleteTodoHandler = async (request, h) => {
    try {
        const todo_id = request.params.id;
        await Models.Todo.destroy({
            where: {
                id: todo_id
            }
        })
        return { message: 'Todo has been deleted.' }
    } catch (error) {
        return h.response({
            error: error.message
        }).code(400)
    }
}

module.exports = [
    { method: 'GET', path: '/todos', handler: todosHandler },
    { method: 'POST', path: '/todo', handler: createTodoHandler },
    { method: 'PUT', path: '/todo/{id}', handler: updateTodoHandler },
    { method: 'DELETE', path: '/todo/{id}', handler: deleteTodoHandler }
];