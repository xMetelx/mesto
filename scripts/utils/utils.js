export {deleteCard, likeButton, openPopup, openPicture, resetAddForm, resetFormInputs, closePopup, closePopupByEsc}

// Basket button
const deleteCard = function (evt) {
    evt.target.closest('.element').remove();
  }

// LIKE button
  const likeButton = function(evt) {
    evt.target.classList.toggle('element__button-like_status_active');
  }
  
// открытие попапов
  function openPopup(popup) {
    popup.classList.add('popup_opened');
    window.addEventListener('keydown', closePopupByEsc);
  }

//открытие попапа по клику на картинку
const openPicture = function(evt){
  const popupOpenPicture = document.querySelector('.popup_open-photo');
  const popupPicture = document.querySelector('.popup__picture');
  const popupTitle = document.querySelector('.popup__description');
  openPopup(popupOpenPicture);
  popupPicture.src = evt.target.src;
  popupPicture.alt = evt.target.alt;
  popupTitle.textContent = evt.target.alt;
}

//ресет формы
const resetAddForm = function (evt) {
  const inputForm = evt.currentTarget.querySelector('.popup__inputs'); 
  inputForm.reset();
  const button = evt.currentTarget.querySelector('.popup__button');
  button.disabled = false;
}

// убрать ошибки валидации при открытии попапа
const resetFormInputs = function (evt) {
  const inputForm = evt.querySelector('.popup__inputs');
  if(inputForm != null) {
  const formErrors = evt.querySelectorAll('.popup__inputs-error');
  const formEmphasizes = evt.querySelectorAll('.popup__input');
  inputForm.reset();
  formErrors.forEach(function(element){
    element.innerHTML = '';
  })
  formEmphasizes.forEach(function(element) {
    element.classList.remove('popup_type_error');
  });
  }
}

// закрытие попапа
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  window.removeEventListener('keydown', closePopupByEsc);
  resetFormInputs(popup);
}

//закрытие попапа по ESC
const closePopupByEsc = function (evt) {
  if (evt.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_opened');
    closePopup(popupOpened);
  }
}
