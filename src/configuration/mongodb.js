const { environment } = require("./environment");

const MONGO_URI = environment.MONGO_URI;

const ADVANCED_OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

module.exports = { ADVANCED_OPTIONS, MONGO_URI };
