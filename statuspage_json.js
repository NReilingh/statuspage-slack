const fs = require('fs');
const request = require('request');
const base36 = require('simple-base').base36;
const parseNotification = require('./parseNotification.js');

// Just researching potential for improvement.
// I promise I won't do anything nasty with your Slack workspace ID.
const logAppend = fs.createWriteStream('./.data/incomingLog.ndjson', { flags: 'a+' });

function process(req, res, target) {
  logAppend.write(JSON.stringify({
    date: new Date().toISOString(),
    target: target,
    body: req.body
  }) + "\n");

  const { page_status, attachment } = parseNotification(req.body);

  const message_payload = {
    text: page_status,
    attachments: [attachment]
  };

  request(
    {
      method: 'POST',
      uri: 'https://hooks.slack.com' + target,
      json: true,
      body: message_payload
    },
    function (error, response, body) {
      if (response.statusCode !== 200) {
        console.error('error:', error);
        console.error('statusCode:', response && response.statusCode);
        console.error('body:', body);
        res.status(response.statusCode).send(body);
        return;
      }

      res.sendStatus(200);
    }
  );
}

function percent_encoded(req, res) {
  process(req, res, "/services/" + decodeURIComponent(req.params.percent_encoded_string));
}

function encoded(req, res) {
  process(req, res, "/services/" + base36.decode(req.params.base36_encoded_string));
}

function raw(req, res) {
  process(req, res, req.path);
}

exports.raw = raw;
exports.encoded = encoded;
exports.percent_encoded = percent_encoded;
