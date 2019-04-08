let request = require('request');
let color_from_status = require('./statuspage_colors.js');
let base36 = require('simple-base').base36;

function process(req, res, target) {
  var status_object = {
    color: color_from_status(req.body.page.status_indicator),
    pretext: req.body.page.status_description,
  };
  
  if (req.body.incident)
  {
    Object.assign(status_object, {
      fallback: '[' + req.body.incident.status + ']: ' + req.body.incident.name,
      title: req.body.incident.name + ' [' + req.body.incident.status + ']',
      title_link: req.body.incident.shortlink,
      text: req.body.incident.incident_updates[0].body
    });
  }
  else if (req.body.component)
  {
    Object.assign(status_object, {
      fallback: req.body.component.name + ': [' + req.body.component.status + ']',
      fields: [
        {
          title: req.body.component.name,
          value: req.body.component.status
        }
      ]
    });
  }
  
  request(
    {
      method: 'POST',
      uri: 'https://hooks.slack.com' + target,
      json: true,
      body: { attachments: [status_object] }
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
  process(req, res, req.path)
}

module.exports.raw = raw;
module.exports.encoded = encoded;
module.exports.percent_encoded = percent_encoded;
