export default class UserInfo {

  constructor (nameEditProfile, jobEditProfile) {
    this._nameEditProfile = nameEditProfile,
    this._jobEditProfile = jobEditProfile
    this._name = null,
    this._job = null
  }

  updateUserInfo () { // устанавливает в элементы значения полей this._job и this._name
    this._nameEditProfile.textContent = this._name;
    this._jobEditProfile.textContent = this._job
  }

  setUserInfo (name, job) {  // поля this._job и this._name обновляются методом
    this._name = name;
    this._job = job
  }

  getUserInfo () { //  возвращает объект для использования полей this._job и this._name
    return {
      name: this._name,
      job: this._job
    } 
  }






















  // constructor({nameSelector, jobSelector}) {
  //   this._profileName = document.querySelector(nameSelector);
  //   this._jobElement = document.querySelector(jobSelector);
  //   this._name = null;
  //   this._job = null;
  // }

  // updateUserInfo () { // value - неправильно, должен быть textContent, а value где то в script`e
  //   this._profileName.textContent = this._name; // работало с value вместо textContent
  //   this._jobElement.textContent = this._job;
  // }

  // setUserInfo({name, job}) { // получение данных о пользователе - входящие данные // устанавливает данные
  //   this._name = name;
  //   this._job = job;
  //   // this.updateUserInfo();
  // }

  // getUserInfo () { //запросили снаружи - все, что известно - вернули. // отдает данные о пользователе
  //   return {
  //     name: this._name,
  //     job: this._job
  //   }
  // }
}