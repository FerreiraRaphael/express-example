[![Build Status](https://travis-ci.org/FerreiraRaphael/express-starter.svg?branch=master)](https://travis-ci.org/FerreiraRaphael/express-starter) [![Coverage Status](https://coveralls.io/repos/github/FerreiraRaphael/express-starter/badge.svg?branch=master)](https://coveralls.io/github/FerreiraRaphael/express-starter?branch=master)

# Express Starter

This repository is a boilerplate to my projects that use Express and Sequelize.

This boilerplate was created using the [express-example](https://github.com/sequelize/express-example) boilerplate from sequelize.

To deploy this project to heroku, modify the app.json file that the root of this project, 
and press this button.

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

## Starting App

Rename `config/config.example.js` to `config/config.js` 
and adjust the it to fit your environment. 
Once thats done, your database configuration is ready!

Run the following commands:
```
npm install
node_modules/.bin/sequelize db:create
node_modules/.bin/sequelize db:migrate
npm start
```

This will start the application and create an database and run it's migrations.
Just open [http://localhost:3000](http://localhost:3000).

## Tests

There is some [Mocha](https://mochajs.org) based test. You can run them by `npm test`

## Eslint

Eslint rules extends [eslint-config-airbnb-base](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb-base) and [eslint-config-prettier](https://github.com/prettier/eslint-config-prettier).

## Travis CI and Heroku

To add a deploy key to .travis.yml run:
`travis encrypt heroku auth:token --add deploy.api_key`
Obs: Make sure that you are logged at the travis cli and heroku cli.
