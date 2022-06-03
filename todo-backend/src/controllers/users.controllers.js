
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'
import User from '../models/user.js';
import env from '../../config.js'

/**
 * @apiDefine UserSuccessResponse
 *
 * @apiSuccess {String} id ID of the User.
 * @apiSuccess {String} email Email of the User.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *         "id": "6294ff992e9437d705b67ac6",
 *         "email": "hello@example.com"
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
 * @api {get} /user/details Request User information
 * @apiName Get User Details
 * @apiGroup User
 * @apiVersion 1.0.0
 *
 * @apiHeader (jwt token){String} Authorization  jwt authorization
 * @apiHeaderExample {json} Request-Header-Example:
 * {
 *  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbl9uYW1lIjoiaHVudGVyIiwiaWF0IjoxNTg5NzgyNjYyLCJleHAiOjE1ODk5NTU0NjJ9.ART87U90VZTkuuJznifGJWhbGSsv9eW7kkUaRopXfgE"  
 * }
 * 
 * @apiUse UserSuccessResponse
 * @apiUse UserNotFoundError
 */
const userDetails = (req, res) => {
    if (req.cookies && req.cookies.token) {
        const payload = jwt.verify(req.cookies.token, env.secret);
        User.findById(payload.id).then(user => {
            if (user) {
                res.json({ id: user._id, email: user.email });
            } else {
                res.status(401).json({ "error": "Unauthorized" });
            }
        });
    } else {
        res.status(401).json({ "error": "Unauthorized" });
    }
}

/**
 * @api {post} /user/register Register a new User
 * @apiName User Register
 * @apiGroup User
 * @apiVersion 1.0.0
 *
 * @apiBody {String} email Email of the User.
 * @apiBody {String} password Password of the User.
 *
 * @apiUse UserSuccessResponse
 * 
 * @apiError UserAlreadyExists A User already exists with given email.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 409 Conflict
 *     {
 *       "error": "User already exists"
 *     }
 */
const userRegister = (req, res) => {
    const { email, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);
    const user = new User({ email: email, password: hashedPassword })
    user.save().then(user => {
        if (user) {
            jwt.sign({ id: user._id, email: user.email }, env.secret, (err, token) => {
                if (err) {
                    console.log(err);
                    res.sendStatus(500);
                } else {
                    res.cookie('token', token).json({ id: user._id, email: user.email });
                }
            })
        }
        else {
            res.status(401).json({ "error": "Unauthorized" });
        }
    }).catch(() => {
        res.status(409).json({ "error": "User already exists" });
    })
}

/**
 * @api {post} /user/login Login an existing User
 * @apiName User Login
 * @apiGroup User
 * @apiVersion 1.0.0
 *
 * @apiBody {String} email Email of the User.
 * @apiBody {String} password Password of the User.
 *
 * @apiUse UserSuccessResponse
 * @apiUse UserNotFoundError
 */
const userLogin = (req, res) => {
    const { email, password } = req.body;

    User.findOne({ email }).then(user => {

        if (user) {
            const passwordMatch = bcrypt.compareSync(password, user.password);

            if (passwordMatch) {
                jwt.sign({ id: user._id, email: user.email }, env.secret, (err, token) => {
                    if (err) {
                        console.log(err);
                        res.sendStatus(500);
                    } else {
                        res.cookie('token', token).json({ id: user._id, email: user.email });
                    }
                })
            } else {
                res.status(401).json({ "error": "Unauthorized" });
            }
        } else {
            res.status(401).json({ "error": "Unauthorized" });
        }
    })

}

/**
 * @api {post} /user/logout Logout an User
 * @apiName User Logout
 * @apiGroup User
 * @apiVersion 1.0.0
 *
 * @apiSuccess {Boolean} success logout status.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *         "success": true
 *     }
 */
const userLogout = (req, res) => {
    res.cookie('token', '').json({ "success": true });
}
export default { userDetails, userRegister, userLogin, userLogout }