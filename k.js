#!/usr/bin/env node
/**
 * Created by k33g_org on 17/01/16.
 *
 * This is the launcher of K
 * K is written with ES6 and uses Traceur
 * See: https://github.com/google/traceur-compiler/wiki/Using-Traceur-with-Node.js
 */

var traceur = require('traceur');
traceur.require.makeDefault(function(filename) {
  return filename.indexOf('node_modules') === -1;
});
require('./src/run');


