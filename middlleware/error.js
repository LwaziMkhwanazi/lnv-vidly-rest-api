
import logger from "./logger.js"

function errorHanlder(err,req,res,next){
   logger.error(err.message,err)
    res.status(500).send('Something Failed Could not process Request')
}

export default errorHanlder