export default class Card {
  constructor (data, cardSelector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick
  }

   _getTemplate() { 
    const newCard = this._cardSelector.content.querySelector('.element').cloneNode(true);
    return newCard
  } 
  
  _setEventCardListeners () {
    // like
    this._element.querySelector('.element__button').addEventListener('click', () => this._likeButton());
    // delete
    this._element.querySelector('.element__basket').addEventListener('click', () => this._deleteCard());
    //picture
    this._element.querySelector('.element__image').addEventListener('click', () => this._handleCardClick());
  }

  _deleteCard () {
    console.log(this._element);
    this._element.remove();
    this._element = null;
  }

  _likeButton () {
    this._element.querySelector('.element__button').classList.toggle('element__button-like_status_active');
  }

  generateCard () {
    this._element = this._getTemplate();
    this._setEventCardListeners();
    this._element.querySelector('.element__image').src = this._link;
    this._element.querySelector('.element__image').alt = this._name;
    this._element.querySelector('.element__title').textContent = this._name;

    return this._element;
  }
}