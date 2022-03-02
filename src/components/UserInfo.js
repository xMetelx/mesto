export default class UserInfo {

  constructor (nameEditProfile, jobEditProfile, avatarEditProfile) {
    this._nameEditProfile = nameEditProfile,
    this._jobEditProfile = jobEditProfile,
    this._avatarEditProfile = avatarEditProfile,
    this._profileId = ''
  }

  setUserInfo ({name, about, id, avatar}) {
    if (name) { 
    this._nameEditProfile.textContent = name;
    }
    if (about) {
    this._jobEditProfile.textContent = about;
    }
    if (id) {
    this._profileId = id;
    }
    if (avatar){
    this._avatarEditProfile.style.backgroundImage = `url('${avatar}')`;
    }
  }

  getUserInfo () { 
    return {
      name: this._nameEditProfile.textContent,
      job: this._jobEditProfile.textContent,
      avatar: this._avatarEditProfile.src,
      id: this._profileId
    } 
  }
}