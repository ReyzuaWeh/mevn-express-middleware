const mongoose = require('mongoose');
const user = mongoose.model('user',
    {
        nama: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true
        },
        friends: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user'
        }]
    }
);
const cek = async () => {
    await mongoose.connect('mongodb://127.0.0.1:27017/data').then(data => {
        if (data) console.log('Berhasil');
    }).catch(err => {
        console.log('gagal');
    });
    const ambilRoot = await user.findOne({ nama: 'root' }).select('_id').catch(err => {
        console.log('error')
    });
    const userBaru = user.insertMany([{
        nama: 'User Baru 1',
        email: 'cek1@gmail.com',
        password: 'abcd',
        friends: ['66704ee1daaad79778c28fee']
    }]).then(data => {
        if (data) console.log('Berhasil tambah user : ', data);
    }).catch(err => {
        console.log('Gagal tambah user');
    });
    console.log(ambilRoot);
}
cek();
// const userBaru = new user({

// })