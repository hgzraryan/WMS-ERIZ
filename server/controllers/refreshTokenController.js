const User = require('../model/User');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const handleRefreshToken = async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(401);

    const refreshToken = cookies.jwt;
    
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });

    const foundUser = await User.findOne({ refreshToken }).exec();
	
	
    // Detected refresh token reuse!
    if (!foundUser) {
        jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET,
            async (err, decoded) => {
                if (err) return res.sendStatus(403); //Forbidden
                console.log('attempted refresh token reuse!')
                const hackedUser = await User.findOne({ username: decoded.username }).exec();
                if (hackedUser) {
					hackedUser.refreshToken = [];
					const result = await hackedUser.save();
					console.log(result);
				}
            }
        )
        return res.sendStatus(403); //Forbidden
    }

    const newRefreshTokenArray = foundUser.refreshToken.filter(rt => rt !== refreshToken);

    // evaluate jwt 
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        async (err, decoded) => {
            if (err) {
                console.log('expired refresh token')
                foundUser.refreshToken = [...newRefreshTokenArray];
				try {
					const result = await foundUser.save();
					console.log(result);
				 } catch (error) {
					 
					 if (error instanceof mongoose.Error.VersionError) {
                        // Refetch user and retry save
                        const latestUser = await User.findById(foundUser._id).exec();
                        latestUser.refreshToken = [...newRefreshTokenArray];
                        const retryResult = await latestUser.save();
                        console.log(retryResult);
                    } else {
                        console.error(error);
                    }
				 }	 
            }
            if (err || foundUser.username !== decoded.username) return res.sendStatus(403);

            // Refresh token was still valid
            const roles = Object.values(foundUser.roles);
            const accessToken = jwt.sign(
                {
                    "UserInfo": {
                        "username": decoded.username,
                        "roles": roles
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '10s' }
            );

            const newRefreshToken = jwt.sign(
                { "username": foundUser.username },
                process.env.REFRESH_TOKEN_SECRET,
                { expiresIn: '1d' }
            );
			
			
			
            // Saving refreshToken with current user
            foundUser.refreshToken = [...newRefreshTokenArray, newRefreshToken];
			
			
			
			 try {
			
				const result = await foundUser.save();
				console.log(result);
            } catch (error) {
                if (error instanceof mongoose.Error.VersionError) {
                    // Refetch user and retry save
                    const latestUser = await User.findById(foundUser._id).exec();
                    latestUser.refreshToken = [...newRefreshTokenArray, newRefreshToken];
                    const retryResult = await latestUser.save();
                    console.log(retryResult);
                } else {
                    console.error(error);
                }
            }
			
			
			

            // Creates Secure Cookie with refresh token
            res.cookie('jwt', newRefreshToken, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 });

            res.json({ roles, accessToken })
        }
    );
}

module.exports = { handleRefreshToken }