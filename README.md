# Node Contact Form
Contact form build with Bootstrap and Nodemailer

### Demo
[Demo Page](https://rezkyfm.herokuapp.com)

### Installation
1. Install the dependencies and start the server.
```
$ git clone https://github.com/rezkyfm/nodejs-contact-form.git
$ cd nodejs-contact-form
$ npm install && npm start
```
2. Open in browser
```
http://localhost:3000
```
### Configuration
Open config.js
```javascript
/* 
config.js
*/
module.exports = {
    // Theme
    theme: "lightBlue",

    // Email notifier account (sender)
    host: "smtp.mailtrap.io", // Sender email smtp
    port: "465", // Sender email port
    user: "username", // Sender email username
    pass: "password", // Sender email password

    // Your email to receive notification (receiver)  
    from: '"Contact Me" <noreply@example.com>', // Sender email address
    to: 'email@example.com', // Your email address
    subject: 'Contact Us', // Subject
};
```

### Gmail SMTP Setup
1. Setup  [app password for gmail](https://support.google.com/accounts/answer/185833?hl=en)
2. Open app.js and change
```javascript
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
```

3. replace to
```javascript
let transporter = nodemailer.createTransport(
    `smtps://${config.user}:${config.pass}@smtp.gmail.com`
);
```

### Theme Screenshoot
#### lightBlue
![lightBlue](https://i.imgur.com/0I23zEr.png)
#### darkSky
![darkSky](https://i.imgur.com/YkCyI7D.png)