export default class Card {
  constructor (data, cardSelector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._element = this._getTemplate();
    this._elementLikeButton = this._element.querySelector('.element__button');
    this._elementDeleteButton = this._element.querySelector('.element__basket');
    this._elementPicturePopup = this._element.querySelector('.element__image');
    this._elementImage = this._element.querySelector('.element__image');
    this._elementTitle = this._element.querySelector('.element__title');
  }

   _getTemplate() { 
    const newCard = this._cardSelector.content.querySelector('.element').cloneNode(true);
    return newCard
  } 
  
  _setEventCardListeners () {
    // like
    this._elementLikeButton.addEventListener('click', () => this._likeButton());
    // delete
    this._elementDeleteButton.addEventListener('click', () => this._deleteCard());
    //picture
    this._elementPicturePopup.addEventListener('click', () => this._handleCardClick());
  }

  _deleteCard () {
    this._element.remove();
    this._element = null;
  }

  _likeButton () {
    this._elementLikeButton.classList.toggle('element__button-like_status_active');
  }

  generateCard () {
    this._setEventCardListeners();
    this._elementImage.src = this._link;
    this._elementImage.alt = this._name;
    this._elementTitle.textContent = this._name;
    return this._element;
  }
}