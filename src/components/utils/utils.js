export { resetAddForm, resetFormInputs, closePopup, closePopupByEsc}


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