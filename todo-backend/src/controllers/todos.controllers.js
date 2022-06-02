
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose'
import Todo from '../models/todo.js';
import env from '../../config.js'

const getTodos = (req, res) => {
    if (req.cookies && req.cookies.token) {
        const payload = jwt.verify(req.cookies.token, env.secret);

        Todo.where({ user: new mongoose.Types.ObjectId(payload.id) }).find((err, todos) => {
            res.json(todos);
        });
    } else {
        res.status(401).json({ "error": "Unauthorized" });
    }
}

const addTodo = (req, res) => {
    if (req.cookies && req.cookies.token) {
        const payload = jwt.verify(req.cookies.token, env.secret);
        const todo = new Todo({
            text: req.body.text,
            description: req.body.description,
            done: false,
            user: new mongoose.Types.ObjectId(payload.id)
        });

        todo.save().then(todo => {
            res.json(todo);
        }).catch((error) => {
            res.json(error);
        });
    } else {
        res.status(401).json({ "error": "Unauthorized" });
    }
}

const updateTodo = (req, res) => {
    if (req.cookies && req.cookies.token) {
        const payload = jwt.verify(req.cookies.token, env.secret);
        Todo.findOneAndUpdate({
            _id: new mongoose.Types.ObjectId(req.body.id),
            user: new mongoose.Types.ObjectId(payload.id)
        }, {
            done: req.body.done,
            text: req.body.text,
            description: req.body.description,
        }).then((todo) => {
            res.json(todo);
        }).catch((error) => {
            res.json(error);
        });
    } else {
        res.status(401).json({ "error": "Unauthorized" });
    }
}

const deleteTodo = (req, res) => {
    if (req.cookies && req.cookies.token) {
        const payload = jwt.verify(req.cookies.token, env.secret);
        Todo.deleteOne({
            _id: new mongoose.Types.ObjectId(req.body.id),
            user: new mongoose.Types.ObjectId(payload.id)
        }).then(() => {
            res.status(200).json({ "success": true });
        }).catch((error) => {
            res.json(error);
        });
    } else {
        res.status(401).json({ "error": "Unauthorized" });
    }
}


export default { getTodos, addTodo, updateTodo, deleteTodo }