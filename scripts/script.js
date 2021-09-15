const popupElement = document.querySelector('.popup');
const popupOpenButtonElement = document.querySelector('.profile__pen-button');
const popupCloseButtonElement = document.querySelector('.popup__close');

// Находим форму в DOM
let formElement = document.querySelector('.popup__inputs')


const openPopup = function() {
  popupElement.classList.add('popup__opened')
}

const closePopup = function() {
  popupElement.classList.remove('popup__opened')
}


function submitFormHandler (evt) {
	evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
												// Так мы можем определить свою логику отправки.
												// О том, как это делать, расскажем позже.

// 	// Находим поля формы в DOM
	let nameInput = document.querySelector('.popup__input_name_name');
  let jobInput = document.querySelector('.popup__input_name_job');


// 	// Получите значение полей из свойства value
  let nameValue = nameInput.value;
  let jobValue = jobInput.value;


// 	// Выберите элементы, куда должны быть вставлены значения полей
  let profileTitle = document.querySelector('.profile__title');
  let profileSubtitle = document.querySelector('.profile__subtitle');

// 	// Вставьте новые значения с помощью textContent
  profileTitle.textContent = nameValue;
  profileSubtitle.textContent = jobValue;

  closePopup();
}

popupOpenButtonElement.addEventListener('click', openPopup);
popupCloseButtonElement.addEventListener('click', closePopup);

// // Прикрепляем обработчик к форме:
// // он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', submitFormHandler);