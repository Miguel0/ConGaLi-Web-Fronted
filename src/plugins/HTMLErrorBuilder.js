const _cgStorage = sessionStorage || localStorage

const HTMLErrorBuilder = function () {
  this.htmlTemplate = function (errorData) {
    return `<h4>${errorData.titleKey}</h4><p>${errorData.createdOn}</p><p>${errorData.scope}</p><p>${errorData.level}</p><p>${errorData.bodyKey}</p>`
  }

  this.extractPatternsFromString = function (regex, string) {
    let patternMap = {}
    let m

    while ((m = regex.exec(string)) !== null) {
      if (m.index === regex.lastIndex) {
          regex.lastIndex++;
      }

      m.forEach((match, groupIndex) => {
        if (groupIndex == 1) {
          patternMap[match] = match
        }
      });
    }

    return Object.keys(patternMap)
  }

  this.searchValue = function (key, aJsonObject) {
    let keysToRetrieve = key.slice(1,key.length - 1).split('.')
    let value = aJsonObject
    let index = 0

    while (index < keysToRetrieve.length && value != null && value != undefined) {
      value = value[keysToRetrieve[index]]

      index++
    }

    return value
  }

  this.replaceBodyKeyValues = function (regex, errorData) {
    let keysToReplace = this.extractPatternsFromString(regex, errorData.bodyKey)

    let receivedArgumentsData = errorData.arguments

    if (receivedArgumentsData) {
      for (let i= 0 ; i < keysToReplace.length ; i++) {
        let valueRetrieved = this.searchValue(keysToReplace[i], receivedArgumentsData)

        if (valueRetrieved != null && valueRetrieved != undefined) {
          errorData.bodyKey = errorData.bodyKey.replace(keysToReplace[i], valueRetrieved)
        }
      }
    }
  }

  this.doBuild = function (errorData) {
    this.replaceBodyKeyValues(/(?=({[\w.]+}).*)/g, errorData)

    return this.htmlTemplate(errorData)
  }

  this.initialize = function () {
  }

  this.buildFor = function (errorData) {
    this.initialize()

    let buildedString = this.doBuild(errorData)

    this.initialize()

    return buildedString
  }
}

export default function (Vue, options) {
  let attributeName = (options && options.htmlErrorBuilderNameInApp) || 'ErrorBuilder'
  Vue.prototype[attributeName] = new HTMLErrorBuilder()
  Vue[attributeName] = Vue.prototype[attributeName]
}
