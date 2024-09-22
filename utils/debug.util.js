const debug = require('debug')('ecommerce-api:log');
debug.log = console.log.bind(console);

const log = (...log) => {
    debug(log);
};
module.exports = log;
