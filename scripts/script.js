import Card from './Card.js';
export {list, openPopup, openPicture, closePopup, closePopupByOverlay, useEsc, deleteCard, likeButton, submitFormHandler, addCard}
import FormValidator from './FormValidator.js';
export {showError, hideError};

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

const popupGenerals = document.querySelectorAll('.popup');
const popupEdit = document.querySelector('.popup_edit');
const popupPenButton = document.querySelector('.profile__pen-button');
const profileAdd = document.querySelector('.profile__add');
const popupCloseBtns = document.querySelectorAll('.popup__close');
const popupAddElement = document.querySelector('.popup_add-card');
const popupOpenPicture = document.querySelector('.popup_open-photo');
const list = document.querySelector('.elements__cards');
const templateElement = document.querySelector('.element-template');
const submitBtnEdit = document.querySelector('.popup_edit .popup__inputs');
const popupPicture = document.querySelector('.popup__picture');
const popupTitle = document.querySelector('.popup__description');
const nameInput = document.querySelector('.popup__input_name_name');
const jobInput = document.querySelector('.popup__input_name_job');
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__subtitle');
const forms = document.querySelectorAll('.popup__inputs');

// открытие попапа
function openPopup(popup) {
  popup.classList.add('popup_opened');
  window.addEventListener('keydown', useEsc);
}

popupPenButton.addEventListener('click', function() {
  openPopup(popupEdit);
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
});

profileAdd.addEventListener('click', function() {
  openPopup(popupAddElement);
});

//открытие попапа по клику на картинку
const openPicture = function(evt){
  openPopup(popupOpenPicture);
  popupPicture.src = evt.target.src;
  popupPicture.alt = evt.target.alt;
  popupTitle.textContent = evt.target.alt;
}

// закрытие попапа
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  window.removeEventListener('keydown', useEsc);
}

popupCloseBtns.forEach(function(button) {
  button.addEventListener ('click', (evt) => {
    closePopup(evt.target.closest('.popup_opened'))
  });
});

function closePopupByOverlay(evt) {
  if (evt.target === evt.currentTarget) {
    closePopup(evt.target);
  }
}

popupGenerals.forEach(function(overlay) {
  overlay.addEventListener('click', closePopupByOverlay);
});

const useEsc = function (evt) {
  if (evt.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_opened');
    closePopup(popupOpened);
  }
}

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
  closePopup(evt.target.closest('.popup_opened'));
}

//карточки
function addCard (evt) {
  evt.preventDefault();
  const newInputTitle = evt.currentTarget.querySelector('.popup__input_title').value;
  const newInputLink = evt.currentTarget.querySelector('.popup__input_link').value;
  const caard = new Card(newInputTitle, newInputLink, templateElement);
  const inputForm = evt.currentTarget.querySelector('.popup__inputs');
  inputForm.reset();
  closePopup(evt.target.closest('.popup_opened'));
  caard.generateCard();
}

popupAddElement.addEventListener('submit', addCard);
submitBtnEdit.addEventListener('submit', submitFormHandler);

initialCards.forEach(function(element) {
  const card = new Card(element.name, element.link, templateElement);
  card.generateCard();
})

//валидация
const showError = (errorElement, inputElement, config) => {
  errorElement.textContent = inputElement.validationMessage;
  inputElement.classList.add(config.inputErrorClass);
  errorElement.classList.add(config.errorClass);
}

const hideError = (errorElement, inputElement, config) => {
  errorElement.textContent = inputElement.validationMessage;
  inputElement.classList.remove(config.inputErrorClass);
  errorElement.classList.remove(config.errorClass);
}

const validationConfig = {
    formSelector: '.popup__inputs',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup_type_error',
    errorClass: 'popup__inputs-error_active'
};

forms.forEach (function(element) {
  const formValidation = new FormValidator(validationConfig, element);
  formValidation.enableValidation()
}) 