const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('./utils/configDb');
const userModel = require('./models/userModel');
const app = express();
const port = 3000;
const router = require('./router/crud');

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST']
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api/v1/crud', router.apiRouter);
app.get('/', (req, res) => {
    res.send('Hello World');
});
app.get('/api/login/:nama', async (req, res) => {
    try {
        const cekUser = await userModel.user.find({ nama: req.params.nama });
        res.status(200).json({
            message: cekUser
        });
    } catch (err) {
        res.status(401);
    }
})
app.post('/api/login', async (req, res) => {
    try {
        const cekUser = await userModel.user.find({ nama: req.body.nama });
        if (cekUser.length > 0) {
            res.status(200).json({ message: cekUser });
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})
app.listen(port, () => {
    console.log(`Listening in http://localhost:${port}`);
});