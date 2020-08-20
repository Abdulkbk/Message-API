const express = require('express');
const Nexmo = require('nexmo');
const path = require('path');

// Keys
const {apiKey, apiSecret, sender} = require('./config/keys')

// init app
const app = express()
const PORT = process.env.PORT || 4000;

// init Nexmo
const nexmo = new Nexmo({
    apiKey,
    apiSecret,
}, {debug: true});

// Parsing Data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Handling incomings from client
app.post('/', (req, res) => {
    const number = req.body.number;
    const text = req.body.message;

    nexmo.message.sendSms(
        sender, number, text, { type: 'unicode'},
        (err, resData) => {
            if (err) {
                console.log(err)
            } else {
                const data = {
                    id: resData.messages[0]['message-id'],
                    receiver: resData.messages[0]['to']
                }

                res.send(data);
            }
        }
    );
});

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build',  'index.html'))
    });
}

app.listen(PORT, () => console.log(`Server started at port ${PORT}`));