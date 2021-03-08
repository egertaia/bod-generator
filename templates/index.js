const bodGradle = require('./bod.gradle');
const bodConfig = require('./BodConfig');
const bodOverlay = require('./BodOverlay');
const bodPlugin = require('./BodPlugin');
const bodMoving = require('./MovingTask');
const bodTask = require('./Task');
const bodTaskSet = require('./TaskSet');
const timeOutTask = require('./TimeoutTask');

module.exports = [
    bodGradle,
    bodConfig,
    bodOverlay,
    bodPlugin,
    bodMoving,
    bodTask,
    bodTaskSet,
    timeOutTask
];