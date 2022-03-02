export default class Popup {
  constructor (popup) { 
    this._popup = popup;
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  openPopup () {
    this._popup.classList.add('popup_opened');
    window.addEventListener('keydown', this._handleEscClose); 
  }

  closePopup () {
    this._popup.classList.remove('popup_opened');
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
    this._popup.addEventListener('mousedown', (evt) => {
      this._handleOverlayClose(evt);
    });
    this._popup.querySelector('.popup__close').addEventListener('click', () => { 
      this.closePopup();
    });
  };
}


