var readlineSync = require('readline-sync');
// see https://www.npmjs.com/package/readline-sync
module.exports = {
  data: {
    name: readlineSync.question("What's your name? :")
  },
  templates:[
    'ola.tpl'
  ],
  extensions:[
    'txt'
  ]
};
