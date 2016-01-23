var colors = require('colors');

module.exports = {
  data: {
    firstName:"Bob",
    lastName:"Morane"
  },
  templates:[
    'yo.tpl'
  ],
  extensions:[
    'txt'
  ],
  before: () => {
    console.log("Starting...".red)
  },
  after: () => {
    console.log("This is the End.".green)
  }
}
