const twilio = require("twilio");
const { environment } = require("./environment");

const twilioClient = twilio(
  environment.TWILIO_ACCOUNT_SID,
  environment.TWILIO_AUTH_TOKEN
);

module.exports = {
  twilioClient,
};
