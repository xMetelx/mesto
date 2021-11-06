export default class FormValidator {
  constructor(validationConfig, form) {
    this.config = validationConfig;
    this.form = form;
  }

  _showError = (errorElement, inputElement) => {
    errorElement.textContent = inputElement.validationMessage;
    inputElement.classList.add(this.config.inputErrorClass);
    errorElement.classList.add(this.config.errorClass);
  }
  
  _hideError = (errorElement, inputElement) => {
    errorElement.textContent = '';
    inputElement.classList.remove(this.config.inputErrorClass);
    errorElement.classList.remove(this.config.errorClass);
  }
      
  _checkInputValidity (inputElement) {
    const isInputNotValid = !inputElement.validity.valid;
    const errorElement = this.form.querySelector(`.${inputElement.id}-error`);
      if (isInputNotValid) {
        this._showError(errorElement, inputElement);
      } else {
        this._hideError(errorElement, inputElement);
      }
  }

  _toggleButtonState (button, isActive) {
    if (isActive) {
      button.classList.remove(this.config.inactiveButtonClass);
      button.disabled = false;
    } else {
      button.classList.add(this.config.inactiveButtonClass);
      button.disabled = true;
    }
  } 

  _setEventListeners () {
    const inputsList = this.form.querySelectorAll(this.config.inputSelector);
    const submitButton = this.form.querySelector(this.config.submitButtonSelector);
    Array.from(inputsList).forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        const isFormValid = inputElement.checkValidity();
        this._checkInputValidity(inputElement);
        this._toggleButtonState(submitButton, isFormValid);
    })
  })
  
    this.form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._toggleButtonState(submitButton, false, this.config);
    })
  }

  enableValidation () {
    this._setEventListeners();
  }
}