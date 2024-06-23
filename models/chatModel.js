const mongoose = require('mongoose');
const userModel = require('./userModel');

const chatSchema = new mongoose.Schema({
    pengirim: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'Perlu pengirim'],
        ref: 'user'
    },
    penerima: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'Perlu penerima'],
        ref: 'user'
    },
    pesan: {
        type: String,
        required: [true, 'Perlu pesan berupa text']
    }
});
chatSchema.pre('save', async function (next) {
    try {
        const adaPengirim = await userModel.user.exists({ _id: this.pengirim });
        const adaPenerima = await userModel.user.exists({ _id: this.penerima });
        if (!adaPengirim) {
            return next(new Error('Pengirim tidak ada dalam data'));
        }
        if (!adaPenerima) {
            return next(new Error('Penerima tidak ada dalam data'));
        }
        return next();
    } catch (err) {
        console.log('Error : ', err.message);
        return next(err);
    }
})
const chat = mongoose.model('chat', chatSchema);

module.exports = { chat };