import {list, openPicture, deleteCard, likeButton} from './script.js'

export default class Card {
  constructor (name, link, cardSelector) {
    this.name = name;
    this.link = link;
    this.cardSelector = cardSelector
  }

  _createCard () {
      const newCard = this.cardSelector.content.cloneNode(true);
      const cardImage = newCard.querySelector('.element__image');
      newCard.querySelector('.element__title').textContent = this.name;
      cardImage.src = this.link;
      cardImage.alt = this.name;
      return newCard
  } 

  _openPicture (picture) {
    const cardImage = picture.querySelector('.element__image');
    cardImage.addEventListener('click', openPicture);
  }    

  _like (like) {
    like.querySelector('.element__button').addEventListener('click', likeButton);
  }

  _delete (del) {
    del.querySelector('.element__basket').addEventListener('click', deleteCard);
  }

  _renderCard (card) {
    list.prepend(card);
  }

  generateCard () {
    const card = this._createCard();
    this._openPicture (card);
    this._like (card);
    this._delete (card)
    this._renderCard (card);
  }
}