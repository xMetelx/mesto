export default class Popup {
  constructor (popupSelector) { 
    this._popupSelector = popupSelector;
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  openPopup () {
    this._popupSelector.classList.add('popup_opened');
    window.addEventListener('keydown', this._handleEscClose); 
  }

  closePopup () {
    this._popupSelector.classList.remove('popup_opened');
    window.removeEventListener('keydown', this._handleEscClose); 
  }

  _handleEscClose (evt) {
    if (evt.key === 'Escape') {
      this.closePopup();
    }
  }

  _handleOverlayClose (evt) {
    if (evt.target === evt.currentTarget) {
      this.closePopup(evt);
    }
  }

  setEventListeners () {
    this._popupSelector.addEventListener('click', (evt) => {
      this._handleOverlayClose(evt);
    });
    this._popupSelector.querySelector('.popup__close').addEventListener('click', () => { 
      this.closePopup();
    });
  };
}


