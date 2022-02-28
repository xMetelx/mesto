const onError = res => {
  if (res.ok) {
    return res.json() //вернется promise
  }
  return Promise.reject('Сервер недоступен')
}

export class Api {
  constructor(section, profile) {
    this._section = section;
    this._profile = profile;
    this._baseUrl = 'https://mesto.nomoreparties.co/v1/cohort-34';
    this._getUserUrl = 'https://mesto.nomoreparties.co/v1/cohort-34/users/me';
    this._getCardsUrl = 'https://mesto.nomoreparties.co/v1/cohort-34/cards';
    this._deleteCardUrl = 'https://mesto.nomoreparties.co/v1/cohort-34/cards';
    this._likeCardUrl = 'https://mesto.nomoreparties.co/v1/cohort-34/cards/likes';
    this._patchAvatarUrl = 'https://mesto.nomoreparties.co/v1/cohort-34/users/me/avatar';
    this._headers = {
      authorization: '0f69491b-0019-450c-bcd2-9a7eeaa1d51b',
      'Content-Type': 'application/json'
    }
  }

  // `${this._baseUrl}/${cardId}`

  // данные пользователя
  getUserInfo () {
    return fetch(this._baseUrl + '/users/me', {
      method: 'GET',
      headers: this._headers
    })
      .then (onError) 
  }

  // данные карточки - рендерим имеющиеся на сервере
  getCards () {
    return fetch(this._baseUrl + '/cards', {
      method: 'GET',
      headers: this._headers
    })
      .then(onError)
  }

  // меняем имя и деятельность в профайле
  patchProfile (name, about) {
    return fetch(this._baseUrl + '/users/me', {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: name, 
        about: about
      })
    })
    .then(onError)
    }

  //отправляем свою карточку на сервер  
  postCard (name, link) {
    return fetch(this._baseUrl + '/cards', {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
      .then(onError)
  }

  // ставим лайк
  setCardLike (cardId) {
    return fetch(`${this._baseUrl + '/cards/likes'}/${cardId}`, {
      method: 'PUT',
      headers: this._headers
    })
      .then(onError)
  }

  // удаляем лайк
  deleteCardLike (cardId) {
    return fetch(`${this._baseUrl + '/cards/likes'}/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then(onError)
  }

  // удаляем карточку
  removeCard (cardId) {
    return fetch (`${this._baseUrl + '/cards'}/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    })
    .then (onError)
  }

 //меняем аватар пользователя
  patchAvatar (avatar) {
    return fetch(this._baseUrl + '/users/me/avatar', {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatar
      })
    })
    .then(onError)
  }

}


