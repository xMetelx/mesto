import './index.css';

import {Api} from '../components/Api.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import {validationConfig} from '../components/utils/constants.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupDeleteCard from '../components/PopupDeleteCard.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo';
import {popupEditProfile, popupAddCard, popupOpenPicture, popupEditButton, popupAddButton, elementsList, templateElement, profileName, profileJob,  nameEditProfile, jobEditProfile, popupEditAvatar, avatarEditButton, profilePhoto, deleteCardForm} from '../components/utils/constants.js';

// информация о пользователе
const userInfo = new UserInfo(profileName, profileJob, profilePhoto);

// создание секции
const sectionElement = new Section(
  [],
  elementsList,
  (item) => {
    const card = renderCard(item);
    sectionElement.addItem(card, 'after')}
  )

//API
const api = new Api ({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-34',
  headers: {
    authorization: '0f69491b-0019-450c-bcd2-9a7eeaa1d51b',
    'Content-Type': 'application/json'
  }
})

Promise.all([api.getUserInfo(), api.getCards()])
  .then(([dataUser, dataCards]) => {
    userInfo.setUserInfo({name: dataUser.name, about: dataUser.about, id: dataUser._id, avatar: dataUser.avatar});
    sectionElement.renderItems(dataCards);
  })
  .catch((err) => {
    console.log(err);
  })

function renderCard(data) {
  const myId = userInfo.getUserInfo().id
  const card = new Card ({
    data: {...data, myId},
    template: templateElement, 
    handleCardClick: () => {
      openPopupWithPicture.openPopup({name: data.name, link: data.link}) 
    },
    handleLikeClick: (card) => { 
      if(!card.isLiked()){
        api.setCardLike(card._id)
        .then(data => {
          card.setLikes(data.likes)
        })
        .catch((err) => console.log(err))
      } else {
        api.deleteCardLike(card._id)
          .then(data => {
            card.setLikes(data.likes)
          })
          .catch((err) => console.log(err))
  }},
    handleCardDelete: (card) => {
      deleteCardPopup.openPopup(card);
 }
});
  return card.generateCard();
}

// delete card
const deleteCardPopup = new PopupDeleteCard (deleteCardForm, deleteCardElement);
deleteCardPopup.setEventListeners();

function deleteCardElement (card) {
  api.removeCard(card._id)
    .then(() => {
      card.deleteCard(card);
      deleteCardPopup.closePopup();
    })
    .catch(err => console.log(err))
  }

popupAddButton.addEventListener('click', () => { 
  addCardPopup.openPopup(); 
  FormValidators['add-card'].resetValidation(false);
});

// добавить карточку
function submitCardForm (data) { 
  addCardPopup.loadingStatus(true);
  api.postCard(data.title, data.link)
    .then((res) => {
      sectionElement.addItem(renderCard(res), 'before');
      addCardPopup.closePopup();
    })
    .catch(err => {console.log(err)})
    .finally(() => {
      addCardPopup.loadingStatus(false);
    })
}

const addCardPopup = new PopupWithForm(popupAddCard, submitCardForm);

addCardPopup.setEventListeners(); 

// редактировать данные
function submitEditForm(data) {
  editProfilePopup.loadingStatus(true);
  api.patchProfile(data.name, data.about)
  .then(() => {
    userInfo.setUserInfo(data);
    editProfilePopup.closePopup();
  })
  .catch(err => {console.log(err)})
  .finally(() => {
    editProfilePopup.loadingStatus(false);
  })
};

const editProfilePopup = new PopupWithForm(popupEditProfile, submitEditForm);

editProfilePopup.setEventListeners(); 

function editFormSubmit() { 
  const user = userInfo.getUserInfo();
  editProfilePopup.openPopup();
  nameEditProfile.value = user.name;
  jobEditProfile.value = user.job;
  FormValidators['edit-profile'].resetValidation(false);
}

popupEditButton.addEventListener('click', editFormSubmit);

// открыть картинку
const openPopupWithPicture = new PopupWithImage(popupOpenPicture);
openPopupWithPicture.setEventListeners();

//попап редактирования аватара
function submitEditAvatar (data) {
  editAvatarPopup.loadingStatus(true);

  
  api.patchAvatar(data.avatar)
    .then(() => {
      userInfo.setUserInfo(data)
      editAvatarPopup.closePopup();

    })
    .catch(err => {console.log(err)})
    .finally(() => {
      editAvatarPopup.loadingStatus(false);
    })
}

const editAvatarPopup = new PopupWithForm(popupEditAvatar, submitEditAvatar);

editAvatarPopup.setEventListeners();

avatarEditButton.addEventListener('click', () => { 
  editAvatarPopup.openPopup();
  FormValidators['change-avatar'].resetValidation(false);
});

//вызов валидации

const FormValidators = {};

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement);
    const formName = formElement.getAttribute('name');
    FormValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(validationConfig);