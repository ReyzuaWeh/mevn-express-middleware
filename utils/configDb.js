const mongoose = require('mongoose');
require('dotenv').config();
mongoose.connect(process.env.DATABASE).then(cek => {
    if (cek) {
        console.log('Berhasil konek')
    }
}).catch(err => {
    if (err) console.log('Gagal konek', err);
});

