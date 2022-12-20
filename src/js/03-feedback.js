import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';
let formData = {};

const refs = {
  form: document.querySelector('.feedback-form'),
  email: document.querySelector('[name="email"]'),
  message: document.querySelector('[name="message"]'),
};

populateInfo();

refs.form.addEventListener('input', throttle(onFormInput, 500));
refs.form.addEventListener('submit', onFormSubmit);

function onFormInput(e) {
  if (localStorage.getItem(STORAGE_KEY)) {
    const { email, message } = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (email) {
      formData.email = email;
    }
    if (message) {
      formData.message = message;
    }
  }
  formData[e.target.name] = e.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function onFormSubmit(e) {
  e.preventDefault();
  if (localStorage.getItem(STORAGE_KEY)) {
    localStorage.removeItem(STORAGE_KEY);
  }
  e.currentTarget.reset();
  console.log(formData);
  formData = {};
}

function populateInfo() {
  if (localStorage.getItem(STORAGE_KEY)) {
    const { email, message } = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (email) {
      refs.email.value = email;
    }
    if (message) {
      refs.message.value = message;
    }
  }
}
