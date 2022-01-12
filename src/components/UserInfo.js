export default class UserInfo {

  constructor (nameEditProfile, jobEditProfile) {
    this._nameEditProfile = nameEditProfile,
    this._jobEditProfile = jobEditProfile
  }

  setUserInfo ({name, about}) { 
    this._nameEditProfile.textContent = name;
    this._jobEditProfile.textContent = about
  }

  getUserInfo () { 
    return {
      name: this._nameEditProfile.textContent,
      job: this._jobEditProfile.textContent
    } 
  }
}