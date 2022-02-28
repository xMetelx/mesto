import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor (popup, submitForm) {
    super(popup);
    this._submitForm = submitForm;
    this._form = this._popup.querySelector('.popup__inputs');
    this._popupInputList = this._form.querySelectorAll('.popup__input');
    this._submitButton = this._form.querySelector('.popup__button');
  }

  closePopup () { 
    super.closePopup();
    this._form.reset();
  }

  _getInputValues() { 
    this._popupValues = {}; // создание объекта
    this._popupInputList.forEach((element) => {
      this._popupValues[element.name] = element.value
    });
     return this._popupValues;
  }

  setEventListeners () {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitForm(this._getInputValues()); 
    });
  }

  loadingStatus (isLoading) {
    if (isLoading) {
      this._submitButton.textContent = 'Сохранение...';
    } else {
      this._submitButton.textContent = 'Сохранить';
    }
  }
}