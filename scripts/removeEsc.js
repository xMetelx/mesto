// function closePopupByEsc(evt) {
//   if (evt.key === 27) {
//     console.log('esc')
//     // closePopup(evt.target.closest('.popup_opened');
//   }
// } 
// popupGenerals(function(esc) {
//   esc.addEventListener ('keydown', closePopupByEsc);
// });


const escFunction = function (popup) {
  popup.addEventListener('keydown', function (evt) {
    if (evt.key === 27) {
      console.log('проверка');
      closePopup(evt.target.closest('.popup_opened'));
  };
});
}


// popupGenerals.addEventListener('keydown', closePopupByEsc);