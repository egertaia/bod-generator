const improvedTimeout = require('./TimeoutTask');
const improvedPlugin = require('./BodPlugin');
const improvedConditionTimeout = require('./ConditionTimeout');
const improvedTimeoutWhile = require('./TimeoutWhile');
const improvedTimeoutUntil = require('./TimeoutUntil');

module.exports = [
    improvedTimeout,
    improvedPlugin,
    improvedConditionTimeout,
    improvedTimeoutWhile,
    improvedTimeoutUntil,
];