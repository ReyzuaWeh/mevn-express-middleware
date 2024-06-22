const express = require('express');
const apiRouter = express.Router();
const userModel = require('../models/userModel');

apiRouter.post('/login', async (req, res) => {
    try {
        const usernameAuth = await userModel.user.findOne({
            nama: req.body.nama,
            password: req.body.password
        });
        const emailAuth = await userModel.user.findOne({
            email: req.body.nama,
            password: req.body.password
        });
        if (!usernameAuth && !emailAuth) {
            return res.status(401).json({ msg: 'Failed to find user' });
        }
        req.session.user = usernameAuth ? usernameAuth : emailAuth;
        res.status(200).json({ msg: 'Masuk login', user: req.session.user, value: true });
    } catch (err) {
        res.status(401).json({ msg: 'failed to authentication', error: err.message })
    }
});
apiRouter.get(`/login/check`, async (req, res) => {
    const user = req.session.user;
    if (!user) {
        return res.status(401).json({ msg: 'tidak memiliki akses' });
    }
    res.status(200).json({ msg: 'diizinkan', user });
});
apiRouter.post('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            res.status(500).json({ msg: 'Tidak berhasil logout', error: err.message });
        }
        res.status(201).json({ msg: 'Berhasil logout' });
    })
});

module.exports = { apiRouter };