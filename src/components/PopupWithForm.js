import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor (popupSelector, submitForm) {
    super(popupSelector);
    this._submitForm = submitForm;
    this._form = this._popupSelector.querySelector('.popup__inputs');
    this._popupInputList = this._form.querySelectorAll('.popup__input');
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
    this._form.addEventListener('submit', () => {
      this._submitForm(this._getInputValues()); 
    });
  }
}