import Popup from "./Popup.js";

export default class PopupDeleteCard extends Popup {
  constructor(popup, deleteCardElement) {
    super(popup);
    this._button = this._popup.querySelector('.popup__button');
    this._deleteCardElement = deleteCardElement;
  }

  openPopup(card) {
    this._card = card;
    super.openPopup();
  }

  setEventListeners() {
    super.setEventListeners();
    this._button.addEventListener('click', () => {
      this._deleteCardElement(this._card);
    });
  }
}