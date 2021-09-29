const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const popupElement = document.querySelector('.popup__edit');
const popupOpenButtonElement = document.querySelector('.profile__pen-button');
const profileAdd = document.querySelector('.profile__add');
const popupCloseButtonElement = document.querySelectorAll('.popup__close');
const popupAddElement = document.querySelector('.popup__add-card');
const popupOpenPicture = document.querySelector('.popup__open-photo');
const list = document.querySelector('.elements__cards');
const templateElement = document.querySelector('.element-template');
const addCardButton = document.querySelector('.popup__add-card .popup__button');
const likeButtonActive = document.querySelector('.element__button-like_status_active');

let formElement = document.querySelector('.popup__inputs');
let nameInput = document.querySelector('.popup__input_name_name');
let jobInput = document.querySelector('.popup__input_name_job');
let profileName = document.querySelector('.profile__title');
let profileJob = document.querySelector('.profile__subtitle');

// открытие попапа №1
const openPopup = function() {
  popupElement.classList.add('popup_opened');
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}
popupOpenButtonElement.addEventListener('click', openPopup);

// открытие попапа №2
const openAdd = function() {
  popupAddElement.classList.add('popup_opened');
}
profileAdd.addEventListener('click', openAdd);

//открытие попапа по клику на картинку
const openPicture = function(evt){
  popupOpenPicture.classList.add('popup_opened');
  const popupPicture = document.querySelector('.popup__picture');
  popupPicture.src = evt.target.src;
  const popupTitle = document.querySelector('.popup__description');
  popupTitle.textContent = evt.target.parentElement.querySelector('.element__title').textContent;
}

// закрытие попапа
const closePopup = function() {
  popupElement.classList.remove('popup_opened');
  popupAddElement.classList.remove('popup_opened');
  popupOpenPicture.classList.remove('popup_opened');
}
popupCloseButtonElement.forEach (function(i, index) {
    i.addEventListener ('click', closePopup);
  }
);

// Basket button
const deleteCard = function (evt) {
  evt.target.closest('.element').remove();
}

// LIKE button
const likeButton = function(evt) {
  evt.target.classList.toggle('element__button-like_status_active');
}

function submitFormHandler (evt) {
	evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup();
}

//карточки
function renderCard (newInputTitle, newInputLink) {
  const newCard = templateElement.content.cloneNode(true);
  newCard.querySelector('.element__image').addEventListener('click', openPicture);
  newCard.querySelector('.element__title').textContent = newInputTitle;
  newCard.querySelector('.element__image').src = newInputLink;
  newCard.querySelector('.element__button').addEventListener('click', likeButton);
  newCard.querySelector('.element__basket').addEventListener('click', deleteCard)
  list.prepend(newCard);
  closePopup();
}

function addCard (evt) {
  evt.preventDefault();
  const newInputTitle = evt.currentTarget.querySelector('.popup__input_title').value;
  const newInputLink = evt.currentTarget.querySelector('.popup__input_link').value;
  renderCard(newInputTitle, newInputLink);
  const inputForm = evt.currentTarget.querySelector('.popup__inputs');
  inputForm.reset();
}

function createCards () {
  for (i = 0; i < initialCards.length; i += 1) {
    renderCard(initialCards[i].name, initialCards[i].link);
  }
}
createCards();

popupAddElement.addEventListener('submit', addCard);
formElement.addEventListener('submit', submitFormHandler);