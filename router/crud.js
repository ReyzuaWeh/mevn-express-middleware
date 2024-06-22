const express = require('express');
const apiRouter = express.Router();
const userModel = require('../models/userModel');

apiRouter.post('/create', async (req, res) => {
    try {
        const create = await userModel.user.create({
            nama: req.body.nama,
            email: req.body.email,
            password: req.body.password
        });
        res.status(201).json(create);
    } catch (err) {
        res.status(400).json(err);
    }
});
apiRouter.post('/read', async (req, res) => {
    const users = await userModel.user.find();
    res.status(200).json({
        users
    });
});

apiRouter.post('/update', async (req, res) => {
    try {
        const { nama, email, password, id } = req.body;
        if (!id) {
            return res.status(400).json({
                msg: 'masukkan id!',
            });
        }
        const userLama = await userModel.user.findById(id)
        const user = await userModel.user.findByIdAndUpdate(id, {
            nama: nama || userLama.nama,
            email: email || userLama.email,
            password: password || userLama.password,
        }, {
            new: true,
            runValidators: true
        });
        if (JSON.stringify(user) === JSON.stringify(userLama)) {
            return res.status(201).json({
                msg: 'data masih sama',
                user
            });
        }
        console.log('berubah');
        res.status(201).json({
            msg: 'berhasil update',
            user
        });
    } catch (err) {
        res.status(400).json({
            msg: 'Kesalahan',
            err
        });
    }
});
apiRouter.post('/delete', async (req, res) => {
    userModel.user.findByIdAndDelete(req.body.id).then(data => {
        if (!data) {
            return res.status(404).json({ msg: 'Tidak ada data yang dihapus' });
        }
        res.status(201).json({
            msg: 'Berhasil hapus',
            data
        });
    }).catch(err => {
        res.status(400).json({ error: err.message });
    });
});
module.exports = { apiRouter }