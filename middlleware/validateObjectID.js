import mongoose from "mongoose";
function ValidateObjectId(req,res,next) {
    if(!mongoose.Types.ObjectId.isValid(req.params.id))
    return res.status(400).send('Invalid Id')
    next()
}

export default ValidateObjectId