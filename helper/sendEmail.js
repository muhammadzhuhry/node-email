const fs = require('fs');
const mustache = require('mustache');
const nodemailer = require('nodemailer');

module.exports = {
  async sendMailRegister(payload) {
    const template = fs.readFileSync('./helper/template.html', 'utf8');

    const config = {
      service: 'gmail',
      auth: {
        user: 'youremail@gmail.com',
        pass: 'yourpassword'
      }
    };
    const transporter = await nodemailer.createTransport(config);
    const mail = {
      to: payload.email,
      from: 'node-email@gmail.com',
      subject: '[Node Email] - Success Registration',
      html: mustache.to_html(template, { ...payload })
    };
    transporter.sendMail(mail);
  }
};