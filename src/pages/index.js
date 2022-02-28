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
import {popupEditProfile, popupAddCard, popupOpenPicture, popupEditButton, popupAddButton, elementsList, templateElement, profileName, profileJob, addFormElement, editFormElement, nameEditProfile, jobEditProfile, popupEditAvatar, avatarEditButton, profilePhoto, editAvatarElement, deleteCardForm} from '../components/utils/constants.js';

// информация о пользователе
const userInfo = new UserInfo(profileName, profileJob, profilePhoto);

// создание секции
const sectionElement = new Section(
  [],
  elementsList,
  (item) => {
    const card = cardRender(item);
    sectionElement.addItem(card, 'after')}
  )

//API
const api = new Api (
  sectionElement,
  userInfo
)

api.getUserInfo()
  .then(data => {
    userInfo.setUserInfo({name: data.name, about: data.about, id: data._id});
    userInfo.setAvatar(data.avatar)
  })
  .catch((err) => {
    console.log(err);
  })

function cardRender(data) {
  const myId = userInfo.getUserInfo().id
  const card = new Card ({
    data: {...data, myId},
    cardSelector: templateElement, 
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

api.getCards()
.then(data => {
  const dataList = data.map((elem) => ({name: elem.name, link: elem.link, id: elem._id}));
  api._section._items = dataList;
  api._section.renderItems(data);
})
.catch((err) => {
  console.log(err);
})

// delete card
const deleteCardPopup = new PopupDeleteCard (deleteCardForm, deleteCardElement);
deleteCardPopup.setEventListeners();

function deleteCardElement (card) {
  api.removeCard(card._id)
    .then(() => {
      card._deleteCard(card);
      deleteCardPopup.closePopup();
    })
    .catch(err => console.log(err))
  }

popupAddButton.addEventListener('click', () => { 
  addCardPopup.openPopup(); 
  addCardFormValidating.resetValidation(false);
});

// добавить карточку
function submitCardForm (data) { 
  addCardPopup.loadingStatus(true);
  api.postCard(data.title, data.link)
    .then((res) => {
      sectionElement.addItem(cardRender(res), 'before');
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
    userInfo.setUserInfo({name: data.name, about: data.about});
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
  editProfileFormValidating.resetValidation(true);
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
      userInfo.setAvatar(data.avatar)
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
  editAvatarFormValidation.resetValidation(true);
});

//вызов валидации

function addCardFormValidator() {
  const addFormValidation = new FormValidator(validationConfig, addFormElement);
  addFormValidation.enableValidation();
  return addFormValidation;
}

function editProfileFormValidator() {
  const editProfileValidation = new FormValidator(validationConfig, editFormElement);
  editProfileValidation.enableValidation();
  return editProfileValidation;
}

function editAvatarFormValidator() {
  const editAvatarFormValidation = new FormValidator(validationConfig, editAvatarElement);
  editAvatarFormValidation.enableValidation();
  return editAvatarFormValidation;
}

const addCardFormValidating = addCardFormValidator();
const editProfileFormValidating = editProfileFormValidator();
const editAvatarFormValidation = editAvatarFormValidator(); // use with submit button
