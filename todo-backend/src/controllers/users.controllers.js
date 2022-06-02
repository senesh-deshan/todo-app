
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'
import User from '../models/user.js';
import env from '../../config.js'

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

const userLogout = (req, res) => {
    res.cookie('token', '').json({ "success": true });
}
export default { userDetails, userRegister, userLogin, userLogout }