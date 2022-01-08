export default class UserInfo {

  constructor (nameEditProfile, jobEditProfile) {
    this._nameEditProfile = nameEditProfile,
    this._jobEditProfile = jobEditProfile
    this._name = null,
    this._job = null
  }

  updateUserInfo () { // устанавливает значения полей
    this._nameEditProfile.textContent = this._name;
    this._jobEditProfile.textContent = this._job
  }

  setUserInfo (name, job) {  // поля обновляются
    this._name = name;
    this._job = job
  }

  getUserInfo () { // возвращает объект для использования полей
    return {
      name: this._name,
      job: this._job
    } 
  }
}