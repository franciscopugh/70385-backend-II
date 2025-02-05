import dotenv from 'dotenv'

const enviroment = "Development"

dotenv.config({
    path: enviroment==="Production" ? './.env.production' : './.env.development'
})

export default {
    user: process.env.USER,
    port: process.env.PORT,
    url_mongo: process.env.URL_MONGO,
    pass_mongo: process.env.PASS_MONGO
}