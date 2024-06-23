const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session');
require('./utils/configDb');
const userModel = require('./models/userModel');
const app = express();
const port = 3000;
const crud = require('./router/crud');
const auth = require('./router/auth');
const userRouter = require('./router/user');
const chatRouter = require('./router/chat');

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST']
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

app.use('/api/v1/crud', crud.apiRouter);
app.use('/api/v1/auth', auth.apiRouter);
app.use('/api/v1/user', userRouter.apiRouter);
app.use('/api/v1/chat', chatRouter.apiRouter);
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
});
// app.use((req, res) => {
//     res.status(404).send('<h1>404 Not Found</h1>');
// })
app.listen(port, () => {
    console.log(`Listening in http://localhost:${port}`);
});