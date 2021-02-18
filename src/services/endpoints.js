const { BASE_URL } = require('./constants');

exports.PUBLIC_GET_TICKER = (ticker) => `${BASE_URL}/api/public`;
