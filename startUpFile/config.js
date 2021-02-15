import config from "config";

function configData(params) {  
if(!config.get('jwtPrivateKey')){
    throw new Error('Fatal Error: jwtPrivatekey is not defined')
    }
    if(process.env.NODE_ENV === "production"){
        config.get('db')
    }
}

export default configData