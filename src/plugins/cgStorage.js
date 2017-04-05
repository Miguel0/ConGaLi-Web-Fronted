const _cgStorage = sessionStorage || localStorage

const CGStorage = function () {
  this.readGameData = function (gameName) {
    return this.readUserData().games[gameName]
  }

  this.saveGameData = function (gameData) {
    let userData = this.readUserData()

    if (userData.games[gameData.name]) {
      // TODO thrown or handle better this situation
      throw new Error('game already exists')
    } else {
      userData.games[gameData.name] = gameData

      return this.saveUserData(userData)
    }
  }

  this.readUserData = function () {
    return this.readAppData().user
  }

  this.saveUserData = function (userData) {
    let appData = this.readAppData()

    appData.user = userData

    appData.isAuthenticated = userData.isAuthenticated !== false

    return this.saveAppData(appData)
  }

  this.readAppData = function () {
    let appData = _cgStorage['app']

    if (!appData) {
      console.log('Starting lazy initialization of client data...')
      appData = {
        isAuthenticated: false,
        user: {
          games: {}
        }
      }
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
    return this.readAppData().isAuthenticated
  }
}

export default function (Vue, options) {
  let attributeName = (options && options.cgPluginNameInApp) || 'cgStorage'
  Vue.prototype[attributeName] = new CGStorage()
  Vue[attributeName] = Vue.prototype[attributeName]
}
