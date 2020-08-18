const express = require('express');
const Nexmo = require('nexmo');
const path = require('path');

// init Nexmo
const nexmo = new Nexmo({
    apiKey: 'f5bb9ec9',
    apiSecret: 'Fs02Rjte6LD6Q8Ae',
}, {debug: true});

// init app
const app = express();

// Parsing body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Post Handler Route
app.post('/', (req, res) => {
    const number = req.body.number;
    const text = req.body.message;

    nexmo.message.sendSms(
        '+2348025405767', number, text, { type: 'unicode'},
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

//Serve static asset in production
if(process.env.NODE_ENV) {
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    });
}

// Port
const port = process.env.PORT || 4000;

// Server
const server = app.listen(port, () => console.log(`Server started on port ${port}`));
