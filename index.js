const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

// connect to mongodb
mongoose.connect('mongodb://localhost:27017/nodemailer-test', {
  useNewUrlParser: true
})
  .then(() => console.log(`MongoDB connected...`))
  .catch(err => console.log(err));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const port = 9000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

// route
app.get('/', (req, res) => {
  res.send({
    'success': true,
    'code': 200,
    'data': '',
    'message': 'This server running properly'
  })
});



