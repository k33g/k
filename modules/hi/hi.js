module.exports = {
  data: {
    firstName:"Bob",
    lastName:"Morane"
  },
  templates:[
    'hi.js.tpl', 'hi.html.tpl'
  ],
  extensions:[
    'js', 'html'
  ],
  before: () => {
    console.log("Starting...".red)
  },
  after: () => {
    console.log("This is the End.".green)
  }
};
