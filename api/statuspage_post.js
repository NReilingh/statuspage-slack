const request = require('request');

const parseNotification = require('../private/parseNotification.js');

module.exports = (req, res) => {
  const target = new URL(req.url, `http://${req.headers.host}`).pathname;

  const { type, attachment } = parseNotification(req.body);

  if (
    req.query.type === "component" && type !== "component"
    || req.query.type === "incident" && type !== "incident"
  ) {
    res.status(200).send();
    return;
  }

  const message_payload = {
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

      res.status(200).send();
    }
  );
};
