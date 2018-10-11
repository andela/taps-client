# taps-client
This is the client side for [Andela TAPS](https://ghoulies-taps-client.herokuapp.com/).

[![Andela](https://andela-badge.herokuapp.com/)](https://andela.com)
[![Build Status](https://travis-ci.org/andela/taps-client.svg?branch=staging)](https://travis-ci.org/andela/taps-client)
[![Coverage Status](https://coveralls.io/repos/github/andela/taps-client/badge.svg?branch=staging)](https://coveralls.io/github/andela/taps-client?branch=staging)
[![Hound CI](https://camo.githubusercontent.com/23ee7a697b291798079e258bbc25434c4fac4f8b/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f50726f7465637465645f62792d486f756e642d6138373364312e737667)](https://houndci.com)


Andela Taps seeks to automate some of the routine actions taken by __simulations learning facilitators__ at Andela.

Here is a useful scenario. When a new cohort (class) begins simulations (*sims*) at Andela, the cohort is broken into teams, and each team is assigned to a learning facilitator. The learning facilitator then creates a few Slack channels, a Github repo, and a Pivotal Tracker board. For each of these, the facilitator has to add every member of the team to the channel/repo/board. This is obviously a task that should be automated, especially considering that even the names of the channels/repo/board are always in a particular format. Andela Taps seeks to automate these and many more routine tasks performed by facilitators.

## Technologies Used
### Frontend
- [React](https://facebook.github.io/react/) A JavaScript library for building user interfaces.
- [Redux](http://redux.js.org/) A predictable state container for JavaScript apps.
- [Webpack](https://webpack.js.org/) A JavaScript tool for bundling scripts, images, styles and other assets
- [Babel](https://babeljs.io/) A JavaScript compiler for converting codes written in ES6 or JSX to ES5 that is supported by many browsers

## Usage

### Prerequisites ###
You are going to need

* Linux, macOS or Windows
* node version 8.9.2

### Getting Set Up ###
* Clone this repository to your local machine
```
$ https://github.com/andela/taps-client.git
```
* Change directory into the taps-client directory
```
$ cd taps-client
```
* Install all required dependencies by running
```
$ npm install
```
* Once installation is done, create a .env file and fill it with the neccessary environment variables **(see .env-sample for the neccessary environment variables required)**
* To start the application, run
```
npm run dev
```
## Testing

This project uses [jest](https://jestjs.io/) for testing.
* Ensure you run `yarn` (or `npm install`) to install necessary packages.
* Run `npm test` to run tests and display code coverage results.

## License

[MIT](LICENSE)

## FAQ

### Is this an Open-Source Application?

```
Yes it is, and contributing to the development of this application is by raising PRs.
```

### Who can contribute?

```
Anyone! This application is open to all those who want to contribute to open-source 
development and are willing to follow set standards for contributing.
```

### Can I clone this application for personal use?

```
Yes! This application is licensed under MIT, and is open for whatever you may choose 
to use it for.
```
