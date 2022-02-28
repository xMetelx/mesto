export default class Card {
  constructor ({data, cardSelector, handleCardClick, handleLikeClick, handleCardDelete, api}) {
    this._myId = data.myId;
    this._ownerId = data.owner._id;
    this._id = data._id;
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this._handleCardDelete = handleCardDelete;
    this._element = this._getTemplate();
    this._elementLikeButton = this._element.querySelector('.element__button');
    this._elementDeleteButton = this._element.querySelector('.element__basket');
    this._elementPicturePopup = this._element.querySelector('.element__image');
    this._elementImage = this._element.querySelector('.element__image');
    this._elementTitle = this._element.querySelector('.element__title');
    this._like = this._element.querySelector('.element__like-counter');
    this._api = api;
  }

   _getTemplate() { 
    const newCard = this._cardSelector.content.querySelector('.element').cloneNode(true);
    return newCard
  } 
  
  _setEventCardListeners () {
    // like
    this._elementLikeButton.addEventListener('click', () => this._handleLikeClick(this));
    // delete
    this._elementDeleteButton.addEventListener('click', () => this._handleCardDelete(this));
    //picture
    this._elementPicturePopup.addEventListener('click', () => this._handleCardClick());
  }
  
  _deleteCard () {
    this._element.remove();
    this._element = null;
  }


  isLiked() {
    return this._likes.some(owner => this._myId === owner._id) //if true - card is liked
  }

  setLikes(data) {
    this._likes = data;
    this._updateLikeStatus();
    this._like.textContent = this._likes.length;
  }

  _updateLikeStatus () {
    this._elementLikeButton.classList.toggle('element__button-like_status_active');
  }

  generateCard () {
    if (this.isLiked()) {
      this._elementLikeButton.classList.add('element__button-like_status_active');
    };
    if (this._myId === this._ownerId) {
      this._elementDeleteButton.classList.add('element__basket_status_active');
    }
    this._setEventCardListeners();
    this._elementImage.src = this._link;
    this._elementImage.alt = this._name;
    this._elementTitle.textContent = this._name;
    this._like.textContent = this._likes.length;
    return this._element;
  }
}