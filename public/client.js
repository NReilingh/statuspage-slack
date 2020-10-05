const translatorForm = document.getElementById('translatorForm');
const translatorInput = document.getElementById('translatorInput');
const translatorComponent = document.getElementById('translatorComponent');
const translatorIncident = document.getElementById('translatorIncident');

translatorForm.onsubmit = function(event) {
  event.preventDefault();

  let slackURL = translatorInput.value;

  let type;
  if (!translatorComponent.checked && translatorIncident.checked) {
    type = "incident";
  } else if (!translatorIncident.checked && translatorComponent.checked) {
    type = "component";
  }

  translatorInput.value = 'https://statuspage-slack.vercel.app/services/' + slackURL.split('services/')[1].trim() + (type ? '?type=' + type : '');

  translatorInput.focus();
  translatorInput.select();
};
