const bodGradle = require('./bod.gradle');
const bodConfig = require('./BodConfig');
const bodOverlay = require('./BodOverlay');
const bodMoving = require('./MovingTask');
const bodTask = require('./Task');
const bodTaskSet = require('./TaskSet');

module.exports = [
    bodGradle,
    bodConfig,
    bodOverlay,
    bodMoving,
    bodTask,
    bodTaskSet,
];