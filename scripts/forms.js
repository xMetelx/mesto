// console.log('Hello world!')

// // Находим форму в DOM
// let formElement = document.querySelector('.popup__inputs')



// function formSubmitHandler (evt) {
// 	evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
// 												// Так мы можем определить свою логику отправки.
// 												// О том, как это делать, расскажем позже.

// // 	// Находим поля формы в DOM
// 	let nameInput = document.querySelector('.popup__input_name');
//   let jobInput = document.querySelector('.popup__input_job');


// // 	// Получите значение полей из свойства value
//   let nameValue = nameInput.value;
//   let jobValue = jobInput.value;


// // 	// Выберите элементы, куда должны быть вставлены значения полей
//   let profileTitle = document.querySelector('.profile__title');
//   let profileSubtitle = document.querySelector('.profile__subtitle');

// // 	// Вставьте новые значения с помощью textContent
//   profileTitle.textContent = nameValue;
//   profileSubtitle.textContent = jobValue;
  
// }

// // // Прикрепляем обработчик к форме:
// // // он будет следить за событием “submit” - «отправка»
// formElement.addEventListener('submit', formSubmitHandler);


// const initialCards = [
//   {
//     name: 'Архыз',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
//   },
//   {
//     name: 'Челябинская область',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
//   },
//   {
//     name: 'Иваново',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
//   },
//   {
//     name: 'Камчатка',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
//   },
//   {
//     name: 'Холмогорский район',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
//   },
//   {
//     name: 'Байкал',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
//   }
// ];



// let profileAdd = document.querySelector('.profile__add');
// let popupSecond = document.querySelector('.add__card');
// let list = document.querySelector('.elements__cards');

// for (let i = 0; i < initialCards.length; i++ ) {
//  // console.log (initialCards[i].name)

//   let li = document.createElement('li');
//   li.classList.add('element');

//   let img = document.createElement('img');
//   img.classList.add('element__image');
//   img.src = initialCards[i].link;

//   let subscription = document.createElement('div');
//   subscription.classList.add('element__subscription');

//   let h2 = document.createElement('h2');
//   h2.classList.add('element__title');
//   h2.textContent = initialCards[i].name; 

//   let button = document.createElement('button');
//   button.classList.add('element__button');

//   let like = document.createElement('img');
//   like.classList.add('element__button-like');
//   like.src = "./images/like.svg"

//   li.appendChild(img);
//   li.appendChild(subscription);
//   subscription.appendChild(h2);
//   subscription.appendChild(button);
//   button.appendChild(like);

//   list.appendChild(li);

// }


// const togglePopupVisibility_2 = function() {
//   popupSecond.classList.toggle('popup_opened')
// }

// profileAdd.addEventListener('click', togglePopupVisibility_2);
// profileAdd.addEventListener('click', togglePopupVisibility_2);

