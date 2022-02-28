export default class UserInfo {

  constructor (nameEditProfile, jobEditProfile, avatarEditProfile) {
    this._nameEditProfile = nameEditProfile,
    this._jobEditProfile = jobEditProfile,
    this._avatarEditProfile = avatarEditProfile,
    this._profileId = ''
  }

  setUserInfo ({name, about, id}) { 
    this._nameEditProfile.textContent = name,
    this._jobEditProfile.textContent = about,
    this._profileId = id
  }

  getUserInfo () { 
    return {
      name: this._nameEditProfile.textContent,
      job: this._jobEditProfile.textContent,
      avatar: this._avatarEditProfile.src,
      id: this._profileId
    } 
  }

  setAvatar (avatarUrl) {
    this._avatarEditProfile.style.backgroundImage = `url('${avatarUrl}')`
  }
}