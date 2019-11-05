var config = require('./config.json');
var AWS = require('aws-sdk');

AWS.config.update({
    accessKeyId: config.accessKeyId,
    secretAccessKey: config.secretAccessKey,
    region: config.region
});

let S3 = new AWS.S3();

module.exports = S3;