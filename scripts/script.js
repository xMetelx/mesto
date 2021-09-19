const popupElement = document.querySelector('.popup');
const popupOpenButtonElement = document.querySelector('.profile__pen-button');
const popupCloseButtonElement = document.querySelector('.popup__close');

let formElement = document.querySelector('.popup__inputs');
let nameInput = document.querySelector('.popup__input_name_name');
let jobInput = document.querySelector('.popup__input_name_job');
let profileName = document.querySelector('.profile__title');
let profileJob = document.querySelector('.profile__subtitle');

const openPopup = function() {
  popupElement.classList.add('popup_opened');
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}
const closePopup = function() {
  popupElement.classList.remove('popup_opened')
}

function submitFormHandler (evt) {
	evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup();
}
popupOpenButtonElement.addEventListener('click', openPopup);
popupCloseButtonElement.addEventListener('click', closePopup);
formElement.addEventListener('submit', submitFormHandler);