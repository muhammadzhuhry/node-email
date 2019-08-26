const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const email = require('./helper/sendEmail');

const app = express();

// connect to mongodb
mongoose.connect('mongodb://localhost:27017/nodemailer-test', {
  useNewUrlParser: true
})
  .then(() => console.log(`MongoDB connected...`))
  .catch(err => console.log(err));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// load model
require('./models/user.model');
const User = mongoose.model('user');

const port = 9000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

// route
app.get('/', (req, res) => {
  res.send({
    'success': true,
    'code': 200,
    'message': 'This server running properly',
    'data': ''
  })
});

app.post('/user', (req, res) => {
  const payload = { ...req.body };
  
  User.create(payload, async (err, value) => {
    if (err) {
      return res.send({
        'success': false,
        'code': 500,
        'message': 'An error has occured',
        'data': ''
      })
    }

    await email.sendMailRegister(payload);
    res.send({
      'success': true,
      'code': 200,
      'message': 'User has been inserted',
      'data': value
    })
  });
});