const showError = (errorElement, inputElement, config) => {
  errorElement.textContent = inputElement.validationMessage;
  inputElement.classList.add(config.inputErrorClass);
  errorElement.classList.add(config.errorClass);
}

const hideError = (errorElement, inputElement, config) => {
  errorElement.textContent = inputElement.validationMessage;
  inputElement.classList.remove(config.inputErrorClass);
  errorElement.classList.remove(config.errorClass);
}

const checkInputValidity = (formElement, inputElement, config) => {
  const isInputNotValid = !inputElement.validity.valid;
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    if (isInputNotValid) {
      showError(errorElement, inputElement, config);
    } else {
      hideError(errorElement, inputElement, config);
    }
}

const toggleButtonState = (button, isActive, config) => {
  if (isActive) {
    button.classList.remove(config.inactiveButtonClass);
    button.disabled = false;
  } else {
    button.classList.add(config.inactiveButtonClass);
    button.disabled = true;
  }
}

const setEventListeners = (formElement, config) => {
  const inputsList = formElement.querySelectorAll(config.inputSelector);
  const submitButton = formElement.querySelector(config.submitButtonSelector);
  Array.from(inputsList).forEach(inputElement => {
    inputElement.addEventListener('input', () => {
      const isFormValid = formElement.checkValidity();
      checkInputValidity(formElement, inputElement, config);
      toggleButtonState(submitButton, isFormValid, config);
  })
})

  formElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
  })
}

const enableValidation = (config) => {
  const forms = document.querySelectorAll(config.formSelector);
  Array.from(forms).forEach(formElement => {
    setEventListeners(formElement, config);
    })
}

validationConfig = {
    formSelector: '.popup__inputs',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup_type_error',
    errorClass: 'popup__inputs-error_active'
};

enableValidation(validationConfig);

