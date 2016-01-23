var fs = require('fs')
  , path = require('path')
  , monet = require('monet')
  , colors = require('colors');

function getDirectories(srcpath) {
  try {
    return monet.Maybe.Some(fs.readdirSync(srcpath).filter(function(file) {
      return fs.statSync(path.join(srcpath, file)).isDirectory();
    }));
  } catch (e) {
    return monet.Maybe.None()
  }

}

function getInfo(path) {
  try {
    return monet.Maybe.Some(fs.readFileSync(path).toString())
  } catch (e) {
    return monet.Maybe.None()
  }
}

module.exports = {
  tool: true
};

console.log("--- k modules list ---".blue)
getDirectories(__dirname + "/..")
  .orSome([])
  .forEach(function(module) {
    console.log(
        "-"
      , module.green
      , ":"
      , getInfo(__dirname + "/../" + module + "/info.txt").orSome("no info.txt").cyan
    );
});
