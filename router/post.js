const express = require('express');
const apiRouter = express.Router();
const postModel = require('../models/postModel');

apiRouter.post('/read/post', async (req, res) => {
    postModel.post.find().then(result => {
        if (result) {
            res.status(200).json({ msg: 'Berhasil membaca post', result });
        }
    }).catch(err => {
        if (err) res.status(500).json({ msg: 'Terjadi kesalahan' });
    });
});
apiRouter.post('/read/post/:idUser', async (req, res) => {
    const { idUser } = req.params;
    if (!idUser) {
        return res.status(400).json({ msg: 'Isi ID' });
    }
    postModel.post.find({ user: idUser }).then(result => {
        if (!result.length) {
            return res.status(404).json({ msg: `Tidak ditemukan post dari ID User ${idUser}`, result });
        }
        res.status(200).json({ msg: `Berhasil membaca post dari ID User ${idUser}`, result });
    }).catch(err => {
        if (err) res.status(500).json({ msg: 'Terjadi kesalahan', error: err.message });
    });
});
apiRouter.post('/posting', async (req, res) => {
    const { user, post } = req.body;
    try {
        const posting = await postModel.post.create({ user, post });
        res.status(201).json({ msg: 'Berhasil posting', posting });
    } catch (err) {
        res.status(400).json({ msg: 'Gagal posting', error: err.message });
    }
});
apiRouter.patch('/posting/edit', async (req, res) => {
    const { id, post } = req.body;
    if (!id || !post) {
        return res.status(400).json({ msg: 'Isi request yang dibutuhkan' });
    }
    try {
        const dataAwal = await postModel.post.findById(id);
        const change = await postModel.post.findByIdAndUpdate(id,
            { post },
            { new: true, runValidators: true }
        );
        if (JSON.stringify(change) == JSON.stringify(dataAwal)) {
            await change.save();

            return res.status(200).json({ msg: `Data post id ${id} masih sama`, dataAwal, change });
        }
        change.updatedAt = Date.now();
        await change.save();
        res.status(201).json({ msg: `Berhasil ubah post id ${id}`, change });
    } catch (err) {
        res.status(400).json({ msg: 'Gagal edit', error: err });
    }
});
apiRouter.delete('/delete', async (req, res) => {
    const { id } = req.body;
    try {
        const deleted = await postModel.post.findByIdAndDelete(id);
        if (!deleted) {
            return res.status(404).json({ msg: 'Tidak ada yang dihapus', deleted });
        }
        res.status(201).json({ msg: 'Berhasil delete', deleted });
    } catch (err) {
        res.status(400).json({ msg: 'Gagal hapus', error: err.message });
    }
});

module.exports = { apiRouter };