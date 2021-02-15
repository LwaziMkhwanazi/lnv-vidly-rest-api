import "express-async-errors"
import express from "express";
import handleRoutes from "./startUpFile/routes.js";
import dataBase from "./startUpFile/db.js";
import config from "./startUpFile/config.js"
import logger from "./middlleware/logger.js"
import prodMiddleWare from "./startUpFile/prod.js"

const app = express()

config()
handleRoutes(app)
dataBase()
prodMiddleWare(app)

console.log(app.get('env'))

process.on('uncaughtException',(ex)=>{logger.error(ex.message,ex)})
process.on('unhandledRejection',(ex)=>{throw ex });  
const port = process.env.PORT || 3000
 app.listen(port,logger.info(`Listening on port ${port}`))




