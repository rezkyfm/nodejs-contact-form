// Import Package
const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const path = require('path');
const nodemailer = require('nodemailer');

const config = require('./config');

// Set Package
const app = express();

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Server Start Notification
app.listen(3000, () => console.log("Server Started on port 3000..."));

// Set Static Folder Path
app.use('/public', express.static(path.join(__dirname, 'public')));

// Get Index Page Request
app.get ('/', (req, res) => {
    res.render(config.theme);
});

// Post Email Request
app.post('/send', (req, res) => {

    // Email Template
    const output = `
        <p>You have a message</p>
        <h3>Contact Details</h3>
        <p>Name: ${req.body.name}</p>
        <p>Email: ${req.body.email}</p>
        <h3>Message</h3>
        <p>${req.body.message}</p>
    `;

    // Alert if successfully sending email
    const successAlert = `
        <div class="alert alert-success alert-dismissible fade show" role="alert">
                Message has been sent
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                </button>
        </div>
    `;

    // Alert if failed to sending email
    const failAlert = `
        <div class="alert alert-warning alert-dismissible fade show" role="alert">
                Failed to send message. Please refresh this page
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                </button>
        </div>
    `;


    // Create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
            host:  config.host,
            port: config.port,
            secure: false,
            auth: {
                    user: config.user,
                    pass: config.pass
            },
            tls:{
                rejectUnauthorized:false
            }
    });

    // Use this is you want to use Gmail SMTP
//     let transporter = nodemailer.createTransport(
//             `smtps://${config.user}:${config.pass}@smtp.gmail.com`
//     );

    // Setup email settings
    let mailOptions = {
            from: config.from,
            to: config.to,
            subject: config.subject,
            html: output
    };

    // Send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                    res.render(config.theme, {msg: failAlert});
            }

            res.render(config.theme, {msg: successAlert});
    });
});
