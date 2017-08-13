const _cgStorage = sessionStorage || localStorage

const CGStorage = function () {
  this.readGameData = function (userId, gameId) {
    return this.readUserData(userId).games[gameId]
  }

  this.deleteGameForUser = function (gameId, userId) {
    let userData = this.readUserData(userId)

    delete userData.games[gameId]
    return this.saveUserData(userId, userData)
  }

  this.saveOwnGameData = function (gameData) {
    console.log(JSON.stringify(gameData))
    let userData = this.readLocalUserData()

    if (!userData) {
      userData = gameData.users[gameData.ownerId]
      userData.games = {}
    }

    // This should throw exception, updates should have a different circuit
    if (userData.games[gameData.id]) {
      // TODO thrown or handle better this situation
      throw new Error('should use update to save game again')
    } else {
      userData.games[gameData.id] = gameData
      return this.saveUserData(gameData.ownerId, userData)
    }
  }

  this.saveAlienGameData = function (gameData) {
    console.log(JSON.stringify(gameData))
    let userData = this.readUserData(gameData.ownerId)

    // If we never subscribed to some game from this user, initializate record
    if (!userData) {
      let originalUserData = gameData.users[gameData.ownerId]
      userData = {color: originalUserData.color, id: originalUserData.id, name: originalUserData.name}
      userData.games = {}
    }

    // If we have already saved data for the game data received by argument..
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

    console.log(JSON.stringify(userData))

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
    if (appData === null || appData === undefined) {
      delete _cgStorage['app']
    } else {
      _cgStorage['app'] = JSON.stringify(appData)
    }

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
