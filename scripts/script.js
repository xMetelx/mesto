import Card from './Card.js';
import FormValidator from './FormValidator.js';
import {initialCards} from './utils/initial-cards.js';
import {validationConfig} from './utils/constants.js'
import PopupWithForm from './PopupWithForm.js';
import PopupWithImage from './PopupWithImage.js'
import Section from './Section.js';
import UserInfo from './UserInfo.js';

// здесь потом все надо почистить и сложить константы в отдельный файл
const popupEdit = document.querySelector('.popup_edit');
const popupPenButton = document.querySelector('.profile__pen-button');
const profileAddButton = document.querySelector('.profile__add');
const addPopupElement = document.querySelector('.popup_add-card');
const list = document.querySelector('.elements__cards');
const templateElement = document.querySelector('.element-template');
const submitEditButton = document.querySelector('.popup_edit .popup__inputs');
const submitAddButton = document.querySelector('.popup_add-card .popup__button'); // button
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__subtitle');
const forms = document.querySelectorAll('.popup__inputs');
const addFormElement = document.querySelector('form[name="add-card"]');
const editFormElement = document.querySelector('form[name="edit-profile"]');
const popupOpenPicture = document.querySelector('.popup_open-photo');

const nameEditProfile = document.querySelector('.popup__input_name_name');
const jobEditProfile = document.querySelector('.popup__input_name_job')

const userInfo = new UserInfo(profileName, profileJob);
userInfo.setUserInfo('Жак-Ив Кусто', 'Исследователь океана');
const getUserInfo = userInfo.getUserInfo();

function profileNaming () {
  profileName.textContent = getUserInfo.name;
  profileJob.textContent = getUserInfo.job
}
profileNaming();

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

// добавить карточку по кнопке с крестиком

const addCardPopup = new PopupWithForm(addPopupElement, submitCardForm);

profileAddButton.addEventListener('click', () => { 
  addCardPopup.openPopup(); 
});

function submitCardForm (dataFromForm) { 
  sectionElement.addItem(cardRender({name : dataFromForm.title, link : dataFromForm.link}), 'before'); 
  addCardPopup.closePopup(); // form validation is reseted in class
}

submitAddButton.addEventListener('submit', submitCardForm);

addCardPopup.setEventListeners(); 

// редактировать данные по кнопке с ручкой

const editCardPopup = new PopupWithForm(popupEdit, editFormSubmit);

function editFormSubmit() { 
  const user = userInfo.getUserInfo();
  editCardPopup.openPopup();
  nameEditProfile.value = user.name;
  jobEditProfile.value = user.job;
}

popupPenButton.addEventListener('click', editFormSubmit);

submitEditButton.addEventListener('submit', (evt) => { 
  evt.preventDefault()
  userInfo.setUserInfo(nameEditProfile.value, jobEditProfile.value);
  userInfo.updateUserInfo();

})
editCardPopup.setEventListeners(); 

// открытие картинки попапа

const openPopupWithPicture = new PopupWithImage(popupOpenPicture);

openPopupWithPicture.setEventListeners();

// рендеринг карточек из массива данных
const sectionElement = new Section(initialCards, list, (item) => {
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