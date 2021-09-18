const popupElement = document.querySelector('.popup');
const popupOpenButtonElement = document.querySelector('.profile__pen-button');
const profileAdd = document.querySelector('.profile__add');
const popupCloseButtonElement = document.querySelectorAll('.popup__close');
const popupAddElement = document.querySelector('.popup__add-card');

let formElement = document.querySelector('.popup__inputs');
let nameInput = document.querySelector('.popup__input_name_name');
let jobInput = document.querySelector('.popup__input_name_job');
let profileName = document.querySelector('.profile__title');
let profileJob = document.querySelector('.profile__subtitle');

const openPopup = function(e) {
  if (e.target.classList.contains('profile__pen-button')) {
    popupElement.classList.add('popup_opened');
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
  } else {
    popupAddElement.classList.add('popup_opened');
  }
}




const closePopup = function() {
  popupElement.classList.remove('popup_opened');
  popupAddElement.classList.remove('popup_opened');
}

popupCloseButtonElement.forEach (function(i, index) {
  i.addEventListener ('click', closePopup);
  }
);

function submitFormHandler (evt) {
	evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  closePopup();
}



popupOpenButtonElement.addEventListener('click', openPopup);
profileAdd.addEventListener('click', openPopup);



formElement.addEventListener('submit', submitFormHandler);


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



// const openPopup = function() {
//   popupElement.classList.add('popup_opened');
//   nameInput.value = profileName.textContent;
//   jobInput.value = profileJob.textContent;
// }
// const closePopup = function() {
//   popupElement.classList.remove('popup_opened')
// }



// const togglePopupVisibility_2 = function() {
//   popupSecond.classList.toggle('popup_opened')
// }

// profileAdd.addEventListener('click', togglePopupVisibility_2);
// profileAdd.addEventListener('click', togglePopupVisibility_2);





let list = document.querySelector('.elements__cards');

for (let i = 0; i < initialCards.length; i++ ) {
 // console.log (initialCards[i].name)

  let li = document.createElement('li');
  li.classList.add('element');

  let img = document.createElement('img');
  img.classList.add('element__image');
  img.src = initialCards[i].link;

  let subscription = document.createElement('div');
  subscription.classList.add('element__subscription');

  let h2 = document.createElement('h2');
  h2.classList.add('element__title');
  h2.textContent = initialCards[i].name; 

  let button = document.createElement('button');
  button.classList.add('element__button');

  let like = document.createElement('img');
  like.classList.add('element__button-like');
  like.src = "./images/like.svg"

  li.appendChild(img);
  li.appendChild(subscription);
  subscription.appendChild(h2);
  subscription.appendChild(button);
  button.appendChild(like);

  list.appendChild(li);

}

