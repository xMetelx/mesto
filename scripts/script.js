import Card from './Card.js';
import FormValidator from './FormValidator.js';
import {initialCards} from './utils/initial-cards.js';
import {openPopup, closePopup, resetAddForm, resetFormInputs} from './utils/utils.js';
import {validationConfig} from './utils/constants.js'

const popupGenerals = document.querySelectorAll('.popup');
const popupEdit = document.querySelector('.popup_edit');
const popupPenButton = document.querySelector('.profile__pen-button');
const profileAdd = document.querySelector('.profile__add');
const popupCloseBtns = document.querySelectorAll('.popup__close');
const popupAddElement = document.querySelector('.popup_add-card');
const list = document.querySelector('.elements__cards');
const templateElement = document.querySelector('.element-template');
const submitBtnEdit = document.querySelector('.popup_edit .popup__inputs');
const nameInput = document.querySelector('.popup__input_name_name');
const jobInput = document.querySelector('.popup__input_name_job');
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__subtitle');
const forms = document.querySelectorAll('.popup__inputs');
const addFormElement = document.querySelector('form[name="add-card"]');
const editFormElement = document.querySelector('form[name="edit-profile"]')

popupPenButton.addEventListener('click', function() {
  openPopup(popupEdit);
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
});

profileAdd.addEventListener('click', function() {
  openPopup(popupAddElement);
});

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

function submitEditProfileForm (evt) {
	evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(evt.target.closest('.popup_opened'));
}

//карточки
const createCard = (name, link) => {
  const card = new Card(name, link, templateElement);
  return card;
}

const renderCard = function (element) {
  list.prepend(element);
}

initialCards.forEach(function (element) { 
  const card = createCard(element.name, element.link);
  const generateCard = card.generateCard(); 
  renderCard(generateCard);
}) 

function addCard (evt) {
  evt.preventDefault();
  const newInputTitle = evt.currentTarget.querySelector('.popup__input_title').value;
  const newInputLink = evt.currentTarget.querySelector('.popup__input_link').value;
  const card = createCard(newInputTitle, newInputLink);
  closePopup(evt.target.closest('.popup_opened'));
  const cardForRender = card.generateCard();
  renderCard(cardForRender);
  resetAddForm(evt);
}

popupAddElement.addEventListener('submit', addCard);
submitBtnEdit.addEventListener('submit', submitEditProfileForm);

function addCardFormValidator() {
  const addFormValidation = new FormValidator(validationConfig, addFormElement);
  addFormValidation.enableValidation();
};

function editProfileFormValidator() {
  const editProfileValidation = new FormValidator(validationConfig, editFormElement);
  editProfileValidation.enableValidation();
}

addCardFormValidator();
editProfileFormValidator();
