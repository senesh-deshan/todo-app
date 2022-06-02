import express from 'express';
import todoControllers from '../controllers/todos.controllers.js'

const todoRouter = express.Router();

todoRouter.get('/', todoControllers.getTodos);
todoRouter.put('/', todoControllers.addTodo);
todoRouter.post('/', todoControllers.updateTodo);
todoRouter.delete('/', todoControllers.deleteTodo);

export default todoRouter;
