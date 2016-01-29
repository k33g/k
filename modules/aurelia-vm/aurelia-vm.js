/**
 * Aurelia view-model module
 *
 * Use:
 *
 *     k aurelia-vm <name_of_view-model> <path_destination_if_you_want>
 *     k aurelia-vm Bob sandbox/aurelia
 */

module.exports = {
  data: {
    message:"Hello World!",
    copyright:"(c) Acme"
  },
  templates:[
    'app.js.tpl', 'app.html.tpl'
  ],
  extensions:[
    'js', 'html'
  ]
};
