const form = document.querySelector('.popup__inputs');
const formInput = form.querySelector('.popup__input');
const formError = form.querySelector(`.${formInput.id}-error`);

const isValid = () => {
  if (!formInput.validity.valid) {
    showInputError(formInput, formInput.validationMessage);
  } else {
    hideInputError(formInput);
  }
}

const showInputError = (element, errorMessage) => {
  element.classList.add('popup_type_error');
  formError.textContent = errorMessage;
  formError.classList.add('popup__inputs-error_active');
}

const hideInputError = (element) => {
  element.classList.remove('popup_type_error');
  formError.textContent = '';
  formError.classList.remove('popup__inputs-error_active');
}

form.addEventListener('submit', function(evt) {
  evt.preventDefault();
})

form.addEventListener('input', isValid);
