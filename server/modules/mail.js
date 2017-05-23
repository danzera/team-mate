var nodemailer = require('nodemailer');
// create reusable transporter object using the default SMTP transport
var transporter = nodemailer.createTransport({
  service: process.env.MAIL_PROVIDER,
  auth: {
    user: process.env.EMAIL_ADDRESS,
    pass: process.env.EMAIL_PW
  }
});

function invite(toEmail, teamName) {
  var subject = 'Invitation to Join ' + teamName + '!';
  var emailBody = 'You have been invited to join ' + teamName + ' on TeamMate! Please visit https://team-mate-app.herokuapp.com/, create an account, if you haven\'t already, and login to accept your invitation.';
  var mailOptions = {
    from: '"TeamMate" ' + process.env.EMAIL_ADDRESS,
    to: toEmail,
    subject: subject,
    text: emailBody,
    html: emailBody
  };
  console.log('attempting to send email invitation:', mailOptions);
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      return console.log('error sending invitation email', error);
    }
    console.log('Message %s sent: %s', info.messageId, info.response);
  });
}

module.exports = {
  invite: invite
};