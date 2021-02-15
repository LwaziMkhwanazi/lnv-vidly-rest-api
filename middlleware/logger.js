import winston from "winston";
import 'winston-mongodb';
import config from "config";
 
const db = config.get('db')

const logger = winston.createLogger({
    transports: [
      new winston.transports.File(
        { filename: 'logFile.log',
         level:'info'}),
      new winston.transports.Console({level:'info'}),
      new winston.transports.MongoDB({
        db:db,
        level:'info',
        options:{useNewUrlParser: true,useUnifiedTopology:true}
      })
     ],
     exceptionHandlers:[
      new winston.transports.MongoDB({
        db:db,
         level:'error', 
      options:{useNewUrlParser: true,useUnifiedTopology:true}
    
    }), 
    new winston.transports.File({ filename: 'uncaughtExceptions.log', level:'error'}),
    new winston.transports.Console({level:'error'})
   ],
   exitOnError: true
  });

  export default logger;