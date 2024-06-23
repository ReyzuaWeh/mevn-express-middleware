const express = require('express');
const apiRouter = express.Router();
const chatModel = require('../models/chatModel');
const userModel = require('../models/userModel');

apiRouter.post('/kirim', async (req, res) => {
    try {
        const { pengirim, penerima, pesan } = req.body;
        const kirim = await chatModel.chat.create({ pengirim, penerima, pesan });
        res.status(201).json({ msg: 'Berhasil kirim chat', kirim });
    } catch (err) {
        res.status(400).json({ msg: 'Data yang diberi kurang tepat', error: err.message });
    }
});
apiRouter.post('/terima', async (req, res) => {
    try {
        const { id_pengirim, id_penerima } = req.body;
        const pengirim = await userModel.user.exists({ _id: id_pengirim });
        const penerima = await userModel.user.exists({ _id: id_penerima });
        if (!pengirim || !penerima) {
            return res.status(404).json({ msg: 'Data pengirim atau penerima tidak ditemukan' });
        }
        const chat = await chatModel.chat.find({
            pengirim: id_pengirim,
            penerima: id_penerima
        });
        res.status(201).json({ msg: 'Data chat ditemukan', chat });
    } catch (err) {
        res.status(400).json({ msg: 'Data yang diberi kurang tepat', error: err.message });
    }
});
apiRouter.delete('/hapus', async (req, res) => {
    res.status(202).send('Hapus Pesan');
});
module.exports = { apiRouter };