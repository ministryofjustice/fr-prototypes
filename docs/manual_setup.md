Original setup instructions
========================

Ensure you have at least [Ruby](https://www.ruby-lang.org/en/) 2.1.0 and [Node.js](http://nodejs.org/) 0.10.x installed and [Bower](http://bower.io/) installed globally (`npm install -g bower`).

Note: Because of OpenSSL incompatibilites on my machine with Ruby 2.1.0, I use ruby 2.1.5 and it appears to work fine.

1. Install ruby dependencies
  ```
  bundle install
  ```

2. Install bower packages
  ```
  bower install
  ```

3. Build middleman
  ```
  middleman build
  ```

## Development environment

To run the app locally and see changes as you make them:

  ```
  middleman server
  ```

Then view you site at the URL displayed. Normally [http://0.0.0.0:4567/](http://0.0.0.0:4567/).

## Build

To manually build the site:
  ```
  middleman build
  ```

## Deploy to GitHub pages

On each commit to master a [Travis CI job](https://travis-ci.org/ministryofjustice/./) will run any tests. On success it will automagically deploy to the GitHub pages URL in the description. The deploy task will also run the `build` task before deploying.

To deploy manually:
  ```
  middleman deploy
  ```

The changes will be deployes to http://ministryofjustice.github.io/fr-prototypes/


