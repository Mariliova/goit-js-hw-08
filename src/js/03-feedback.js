import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';
const formData = {};

const refs = {
  form: document.querySelector('.feedback-form'),
  emailInput: document.querySelector('[name="email"]'),
  messageText: document.querySelector('[name="message"]'),
};

populateInfo();

refs.form.addEventListener('input', throttle(onFormInput, 500));
refs.form.addEventListener('submit', onFormSubmit);

function onFormInput(e) {
  formData[e.target.name] = e.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function onFormSubmit(e) {
  e.preventDefault();
  if (localStorage.getItem(STORAGE_KEY)) {
    localStorage.removeItem(STORAGE_KEY);
  }
  e.currentTarget.reset();
  Object.keys(formData).forEach(key => delete formData[key]);
}

function populateInfo() {
  if (localStorage.getItem(STORAGE_KEY)) {
    const { email, message } = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (email) {
      refs.emailInput.value = email;
    }
    if (message) {
      refs.messageText.value = message;
    }
  }
}
