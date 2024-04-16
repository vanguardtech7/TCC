const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'sla265827@gmail.com',
    pass: 'gcnl nudy knns hbya'
  }
});

module.exports = transporter;
