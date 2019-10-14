/* global SimpleBase */
// client-side js
// run by the browser each time your view template is loaded

console.log('hello world :o');

// define variables that reference elements on our page
const translatorForm = document.getElementById('translatorForm');
const translatorInput = document.getElementById('translatorInput');

// listen for the form to be submitted and add a new dream when it is
translatorForm.onsubmit = function(event) {
  // stop our form submission from refreshing the page
  event.preventDefault();

  // get dream value and add it to the list
  let slackURL = translatorInput.value;
  console.log(slackURL.split('services/'));

  // reset form 
  translatorInput.value = 'https://statuspage-slack-translator.herokuapp.com/services/' + slackURL.split('services/')[1];
  
  translatorInput.focus();
  translatorInput.select();
};
