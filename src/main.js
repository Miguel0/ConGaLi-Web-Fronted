// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueI18n from 'vue-i18n'

Vue.config.productionTip = false

// Ready translated locale messages
const messages = {
  en: {
    validation: {
      fieldRequired: 'The field is required.',
      between: 'The field must have a value between {min} and {max}',
      atLeast: 'The field must have at least {characterCount} letters.',
      validFormatAtLeast: 'The field must have a valid formant and at least {characterCount} letters.',
      elementAtLeast: 'The field "{element}" must have at least {characterCount} letters.',
      elementValidFormatAtLeast: 'The field "{element}" must have a valid formant and at least {characterCount} letters.',
      elementFieldRequired: 'The field "{element}" is required.',
      elementBetween: 'The field "{element}" must have a value between {min} and {max}'
    },
    label: {
      logOut: 'Logout',
      logIn: 'LogIn',
      signUp: 'SignUp',
      register: 'Register',
      password: 'Password',
      email: 'Email',
      user: 'User',
      userColor: 'User Color',
      refreshList: 'Refresh list',
      cancel: 'Cancel',
      name: 'Name',
      creationDate: 'Creation date',
      join: 'Join',
      ID: 'ID',
      game: {
        id: 'Game ID'
      }
    },
    availableGames: {
      title: 'Available Games',
      createGame: 'Create a new game',
      gameName: 'Game Name',
      ownerId: 'Owner ID',
      usersConnected: 'Users connected'
    },
    joinGameModal: {
      title: 'Join Game',
      joinIt: 'Join it!'
    },
    logoutGameModal: {
      title: 'Logout',
      bodyText: 'Do you confirm that you wan\'t to close your session? If so, those games that you own will be assigned to other players or, if not possible, closed.'
    },
    sessionModal: {
      alreadyHaveAccount: 'Already have an account?',
      forgotYourPassword: 'Forgot your password?'
    },
    createGameModal: {
      title: 'Create Game',
      refreshInterval: 'Refresh Interval (in milliseconds)',
      gridResolution: 'Grid resolution (in pixels)',
      createIt: 'Create it!'
    },
    cellsTemplatesBar: {
      template: {
        Block: 'Block',
        Beehive: 'Beehive',
        Loaf: 'Loaf',
        Boat: 'Boat',
        Flower: 'Flower',
        Blinker: 'Blinker',
        Toad: 'Toad',
        Beacon: 'Beacon',
        Pulsar: 'Pulsar',
        Pentadecathlon: 'Pentadecathlon',
        Glider: 'Glider',
        Lightweight_spaceship_LWSS: 'Lightweight spaceship (LWSS)'
      },
      templateGroup: {
        Oscillators: 'Oscillators',
        Spaceships: 'Spaceships',
        Still_lifes: 'Still lifes'
      }
    },
    conwaysGamePlaceHolder: {
      startGame: 'Start Game',
      pauseGame: 'Pause Game',
      killGame: 'Kill Game'
    },
    landingPage: {
      title: 'Home',
      text: {
        innerTitle: 'Conway\'s Web Game',
        innerSubTitle: 'This implementation is ment to be used with <a href="https://github.com/miguel-isasmendi/ConGaLi-Backend-WebSocket">Conway\'s Game Backend</a>.',
        innerOverallIntent: '<a href="https://en.wikipedia.org/wiki/Conway\'s_Game_of_Life">Conway’s Game of Life</a> is a famous simulation that demonstrates cellular automaton. It is modeled as a grid with 4 simple rules:',
        rules: [
          'Any live cell with fewer than two live neighbours dies, as if caused by under-population.',
          'Any live cell with two or three live neighbours lives on to the next generation.',
          'Any live cell with more than three live neighbours dies, as if by overcrowding.',
          'Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.'
        ],
        premiseParagraph: 'This particular implementation creates a Multiplayer app version of Game of Life, with the following instructions as a foundational stone and premises:',
        premises: [
          'The game should tick automatically at a predefined interval, at say, 1 step per second.',
          'This client allows multiple clients to share the same, synchronized world view.',
          'Each client is assigned a random color on initialization.',
          'Creating a point on any grid will create a live cell on that grid with the client’s color. This change should be synchronized across all connected clients.',
          'When a dead cell revives by rule #4 , it will be given a color that is the average of its neighbours (that revive it).',
          'Include a toolbar that places some predefined patterns at random places with the player’s color, such as those found at <a href="https://en.wikipedia.org/wiki/Conway%E2%80%99s_Game_of_Life#Examples_of_patterns">here</a>.'
        ]
      }
    },
    usersProfiles: {
      userName: 'User Name',
      creationDate: 'Profile creation date'
    },
    error: {
      game: {
        users: {
          invalidGameForUser: {
            title: 'Invalid access',
            body: 'The user doesn\'t have access to the game'
          },
          userAlreadyExists: {
            title: 'The user is already in the game',
            body: 'The user {name} is already in the game'
          },
          userDoesntExists: {
            title: 'The user isn\'t associated to the game',
            body: 'The user {id} isn\'t associated to the game'
          }
        },
        cellsGrid: {
          canNotRemoveCellThatDoesNotExists: {
            title: 'Cannot remove a cell that doesn\'t exist anymore',
            body: 'Cannot remove a cell at {cellsConfig.x}@{cellsConfig.y} that doesn\'t exist anymore'
          },
          invalidResolution: {
            title: 'Invalid resolution received',
            body: 'The resolution should be an integer greater than zero, but instead is {receivedResolution}'
          },
          cellAtInvalidPosition: {
            title: 'Invalid cell\'s position access',
            body: 'Trying to access cell at invalid position {invalidPosition.x}@{invalidPosition.y}'
          },
          malformedColor: {
            title: 'Malformed color definition received',
            body: 'Some of the colors array received [{arguments}] are invalid'
          },
          cellCantBeOverride: {
            title: 'Cannot override cell',
            body: 'Cannot override cell at {cellsConfig.x}@{cellsConfig.y}'
          }
        },
        save: {
          alreadyExists: {
            title: 'The game exists already',
            body: 'Cannot save game that already exists'
          }
        },
        gridTemplate: {
          wrongCellsTemplate: {
            title: 'Cells template doesn\'t exist',
            body: 'Cells template doesn\'t exist'
          }
        }
      },
      session: {
        signUp: {
          alreadyStarted: {
            title: 'Session already started',
            body: 'The user\'s session had already started'
          }
        },
        logIn: {
          wrongUserOrPassword: {
            title: 'Wrong user or password',
            body: 'The authentication data received is not correct'
          },
          alreadyOpen: {
            title: 'Session already open',
            body: 'The user\'s session is already open'
          }
        },
        alreadyClosed: {
          title: 'Session already closed',
          body: 'The user\'s session is already closed'
        }
      },
      user: {
        integrity: {
          createdOn: {
            title: 'Error on "createdOn" attribute\'s integrity',
            body: 'The "createdOn" attribute should be a Date'
          },
          name: {
            title: 'Error on "name" attribute\'s integrity',
            body: 'The "name" attribute should be not empty'
          },
          password: {
            title: 'Error on "password" attribute\'s integrity',
            body: 'The "password" attribute should be not empty'
          }
        }
      },
      unexpectedError: {
        title: 'Unexpected Error',
        body: 'A unexpected error has happened. Please contact the application support'
      }
    }
  },
  es: {
    validation: {
      fieldRequired: 'El campo es requerido.',
      between: 'EL campo debe tener un valor entre {min} y {max}',
      atLeast: 'El campo debe tener al menos {characterCount} letras.',
      validFormatAtLeast: 'El campo debe tener un formato válido y al menos {characterCount} letras.',
      elementAtLeast: 'El campo "{element}" debe tener al menos {characterCount} letras.',
      elementValidFormatAtLeast: 'El campo "{element}" debe tener un formato válido y al menos {characterCount} letras.',
      elementFieldRequired: 'El campo "{element}" es requerido.',
      elementBetween: 'EL campo "{element}" debe tener un valor entre {min} y {max}'
    },
    label: {
      logOut: 'Cerrar sesión',
      logIn: 'Iniciar sesión',
      signUp: 'Registrarse',
      register: 'Registrarse',
      password: 'Contraseña',
      email: 'Email',
      user: 'Usuario',
      userColor: 'Color del Usuario',
      refreshList: 'Actualizar lista',
      cancel: 'Cancelar',
      name: 'Nombre',
      creationDate: 'Fecha de creación',
      join: 'Unirse',
      ID: 'ID',
      game: {
        id: 'ID de juego'
      }
    },
    availableGames: {
      title: 'Juegos disponibles',
      createGame: 'Crear un juego nuevo',
      gameName: 'Nombre de juego',
      ownerId: 'ID del dueño',
      usersConnected: 'Usuarios conectados'
    },
    joinGameModal: {
      title: 'Unirse a juego',
      joinIt: 'Unirse!'
    },
    logoutGameModal: {
      title: 'Cerrar sesión',
      bodyText: '¿Confirma que desea cerrar la sesión? Los juegos de los cuales es ud. dueño serán asignados a otros jugadores o, de no ser posible, eliminados.'
    },
    sessionModal: {
      alreadyHaveAccount: '¿Ya está registrado?',
      forgotYourPassword: '¿Olvido su contraseña?'
    },
    createGameModal: {
      title: 'Crear juego',
      refreshInterval: 'Intervalo de refresco (en milisegundos)',
      gridResolution: 'Resolución de grilla (en pixeles)',
      createIt: 'Crear juego!'
    },
    cellsTemplatesBar: {
      template: {
        Block: 'Bloque',
        Beehive: 'Colmena',
        Loaf: 'Hogaza',
        Boat: 'Bote',
        Flower: 'Flor',
        Blinker: 'Intermitente',
        Toad: 'Sapo',
        Beacon: 'Lámpara',
        Pulsar: 'Pulsar',
        Pentadecathlon: 'Pentadecatlón',
        Glider: 'Deslizador',
        Lightweight_spaceship_LWSS: 'Nave espacial liviana'
      },
      templateGroup: {
        Oscillators: 'Osciladores',
        Spaceships: 'Naves espaciales',
        Still_lifes: 'Vidas estables'
      }
    },
    conwaysGamePlaceHolder: {
      startGame: 'Comenzar juego',
      pauseGame: 'Pausar juego',
      killGame: 'Destruir juego'
    },
    landingPage: {
      title: 'Inicio',
      text: {
        innerTitle: 'Juego de Conway',
        innerSubTitle: 'Esta implementación fue creada para utilizar con <a href="https://github.com/miguel-isasmendi/ConGaLi-Backend-WebSocket">Conway\'s Game Backend</a>.',
        innerOverallIntent: '<a href="https://en.wikipedia.org/wiki/Conway\'s_Game_of_Life">Conway’s Game of Life</a> es una simulación que demuestra el uso de autómatas celulares. Está modelado como una grilla con las siguientes reglas simples:',
        rules: [
          'Cualquier célula viva con menos de dos vecinas muere, debido a la baja población.',
          'Cualquier célula con dos o tres células vecinas sobrevibe por lo menos hasta la proxima generación.',
          'Cualquier célula con mas de tres células vecinas muere, debido a la sobrepoblación.',
          'Cualquier célula muerta con exactamente tres vecinas vivas se transforma en una célula viva, debido a la reproducción.'
        ],
        premiseParagraph: 'Esta particular implementación crea una versión multijugador del juego de la vida, con las siguientes instrucciones como piedra fundacional y premisas para su construcción:',
        premises: [
          'El juego debería actualizarse en un intervalo predefinido de tiempo, creando una generación nueva por segundo por ejemplo.',
          'Este cliente tiene que permitir a múltiples jugadores compartir al misma visión sincronizada de la vista.',
          'Cada jugador inicialmente tiene asignado un color aleatorio.',
          'Crer un punto en cualquier grilla causará que una célula viva ocupe ese lugar con el color del usuario que la generó. Este cambio deberá estar sincronizado en todos los jugadores.',
          'Cuando una célula revive a la regla nro° 4 se le dará el color que es el promedio del color de sus vecinos.',
          'Se provee una barra de plantillas de patrones predefinidos de células, como las que se encuentra <a href="https://en.wikipedia.org/wiki/Conway%E2%80%99s_Game_of_Life#Examples_of_patterns">aquí</a>'
        ]
      }
    },
    usersProfiles: {
      userName: 'Nombre',
      creationDate: 'Fecha de creación'
    },
    error: {
      game: {
        users: {
          invalidGameForUser: {
            title: 'Acceso inválido',
            body: 'El usuario no tien acceso al juego'
          },
          userAlreadyExists: {
            title: 'El usuario ya está incluido en el juego',
            body: 'El usuario "{id}" ya está incluido en el juego'
          },
          userDoesntExists: {
            title: 'El usuario no está incluido en el juego',
            body: 'El usuario "{id}" no está incluido en el juego'
          }
        },
        cellsGrid: {
          canNotRemoveCellThatDoesNotExists: {
            title: 'No se puede eliminar una celda que dejó de existir',
            body: 'No se puede eliminar la celda en posición {cellsConfig.x}@{cellsConfig.y} porque no existe mas'
          },
          invalidResolution: {
            title: 'Resolución invalida recibida',
            body: 'La resolución debería ser un número entero mayor a cero, pero se recibió {receivedResolution}'
          },
          cellAtInvalidPosition: {
            title: 'Acceso inválido a posición de celda',
            body: 'Error tratando de acceder a posición inválida {invalidPosition.x}@{invalidPosition.y}'
          },
          malformedColor: {
            title: 'Definición de color malformada recibida',
            body: 'Alguno de los colores recibidos es inválido [{arguments}]'
          },
          cellCantBeOverride: {
            title: 'No se puede sobreescribir celda',
            body: 'No se puede sobreescribir celda en {cellsConfig.x}@{cellsConfig.y}'
          }
        },
        save: {
          alreadyExists: {
            title: 'El juego ya existe',
            body: 'No se puede grabar un juego que ya existe'
          }
        },
        gridTemplate: {
          wrongCellsTemplate: {
            title: 'La plantilla de celdas no existe',
            body: 'La plantilla de celdas no existe'
          }
        }
      },
      session: {
        signUp: {
          alreadyStarted: {
            title: 'Sesión activa',
            body: 'La sesión del usuario ya ha sido iniciada'
          }
        },
        logIn: {
          wrongUserOrPassword: {
            title: 'Usuario o contraseña erronea',
            body: 'La información de autenticación recibida no es correcta'
          },
          alreadyOpen: {
            title: 'Sesión ya iniciada',
            body: 'La sesión del usuario ya está iniciada'
          }
        },
        alreadyClosed: {
          title: 'Sesión ya cerrada',
          body: 'La sesión del usuario fue cerrada'
        }
      },
      user: {
        integrity: {
          createdOn: {
            title: 'Error de integridad en el atributo "createdOn"',
            body: 'El atributo "createdOn" debería ser una fecha válida'
          },
          name: {
            title: 'Error de integridad en el atributo "name"',
            body: 'El atributo "name" no debería estar vacía'
          },
          password: {
            title: 'Error de integridad en el atributo "password"',
            body: 'El atributo "password" no debería estar vacía'
          }
        }
      },
      unexpectedError: {
        title: 'Excepción inesperada',
        body: 'Un excepción inesperada ha sucedido. Por favor contacte al soporte de la aplicación'
      }
    }
  }
}

Vue.use(VueI18n)

const i18n = new VueI18n({
  locale: 'en',
  fallbackLocale: 'es',
  messages
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
  i18n
})
