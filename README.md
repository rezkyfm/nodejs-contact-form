# Node Contact Form
Contact form build with UIkit and Nodemailer

### Installation
Install the dependencies and start the server.
```sh
$ npm install
$ npm run start
```

### Configuration
Open config.js
```javascript
/* 
config.js
*/
module.exports = {
  //Theme
  theme: "lightBlue",

  //Email Account
  host: "smtp.mailtrap.io", //Change to your email smtp
  port: "465", //Change to your email port
  user: "user", //Change to your email username
  pass: "password", //Change to your email password

  //Email Message
  from: '"Contact Me" <noreply@example.com>', // Sender address
  to: 'youremail@.com', // List of receivers
  subject: 'Contact Us', // Subject
};
```

For more message configuration visit [Nodemailer Message Configuration](https://nodemailer.com/message/)
