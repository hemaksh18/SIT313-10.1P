const express = require('express')
const bodyParser = require('body-parser')
const mailgun = require('mailgun-js')
const path = require('path')
const https = require('https')

var api_key = 'key-6cb6ef5357215f4a1f189e3fe44f54ac';
var domain = 'sandbox193cbe55c7594501b0f85d3fe0df672c.mailgun.org';

const mail = mailgun({ apiKey: api_key, domain: domain });


const application = express();
application.use(bodyParser.urlencoded({ extended: true }));

application.use(express.static(path.join(__dirname, 'public')));
application.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html")
});


application.post('/subscribe', (req, res) => {
    const Email = req.body.email
    console.log(Email)
    const to_say = {
        from: 'Hemaksh katal <hemaksh4791.be22@chitkara.edu.in>',
        to: `${Email}`,
        subject: 'greetings good human',
        text: 'Hope to work with you'
    };

    mail.messages().send(to_say, (error,body) => {

        if(error) {
            console.log(error);
            return res.status(500).send('Their is an error');
        }

        console.log(body);
        res.sendFile(__dirname + '/index.html');
        return res.status(500).send('email sent');
    });

});
