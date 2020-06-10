const jwt = require('jsonwebtoken');
const config = require('config');

 
 const auth = (req, res, next) => {
    
        // Get token from header
        
        const token = req.header('x-auth-token');
        
        // check if token not valid
        
        if(!token){
            return res.status(401).json({msg: 'No token, Authorization denied'});
        }
        
        // verify token
        try {
            const decoded = jwt.verify(token, config.get('jwtSECRET'));
            
            req.user = decoded.user;
            next();
        
        } catch (err) {
            res.status(401).json({msg: ' Token is not valid'});
            
        
        }
    
    
};
 
module.exports = {auth};

