import {showError, hideError} from './script.js';

export default class FormValidator {
    constructor(validationConfig, form) {
      this.config = validationConfig;
      this.form = form;
    }
  
    _checkInputValidity (formElement, inputElement) {
      const isInputNotValid = !inputElement.validity.valid;
      const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
        if (isInputNotValid) {
          showError(errorElement, inputElement, this.config);
        } else {
          hideError(errorElement, inputElement, this.config);
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
          this._checkInputValidity(this.form, inputElement, this.config);
          this._toggleButtonState(submitButton, isFormValid, this.config);
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