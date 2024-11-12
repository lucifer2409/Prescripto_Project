import jwt from 'jsonwebtoken';

const authadmin = async (req, res, next) => {
    try {
        const { atoken } = req.headers;
        console.log('Received Token:', atoken); // Log the token received from headers
        
        if (!atoken) {
            return res.json({ success: false, message: 'Atoken not provided!' });
        }

        const token_decode = jwt.verify(atoken, process.env.JWT_SECRET);
        console.log('Decoded Token:', token_decode); // Log decoded token content
        
        // Validate email and password from token
        if (token_decode.email !== process.env.ADMIN_EMAIL || token_decode.password !== process.env.ADMIN_PASSWORD) {
            return res.json({ success: false, message: 'Not authorized login again' });
        }

        next();
    } catch (error) {
        console.log('Token verification error:', error);
        res.json({ success: false, message: 'Token verification failed: ' + error.message });
    }
};

export default authadmin;
