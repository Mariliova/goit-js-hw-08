import throttle from 'lodash.throttle';
import localStorageApi from './local-storage-api';

const STORAGE_KEY = 'feedback-form-state';

const refs = {
  form: document.querySelector('.feedback-form'),
};

populateInfo();

refs.form.addEventListener('input', throttle(onFormInput, 500));
refs.form.addEventListener('submit', onFormSubmit);

function onFormInput({ target }) {
  const { name, value } = target;
  const userInfo = localStorageApi.load(STORAGE_KEY) ?? {};

  userInfo[name] = value;
  localStorageApi.save(STORAGE_KEY, userInfo);
}

function onFormSubmit(e) {
  e.preventDefault();
  const { currentTarget: form } = e;
  const formData = new FormData(form);
  const userInfo = {};

  formData.forEach((value, key) => (userInfo[key] = value));
  console.log(userInfo);
  localStorageApi.remove(STORAGE_KEY);
  form.reset();
}

function populateInfo() {
  const savedData = localStorageApi.load(STORAGE_KEY);
  if (!savedData) {
    return;
  }
  Object.entries(savedData).forEach(
    ([name, value]) => (refs.form.elements[name].value = value)
  );
}
