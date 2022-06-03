
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose'
import Todo from '../models/todo.js';
import env from '../../config.js'

/**
 * @apiDefine TodoSuccessResponse
 *
 * @apiSuccess {String} _id ID of the Todo.
 * @apiSuccess {String} text Title of the Todo.
 * @apiSuccess {String} description Description of the Todo.
 * @apiSuccess {Boolean} done Completed state of the Todo.
 * @apiSuccess {String} user User Id of the Todo.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *         "_id": "62962e0fe6537ae9a6d39dbf",
 *         "text": "Bring Milk",
 *         "description": "Newland Brand Milk x 2",
 *         "done": false,
 *         "user": "6294ff992e9437d705b67ac6"
 *     }
 */

/**
 * @apiDefine UserNotFoundError
 *
 * @apiError UserNotFound The requested User was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 401 Not Found
 *     {
 *       "error": "Unauthorized"
 *     }
 */

/**
 * @apiDefine RequestAuthHeader
 *
 * @apiHeader (jwt token){String} Authorization  jwt authorization
 * @apiHeaderExample {json} Request-Header-Example:
 * {
 *  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbl9uYW1lIjoiaHVudGVyIiwiaWF0IjoxNTg5NzgyNjYyLCJleHAiOjE1ODk5NTU0NjJ9.ART87U90VZTkuuJznifGJWhbGSsv9eW7kkUaRopXfgE"  
 * }
 */

/**
 * @api {get} /todo Request all Todos of the User
 * @apiName Get All Todos
 * @apiGroup Todo
 * @apiVersion 1.0.0
 *
 * @apiSuccess {String} _id ID of the Todo.
 * @apiSuccess {String} text Title of the Todo.
 * @apiSuccess {String} description Description of the Todo.
 * @apiSuccess {Boolean} done Completed state of the Todo.
 * @apiSuccess {String} user User Id of the Todo.
 *
 * @apiUse RequestAuthHeader
 * 
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     [
 *         {
 *             "_id": "6295d1f0fdb025d18fceb865",
 *             "text": "Pay Bills",
 *             "description": "Telephone\nElectricity",
 *             "done": false,
 *             "user": "6294ff992e9437d705b67ac6"
 *         },
 *         {
 *             "_id": "62962e0fe6537ae9a6d39dbf",
 *             "text": "Bring Milk",
 *             "description": "Newland Brand Milk x 2",
 *             "done": true,
 *             "user": "6294ff992e9437d705b67ac6",
 *         }
 *     ]
 * 
 * @apiUse UserNotFoundError
 */
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

/**
 * @api {put} /todo Create a Todo of the User
 * @apiName Create New Todo
 * @apiGroup Todo
 * @apiVersion 1.0.0
 *
 * @apiUse RequestAuthHeader
 * 
 * @apiBody {String} text Title of the Todo.
 * @apiBody {String} description Description of the Todo.
 * 
 * @apiUse UserSuccessResponse
 * @apiUse UserNotFoundError
 */
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

/**
 * @api {post} /todo Update a Todo of the User
 * @apiName Update Existing Todo
 * @apiGroup Todo
 * @apiVersion 1.0.0
 *
 * @apiUse RequestAuthHeader
 * 
 * @apiBody {String} [text] Title of the Todo.
 * @apiBody {String} [description] Description of the Todo.
 * @apiBody {Boolean} [done] Completed state of the Todo.
 * 
 * @apiUse UserSuccessResponse
 * @apiUse UserNotFoundError
 */
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

/**
 * @api {delete} /todo Delete a Todo of the User
 * @apiName Delete Existing Todo
 * @apiGroup Todo
 * @apiVersion 1.0.0
 *
 * @apiUse RequestAuthHeader
 * 
 * @apiSuccess {Boolean} success Todo delete status.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *         "success": true
 *     }
 * 
 * @apiUse UserNotFoundError
 */
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