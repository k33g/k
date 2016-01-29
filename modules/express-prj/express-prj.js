/**
 * Express ES2015 project generator
 */

var readlineSync = require('readline-sync');
var colors = require('colors');

/**
 * if the command is `k express-prj sandbox/yo`
 * the last argument of process.argv is `sandbox/yo`
 * we insert the list of files in the array befor the last argument
 */
process.argv.splice(process.argv.length-1, 0, "index:app:app.config:package:index")

module.exports = {
  data: {
    applicationName: readlineSync.question("application name? :"),
    author: readlineSync.question("author name? :"),
    license: readlineSync.question("license? :"),
    httpPort: readlineSync.question("httpPort? :")
  },
  templates:[
    'index.js.tpl', 'app.js.tpl', 'app.config.js.tpl', 'package.json.tpl', 'index.html.tpl'
  ],
  extensions:[
    'js', 'js', 'js', 'json', 'html'
  ],
  targets:[ // if you need to generate files in differents targets you have to define a `targets` property
    "","","","", "public/"
  ],
  after: () => {
    console.log("Now, you have to type `npm install` and run the application like that: `node index.js`".blue);
  }
};

//

