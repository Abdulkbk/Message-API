const express = require('express');
const Nexmo = require('nexmo');
const socketio = require('socket.io');
const ejs = require('ejs');

// init Nexmo
const nexmo = new Nexmo({
    apiKey: 'f5bb9ec9',
    apiSecret: 'Fs02Rjte6LD6Q8Ae',
}, {debug: true});

// init app
const app = express();

// Template setup
app.set('view engine', 'html');
app.engine('html', ejs.renderFile);

// Parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Get Routes
app.get('/', (req, res) => {
    res.render('index');
});

// Post Route
app.post('/', (req, res) => {
    // res.send(req.body);
    console.log(req.body);
    const number = req.body.number;
    const text = req.body.text;

    nexmo.message.sendSms(
        '+2348025405767', number, text, { type: 'unicode'},
        (err, resData) => {
            if (err) {
                console.log(err)
            } else {
                const data = {
                    id: resData.messages[0]['message-id'],
                    number: resData.messages[0]['to']
                }

                //Emit to client
                io.emit('smsStatus', data);
            }
        }
    );
});


// Public folder
app.use(express.static('public'));

// Port
const port = 3000;

// Server
const server = app.listen(port, () => console.log(`Server started on port ${port}`));

// Connect to socket.io
const io = socketio(server);
io.on('connection', socket => {
    console.log('Connected io');
    io.on('disconnect', () => {
        console.log('Disconnected');
    })
});