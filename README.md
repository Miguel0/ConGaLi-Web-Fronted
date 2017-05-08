[![Github Releases](https://img.shields.io/github/downloads/atom/atom/latest/total.svg?style=flat-square)](../..)

# ConGali Web Frontend

##  &nbsp;<img src="https://github.com/miguel-isasmendi/ConGaLi-Backend-WebSocket/wiki/images/idea.png" alt="Overview" width="22px"> Overview

ConGaLi is an implementation of Conway's Game of Life [Conway’s Game of Life] is a famous simulation that demonstrates cellular automaton. This frontend it's meant to be used with an instance of https://github.com/miguel-isasmendi/ConGaLi-Backend-WebSocket

### &nbsp;<img src="https://github.com/miguel-isasmendi/ConGaLi-Backend-WebSocket/wiki/images/warning.png" alt="Disclaimer" width="20px"> **Disclaimer!!!!!!**

ConGaLi is still in a proof of concept stage, so we don't advice it usage for other reasons than satisfy your own curiosity right now nor we will take any responsibility in any security risk you could be exposed. Nonetheless, we are working to get the architecture ready and deployed for be at alpha stage. For more information on this you can take a look at the [roadmap][Roadmap] wiki page, and also it will be useful to take a peek at the [todo list][TODO].

This particular implementation is only the frontend for the WebSocket servers that will allow the game to run on it's initial stage (once the system begun to be distributed it will take a group of services to do that).

It begun as a project that I had to present as a code challenge, but I've decided to include it as part of my portfolio. We will make it scale as much as we can and we hope more people will unite and we will design a really interesting and solid system that we can be proud of.

##  &nbsp;<img src="https://github.com/miguel-isasmendi/ConGaLi-Backend-WebSocket/wiki/images/law.png" alt="Basic Rules" width="22px"> Basic Rules

This game is modeled as a grid with 4 simple rules:

1. **Any live cell with fewer than two live neighbours dies, as if caused by under-population.**
2. **Any live cell with two or three live neighbours lives on to the next generation.**
3. **Any live cell with more than three live neighbours dies, as if by overcrowding.**
4. **Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.**

This particular implementation creates a Multiplayer app version of Game of Life, with the following instructions as a foundational stone and premises (which are relevant the fronted):

- **The game should tick automatically at a predefined interval, at say, 1 step per second.**
- **This server allows multiple clients to share the same, synchronized world view.**
- **Each client is assigned a random color on initialization.**
- **Creating a point on any grid will create a live cell on that grid with the client’s color. This change should be synchronized across all connected clients. (Using any mechanism to achieve this, such as polling, comet or WebSocket).**
- **When a dead cell revives by rule #4 , it will be given a color that is the average of its neighbours (that revive it).**

##  &nbsp;<img src="https://github.com/miguel-isasmendi/ConGaLi-Backend-WebSocket/wiki/images/todo_list.png" alt="TODO" width="22px"> TODO list

There are lots of improvements and goals to take into account to  build the overall system, and that data will be addressed on our wiki, of course. If interested on reviewing that, just check our [TODO] and [Roadmap] wiki page. We will be moving this information to a unified wiki page on the future, but for the time being these are the TODO items relevant for the frontend:

- [x] _Extract canvas drawer code onto it's own module._
- [ ]  _Implement some kind of users authentication._
- [x]  _Implement some kind of storage for users data._
- [ ]  _Implement an acceptable Application Error handling mechanism Across the App._
- [ ]  _Implement an acceptable logging mechanism across the App._
- [ ]  _Implement test for Components._
- [ ]  _Get to a coverage of at least 70%._

**To find out more, please check out the [Website] and the [Wiki].**

##  &nbsp;<img src="https://github.com/miguel-isasmendi/ConGaLi-Backend-WebSocket/wiki/images/training.png" alt="ConGaLi 101" width="22px"> ConGaLi technology 101

The repository structure follows the conceptual architecture of ConGaLi, which consists of loosely-coupled sub-systems connected:

* **UI Web servers** This will serve all the specific implementation for interacting with the aforementioned backend.
* **WebSocket backend** This will serve al the actual services that will execute the game's logic. Although, this will change in a not so distant future.

**For more information on the current ConGaLi Architecture, please see the [Technical Architecture Overview]**.

## &nbsp;<img src="https://github.com/miguel-isasmendi/ConGaLi-Backend-WebSocket/wiki/images/support.png" alt="Build Setup" width="22px"> Build Setup

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

##  &nbsp;<img src="https://github.com/miguel-isasmendi/ConGaLi-Backend-WebSocket/wiki/images/search.png" alt="Find out more" width="22px"> Find out more

| **[Technical Documentation]**     | **[Setup Guide]**     | **[Roadmap]**           | **[Contributing]**           |
|-------------------------------------|-------------------------------|-----------------------------------|---------------------------------------------|
| ![techdocs-image] | ![setup-image] | ![roadmap-image] | ![contributing-image] |

##  &nbsp;<img src="https://github.com/miguel-isasmendi/ConGaLi-Backend-WebSocket/wiki/images/help.png" alt="Questions, help?" width="22px"> Questions or need help?

Check out the **[Talk to us]** page on our wiki.


[release-image]: https://img.shields.io/github/downloads/atom/atom/latest/total.svg?style=flat-square
[releases]: ./releases

[Website]: -
[Wiki]:  https://github.com/miguel-isasmendi/ConGaLi-Backend-WebSocket/wiki
[Talk to us]: https://github.com/miguel-isasmendi/ConGaLi-Backend-WebSocket/wiki/Talk-to-us
[Contributing]: https://github.com/miguel-isasmendi/ConGaLi-Backend-WebSocket/wiki/Contributing
[Setup Guide]: https://github.com/miguel-isasmendi/ConGaLi-Backend-WebSocket/wiki/Setting-up-ConGaLi
[Technical Architecture Overview]: https://github.com/miguel-isasmendi/ConGaLi-Backend-WebSocket/wiki/Technical-Architecture-Overview
[Technical Documentation]: https://github.com/miguel-isasmendi/ConGaLi-Backend-WebSocket/wiki/ConGaLi-Technical-documentation
[Roadmap]: https://github.com/miguel-isasmendi/ConGaLi-Backend-WebSocket/wiki/Product-roadmap
[TODO]: https://github.com/miguel-isasmendi/ConGaLi-Backend-WebSocket/wiki/TODO

[Conway’s Game of Life]: https://en.wikipedia.org/wiki/Conway's_Game_of_Life
[Eric Weisstein's treasure trove]: http://www.ericweisstein.com/encyclopedias/life/
[install Git]: https://git-scm.com/downloads
[install Docker]: https://docs.docker.com/engine/installation/

[techdocs-image]: https://github.com/miguel-isasmendi/ConGaLi-Backend-WebSocket/wiki/images/knowledge_sharing.png
[setup-image]: https://github.com/miguel-isasmendi/ConGaLi-Backend-WebSocket/wiki/images/support.png
[roadmap-image]: https://github.com/miguel-isasmendi/ConGaLi-Backend-WebSocket/wiki/images/adventure_map.png
[contributing-image]: https://github.com/miguel-isasmendi/ConGaLi-Backend-WebSocket/wiki/images/helping_hand.png

***
Icon pack by <a href="https://icons8.com" alt="Icons8"><img src="https://github.com/miguel-isasmendi/ConGaLi-Backend-WebSocket/wiki/images/Icons8.png" width="20px"></a>
