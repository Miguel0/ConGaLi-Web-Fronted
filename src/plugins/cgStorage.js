const _cgStorage = sessionStorage || localStorage

const CGStorage = function () {
  this.readGameData = function (userId, gameId) {
    return this.readUserData(userId).games[gameId]
  }

  this.saveGameData = function (gameData) {
    let userData = this.readUserData(gameData.ownerId)

    if (!userData) {
      userData = gameData.users[gameData.ownerId]
      userData.games = {}
    }

    if (userData.games[gameData.id]) {
      // TODO thrown or handle better this situation
      throw new Error('game already exists')
    } else {
      userData.games[gameData.id] = gameData

      return this.saveUserData(gameData.ownerId, userData)
    }
  }

  this.readUserData = function (userId) {
    return this.readAppData().user[userId]
  }

  this.saveUserData = function (userId, userData) {
    let appData = this.readAppData()

    appData.user[userId] = userData

    if (!userData.games) {
      userData.games = {}
    }

    return this.saveAppData(appData)
  }

  this.readLocalUserData = function () {
    let appData = this.readAppData()
    return appData.user[appData.localUserId]
  }

  this.saveLocalUserData = function (userData) {
    let appData = this.saveUserData(userData.id, userData)

    appData.localUserId = userData.id
    userData.isAuthenticated = userData.isAuthenticated !== false

    return this.saveAppData(appData)
  }

  this.readAppData = function () {
    let appData = _cgStorage['app']

    if (!appData) {
      console.log('Starting lazy initialization of client data...')
      appData = {user: {}}

      this.saveAppData(appData)
      console.log('Lazy initialization of client data done!!!')

      return appData
    } else {
      return JSON.parse(appData)
    }
  }

  this.saveAppData = function (appData) {
    _cgStorage['app'] = JSON.stringify(appData)

    return appData
  }

  this.isAuthenticated = function () {
    let localUserData = this.readLocalUserData()

    return localUserData && localUserData.isAuthenticated
  }
}

export default function (Vue, options) {
  let attributeName = (options && options.cgPluginNameInApp) || 'cgStorage'
  Vue.prototype[attributeName] = new CGStorage()
  Vue[attributeName] = Vue.prototype[attributeName]
}
