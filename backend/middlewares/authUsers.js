import jwt from 'jsonwebtoken';

const authuser = async (req, res, next) => {
    try {
        const { token } = req.headers;    
        if (!token) {
            return res.json({ success: false, message: 'token not provided!' });
        }
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);
        req.body.userId = token_decode.id;
        next();
    } catch (error) {
        console.log('Token verification error:', error);
        res.json({ success: false, message: 'Token verification failed: ' + error.message });
    }
};


export default authuser;
