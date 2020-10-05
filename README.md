Statuspage-Slack Webhook Translator
=================

This project translates webhooks from Atlassian Statuspage for consumption by Slack Incoming WebHooks.

Feel free to make use of the live version deployed to Vercel: https://statuspage-slack.vercel.app/

The webpage at the deployed app describes all of the features, but basically:

All you have to do to use this service is to take your Slack webhook endpoint (which looks something like this):

    https://hooks.slack.com/services/T00000000/B00000000/XXXXXXXXXXXXXXXXXXXXXXXX

And change the domain to match this application, like:

    https://statuspage-slack.vercel.app/services/T00000000/B00000000/XXXXXXXXXXXXXXXXXXXXXXXX

... before feeding it into a Statuspage webhook subscription.
This app doesn't maintain any state, so it just translates the Statuspage webhook content into a Slack message payload, and forwards it to the equivalent Slack endpoint.
