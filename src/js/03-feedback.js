import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';

const refs = {
  form: document.querySelector('.feedback-form'),
  email: document.querySelector('[name="email"]'),
  message: document.querySelector('[name="message"]'),
};

populateInfo();

refs.form.addEventListener('input', throttle(onFormInput, 500));
refs.form.addEventListener('submit', onFormSubmit);

function onFormInput(e) {
  const formInfo = formData();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formInfo));
}

function onFormSubmit(e) {
  e.preventDefault();
  if (localStorage.getItem(STORAGE_KEY)) {
    localStorage.removeItem(STORAGE_KEY);
  }
  const formInfo = formData();
  console.log(formInfo);
  e.currentTarget.reset();
}

function populateInfo() {
  if (localStorage.getItem(STORAGE_KEY)) {
    const { email, message } = JSON.parse(localStorage.getItem(STORAGE_KEY));
    refs.email.value = email;
    refs.message.value = message;
  }
}

function formData() {
  const formData = new FormData(refs.form);
  const formInfo = {};
  formData.forEach((value, name) => (formInfo[name] = value));
  return formInfo;
}
