//Import Package
const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const path = require('path');
const nodemailer = require('nodemailer');

const config = require('./config');

//Set Package
const app = express();

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//Server Start Notification
app.listen(3000, () => console.log("Server Started..."));

//Set Static Folder Path
app.use('/public', express.static(path.join(__dirname, 'public')));

//Get Index Page Request
app.get ('/', (req, res) => {
  res.render(config.theme);
});

//Post Emaul Request
app.post('/send', (req, res) => {

  //Email Template
  const output = `
    <p>You have a message</p>
    <h3>Contact Details</h3>
    <p>Name: ${req.body.name}</p>
    <p>Email: ${req.body.email}</p>
    <h3>Message</h3>
    <p>${req.body.message}</p>
  `;

  //Alert if success sending email
  const successAlert = `
    <div class="uk-alert-success" uk-alert>
        <a class="uk-alert-close" uk-close></a>
        <p>Message has been sent</p>
    </div>
  `;

  //Alert if fail sending email
  const failAlert = `
    <div class="uk-alert-warning" uk-alert>
        <a class="uk-alert-close" uk-close></a>
        <p>Failed to send message. Please refresh this page</p>
    </div>
  `;


  // create reusable transporter object using the default SMTP transport
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

    // setup email data with unicode symbols
    let mailOptions = {
        from: config.from,
        to: config.to,
        subject: config.subject,
        html: output
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            res.render(config.theme, {msg: failAlert});
        }

        res.render(config.theme, {msg: successAlert});
    });
  });
