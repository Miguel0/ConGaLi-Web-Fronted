# Conway's Web Game Frontend


This implementation is ment to be used with [Conway's Game Backend](https://github.com/Miguel0/conwaysGame-Backend).

[Conway’s Game of Life](https://en.wikipedia.org/wiki/Conway's_Game_of_Life) is a famous simulation that demonstrates cellular automaton. It is modeled as a grid with 4 simple rules:

1. **Any live cell with fewer than two live neighbours dies, as if caused by under-population.**
2. **Any live cell with two or three live neighbours lives on to the next generation.**
3. **Any live cell with more than three live neighbours dies, as if by overcrowding.**
4. **Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.**

This particular implementation creates a Multiplayer app version of Game of Life, with the following instructions as a foundational stone and premises (wich are relevant to frontend):

- **The game should tick automatically at a predefined interval, at say, 1 step per second.**
- **This client allows multiple clients to share the same, synchronized world view.**
- **Each client is assigned a random color on initialization.**
- **Creating a point on any grid will create a live cell on that grid with the client’s color. This change should be synchronized across all connected clients. (You can use any mechanism to achieve this, such as polling, comet or WebSocket).**
- **When a dead cell revives by rule #4 , it will be given a color that is the average of its neighbours (that revive it).**
- **Include a toolbar that places some predefined patterns at random places with the player’s color, such as those found at [here] (https://en.wikipedia.org/wiki/Conway’s_Game_of_Life#Examples_of_patterns) (not necessary to implement all, just 3 - 4 is fine).**

## TODO list
- [x] **\(Originally requested)** The game should tick automatically at a predefined interval, at say, 1 step per second.
- [x] **\(Originally requested)** This client allows multiple clients to share the same, synchronized world view.
- [ ] **\(Originally requested)** Each client is assigned a random color on initialization.
- [x] **\(Originally requested)** Creating a point on any grid will create a live cell on that grid with the client’s color. This change should be synchronized across all connected clients. (You can use any mechanism to achieve this, such as polling, comet or WebSocket).
- [ ] **\(Originally requested)** When a dead cell revives by rule #4 , it will be given a color that is the average of its neighbours (that revive it).
- [ ] **\(Requirement enhancement)** _Extract canvas drawer code onto it's own module._
- [ ] **\(Requirement enhancement)** _Implement some kind of users authentication._
- [ ] **\(Requirement enhancement)** _Implement some kind of storage for users data._
- [ ] **\(Requirement enhancement)** _Implement an acceptable Application Error handling mechanism Across the App._
- [ ] **\(Requirement enhancement)** _Implement an acceptable logging mechanism across the App._
- [ ] **\(Requirement enhancement)** _Implement test for Components._
- [ ] **\(Requirement enhancement)** _Implement test for WebSockets endpoints._
- [ ] **\(Requirement enhancement)** _Get to a coverage of at least 70%._

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```
