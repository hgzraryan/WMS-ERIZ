const User = require('../model/User');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const handleRefreshToken = async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(401);

    const refreshToken = cookies.jwt;

    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: process.env.NODE_ENV === 'production' });

    const foundUser = await User.findOne({ refreshToken }).exec();
    if (!foundUser) {
        // Token reuse detection
        jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET,
            async (err, decoded) => {
                if (err || !decoded) return res.sendStatus(403);
                console.log('Attempted refresh token reuse!');
                
                const hackedUser = await User.findOne({ username: decoded.username }).exec();
                if (hackedUser) {
                    hackedUser.refreshToken = [];
                    await hackedUser.save();
                }
                return res.sendStatus(403);
            }
        );
        return;
    }

    const newRefreshTokenArray = foundUser.refreshToken.filter(rt => rt !== refreshToken);

    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        async (err, decoded) => {
            if (err || !decoded) {
                foundUser.refreshToken = newRefreshTokenArray;
                try {
                    await foundUser.save();
                } catch (error) {
                    if (error instanceof mongoose.Error.VersionError) {
                        const latestUser = await User.findById(foundUser._id).exec();
                        latestUser.refreshToken = newRefreshTokenArray;
                        await latestUser.save();
                    } else {
                        console.error(error);
                    }
                }
                return res.sendStatus(403);
            }

            if (foundUser.username !== decoded.username) return res.sendStatus(403);

            const roles = Object.values(foundUser.roles);
            const accessToken = jwt.sign(
                {
                    "UserInfo": {
                        "username": decoded.username,
                        "roles": roles
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '15m' }
            );

            const newRefreshToken = jwt.sign(
                { "username": foundUser.username },
                process.env.REFRESH_TOKEN_SECRET,
                { expiresIn: '1d' }
            );

            foundUser.refreshToken = [...newRefreshTokenArray, newRefreshToken];
            
            try {
                await foundUser.save();
            } catch (error) {
                if (error instanceof mongoose.Error.VersionError) {
                    const latestUser = await User.findById(foundUser._id).exec();
                    latestUser.refreshToken = [...newRefreshTokenArray, newRefreshToken];
                    await latestUser.save();
                } else {
                    console.error(error);
                }
            }

            res.cookie('jwt', newRefreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'None',
                maxAge: 24 * 60 * 60 * 1000
            });
            res.json({ roles, accessToken });
        }
    );
};


module.exports = { handleRefreshToken }