import dotenv from 'dotenv'
dotenv.config()

// Assign configs in ENV file to a module
const env = {
    db_url: process.env.DB_URL,
    secret: process.env.SECRET,
    port: process.env.PORT
};
export default env;