import dotenv from 'dotenv'
dotenv.config()

// Assign configs in ENV file to a module
const env = {
    port: process.env.PORT
};
export default env;