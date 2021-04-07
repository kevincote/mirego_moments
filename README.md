
# Moments (Never work a day web app replica)
View replica app at: https://kevincote.github.io/mirego_moments/

Original web app: https://app.neverworkaday.com/moments

This app has been build using the public APIs of the "Never work a day" web application. I do not own any of the images and these are used only for demonstration purposes.

### Specs
 - Built with `Vue.js`
 - Base components from `Vuetify`
 - Test suite with `jest` and `chai`

> Browser's localStorage is used in this project to store the likes and the comments of the user on the moments that comes from the API. This is intended as a mean to validate the `like` and `comment` features since I didn't have access to the complete API.

## Commands
### Install & run the app

    npm install
    npm run serve

### Run the tests

    npm run test:unit

### Deploy to Github Pages

    npm run deploy
