# K

## But what is it?


## Install

- `git clone https://github.com/k33g/k.git`
- `npm install`
- `npm link` (in directory) see [https://docs.npmjs.com/cli/link](https://docs.npmjs.com/cli/link)

## How To?

## Dependencies

### Dev

- esdoc (documentation)
- mocha (tests)
- mocha-traceur
- traceur (globally only if you want to pass the tests)

### Run (see `package.json`)

- traceur (locally only)
- readline-sync
- underscore
- monet
- colors
- mkdirp [https://github.com/substack/node-mkdirp](https://github.com/substack/node-mkdirp)

### Create a module

WIP...

## Resources

- [http://k33g.github.io/2014/05/09/NPM-NODE-CLI.html](http://k33g.github.io/2014/05/09/NPM-NODE-CLI.html)
- [https://github.com/esdoc/esdoc](https://github.com/esdoc/esdoc)

## Build

### Documentation

    sudo npm install -g esdoc
    # then generate the documentation
    esdoc -c esdoc.json


### Tests

    sudo npm install -g mocha
    sudo npm install -g traceur         # you need Traceur as global dependency for using mocha-traceur
    sudo npm install -g mocha-traceur

    mocha --compilers js:mocha-traceur tests/*.js
