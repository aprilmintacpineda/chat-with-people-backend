export default (name, token) => (`
  <p>Dear ${name},</p>
  <br>
  <p>We are glad that you decided to join as in our platform. Before you can log in, we require that you first verify your email address by simply clicking the link below. It  will take you to the platform and verify your email.</p>
  <p>Please don't share this email or any of its content to anyone else.</p>
  <p>We hope that you have fun and that you get to make new friends. Just be very careful, we don't control who registers to the platform, that's why it can be used to harass other people or spam other people.</p>
  <br>
  <p><a href="http://localhost:3000/auth/register/${token}">Verify my email address</a></p>
  <br>
  <p>Sincerely,</p>
  <p>Your friends at <strong>Chat-With-People</strong></p>
`);