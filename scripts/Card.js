import {openPicture, deleteCard, likeButton} from './utils/utils.js'

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

  _setEventCardListeners (element) {
    const cardImage = element.querySelector('.element__image');
    cardImage.addEventListener('click', openPicture);
    element.querySelector('.element__button').addEventListener('click', likeButton);
    element.querySelector('.element__basket').addEventListener('click', deleteCard);
}

  generateCard () {
    const card = this._createCard();
    this._setEventCardListeners(card);
    return card;
  }
}