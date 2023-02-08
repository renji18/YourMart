const admin = async (req, res, next) => {
  if(req.user.role !== 'admin')
    return next(new Error('Unauthorized Access'))
    
  next()
}

module.exports=admin