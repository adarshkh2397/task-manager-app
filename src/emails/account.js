const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: "adscot.23@gmail.com",
    subject: "Thanks for signing up!",
    text: `welcome to task manager app ${name}`,
  });
};

const sendCancellationEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: "adscot.23@gmail.com",
    subject: "Cancellation of subscription",
    text: `Your subscription has been successfully cancelled ${name}`,
  });
};

module.exports = {
  sendWelcomeEmail,
  sendCancellationEmail,
};
