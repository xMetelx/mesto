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

// открытие попапа
function openPopup(popup) {
  popup.classList.add('popup_opened');
  popup.addEventListener('keydown', escFunction);
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
  popup.removeEventListener('keydown', escFunction);
}

popupCloseBtns.forEach(function(button) {
  button.addEventListener ('click', (evt) => {
    closePopup(evt.target.closest('.popup_opened'))
  });
});

function closePopupByOverlay(evt) {
  if (evt.target === evt.currentTarget) {
    closePopup(evt.target.closest('.popup_opened'));
  }
}

popupGenerals.forEach(function(overlay) {
  overlay.addEventListener('click', closePopupByOverlay);
});

const escFunction = function (popupGenerals) {
  popupGenerals.addEventListener('keydown', function (evt) {
    if (evt.key === 'Escape') {
      console.log('проверка');
      closePopup(evt.target.closest('.popup_opened'));
  };
});
}

// Basket button
const deleteCard = function (evt) {
  evt.target.closest('.element').remove();
}

// LIKE button
const likeButton = function(evt) {
  evt.target.classList.toggle('element__button-like_status_active');
}

function createCard(newInputTitle, newInputLink) { 
  const newCard = templateElement.content.cloneNode(true);
  const cardImage = newCard.querySelector('.element__image');
  cardImage.addEventListener('click', openPicture);
  newCard.querySelector('.element__title').textContent = newInputTitle;
  cardImage.src = newInputLink;
  cardImage.alt = newInputTitle;
  newCard.querySelector('.element__button').addEventListener('click', likeButton);
  newCard.querySelector('.element__basket').addEventListener('click', deleteCard);
  return newCard;
}

function submitFormHandler (evt) {
	evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(evt.target.closest('.popup_opened'));
}

//карточки
function renderCard (newInputTitle, newInputLink) {
  const newCard = createCard(newInputTitle, newInputLink);
  list.prepend(newCard);
}

function addCard (evt) {
  evt.preventDefault();
  const newInputTitle = evt.currentTarget.querySelector('.popup__input_title').value;
  const newInputLink = evt.currentTarget.querySelector('.popup__input_link').value;
  renderCard(newInputTitle, newInputLink);
  const inputForm = evt.currentTarget.querySelector('.popup__inputs');
  inputForm.reset();
  closePopup(evt.target.closest('.popup_opened'));
}

initialCards.forEach(function(element) {
  renderCard(element.name, element.link);
});

popupAddElement.addEventListener('submit', addCard);
submitBtnEdit.addEventListener('submit', submitFormHandler);