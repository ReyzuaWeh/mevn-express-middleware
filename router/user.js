const express = require('express');
const apiRouter = express.Router();
const userModel = require('../models/userModel');
const pathApi = require('../utils/apiPath');

apiRouter.post('/friends', async (req, res) => {
    try {
        const user = req.session.user;
        if (!user) {
            return res.redirect(`${pathApi.pathAuth()}/login/check`);
        }
        const friends = await userModel.user.findById(user._id).select('friends');
        console.log(friends);
        res.status(200).json({ msg: 'Berhasil dapat data teman', user: friends });
    } catch (err) {
        res.status(500).json({ msg: 'Ada kesalahan', error: err.message });
    }
});

module.exports = { apiRouter };