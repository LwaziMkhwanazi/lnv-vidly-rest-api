function admin(req,res,next){
    if(!req.user.isAdmin) return res.status(403).send('Acces Denied, You are not allowed to make changes in this resorce')
    next()
}
export default admin