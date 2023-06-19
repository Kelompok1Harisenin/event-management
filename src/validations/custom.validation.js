const { messages } = require('../utils');

const password = (value, helpers) => {
  if (value.length < 8) {
    return helpers.message(messages.PASSWORD_CHARACTERS_LENGTH);
  }
  if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
    return helpers.message(messages.PASSWORD_REGEX_MATCH);
  }
  return value;
};

module.exports = {
  password,
};
