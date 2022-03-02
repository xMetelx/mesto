import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor (popup, api) {
    super(popup);
    this._popupPicture = this._popup.querySelector('.popup__picture');
    this._popupTitle = this._popup.querySelector('.popup__description');
  }

  openPopup ({name, link}) {
    this._popupPicture.src = link;
    this._popupPicture.alt = name;
    this._popupTitle.textContent = name;
    super.openPopup();
  }
 }
