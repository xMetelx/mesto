import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor (popupSelector, submitForm) {
    super(popupSelector);
    this._submitForm = submitForm;
    this._form = this._popupSelector.querySelector('.popup__inputs'); //убрать в константу
    this._popupInputList = this._form.querySelectorAll('.popup__input'); // убрать в константу
  }

  closePopup () { 
    super.closePopup();
    this._form.reset();
  }

  _getInputValues() { 
    this._popupValues = {}; // создание объекта
    // console.log(this._popupInputList) // nodes of inputs, title&link for add and name&job for edit
    this._popupInputList.forEach((element) => {
      this._popupValues[element.name] = element.value
    });
    console.log(this._popupValues);
    return this._popupValues;

    // должен вернуть объект {"name" : "Жак-Ив кусто", "about" : "Исследователь океана"} для EDIT и {"title" : "link" : } для ADD
  }

  // openPopup is heritaged from Popup

  setEventListeners () {
    super.setEventListeners();
    this._form.addEventListener('submit', () => {
      this._submitForm(this._getInputValues()); 
    }); 
  }
}
