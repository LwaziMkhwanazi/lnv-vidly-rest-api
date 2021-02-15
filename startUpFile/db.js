import logger from '../middlleware/logger.js';
import mongoose from "mongoose";
import config from "config";


function dataBase() {
    const db = config.get('db')
    mongoose.connect(db,{useNewUrlParser:true,useUnifiedTopology:true,useCreateIndex:true,useFindAndModify:false})
    .then( ()=>{logger.info(`Connected to ${db}...`) })
}
export default dataBase;