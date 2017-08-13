const HTMLErrorBuilder = function () {
  this.htmlTemplate = function (errorData) {
    let htmlString = `<h4>${errorData.titleKey}</h4>`

    if (errorData.bodyKey) {
      htmlString += `<p>${errorData.bodyKey}</p>`
    }

    if (errorData.scope) {
      htmlString += `<p>${errorData.scope}</p>`
    }

    if (errorData.level) {
      htmlString += `<p>${errorData.level}</p>`
    }

    if (errorData.createdOn) {
      htmlString += `<p style="font-size:smaller">createdOn: ${errorData.createdOn} UTC</p>`
    }

    return htmlString
  }

  this.extractPatternsFromString = function (regex, string) {
    let patternMap = {}
    let m

    while ((m = regex.exec(string)) !== null) {
      if (m.index === regex.lastIndex) {
        regex.lastIndex++
      }

      m.forEach((match, groupIndex) => {
        if (groupIndex === 1) {
          patternMap[match] = match
        }
      })
    }

    return Object.keys(patternMap)
  }

  this.searchValue = function (key, aJsonObject) {
    let keysToRetrieve = key.slice(1, key.length - 1).split('.')
    let value = aJsonObject
    let index = 0

    while (index < keysToRetrieve.length && value !== null && value !== undefined) {
      value = value[keysToRetrieve[index]]

      index++
    }

    if (value === null || value === undefined) {
      console.warn(`Could not find data for key "${key}" on "${JSON.stringify(aJsonObject)}"`)
    }

    return value
  }

  this.replaceValues = function (regex, templateString, receivedArgumentsData) {
    let stringToWorkOn = templateString
    let keysToReplace = this.extractPatternsFromString(regex, stringToWorkOn)

    if (receivedArgumentsData) {
      for (let i = 0; i < keysToReplace.length; i++) {
        let valueRetrieved = this.searchValue(keysToReplace[i], receivedArgumentsData)

        if (valueRetrieved !== null && valueRetrieved !== undefined) {
          stringToWorkOn = stringToWorkOn.replace(keysToReplace[i], valueRetrieved)
        }
      }
    }
    return stringToWorkOn
  }

  this.doBuild = function (errorData) {
    errorData.bodyKey = this.replaceValues(/(?=({[\w.]+}).*)/g, errorData.bodyKey, errorData.arguments)
    errorData.titleKey = this.replaceValues(/(?=({[\w.]+}).*)/g, errorData.titleKey, errorData.arguments)

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
