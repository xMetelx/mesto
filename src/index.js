import './pages/index.css';

import Card from './components/Card.js';
import FormValidator from './components/FormValidator.js';
import {initialCards} from './components/utils/initial-cards.js';
import {validationConfig} from './components/utils/constants.js';
import PopupWithForm from './components/PopupWithForm.js';
import PopupWithImage from './components/PopupWithImage.js';
import Section from './components/Section.js';
import UserInfo from './components/UserInfo';
import {popupEditProfile, popupAddCard, popupOpenPicture, popupEditButton, popupAddButton, elementsList, templateElement, profileName, profileJob, addFormElement, editFormElement, nameEditProfile, jobEditProfile} from './components/utils/constants.js';

// информация о пользователе

const userInfo = new UserInfo(profileName, profileJob);
userInfo.setUserInfo('Жак-Ив Кусто', 'Исследователь океана');
const getUserInfo = userInfo.getUserInfo();

function getProfile () {
  profileName.textContent = getUserInfo.name;
  profileJob.textContent = getUserInfo.job
}
getProfile();

//вызов валидации

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

// добавить карточку

const addCardPopup = new PopupWithForm(popupAddCard, submitCardForm);

popupAddButton.addEventListener('click', () => { 
  addCardPopup.openPopup(); 
});

function submitCardForm (dataFromForm) { 
  sectionElement.addItem(cardRender({name : dataFromForm.title, link : dataFromForm.link}), 'before'); 
  addCardPopup.closePopup();
}

addCardPopup.setEventListeners(); 

// редактировать данные

function submitEditForm() {
  userInfo.setUserInfo(nameEditProfile.value, jobEditProfile.value);
  userInfo.updateUserInfo();
  editProfilePopup.closePopup();
};

const editProfilePopup = new PopupWithForm(popupEditProfile, submitEditForm);

editProfilePopup.setEventListeners(); 

function editFormSubmit() { 
  const user = userInfo.getUserInfo();
  editProfilePopup.openPopup();
  nameEditProfile.value = user.name;
  jobEditProfile.value = user.job;
}

popupEditButton.addEventListener('click', editFormSubmit);

// открыть картинку

const openPopupWithPicture = new PopupWithImage(popupOpenPicture);
openPopupWithPicture.setEventListeners();

// рендеринг карточек из массива данных
const sectionElement = new Section(initialCards, elementsList, (item) => {
  const card = cardRender(item);
  sectionElement.addItem(card, 'after')
});
sectionElement.renderItems();

// создание экземпляра класса карточки
function cardRender(data) {
  const card = new Card (data, templateElement, () => {
    openPopupWithPicture.openPopup({name: data.name, link: data.link}) 
  });

  return card.generateCard();
}