export { resetAddForm, resetFormInputs, closePopup, closePopupByEsc}





// Basket button

  
// // открытие попапов
//   function openPopup(popup) {
//     popup.classList.add('popup_opened');
//     window.addEventListener('keydown', closePopupByEsc);
//   }

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
