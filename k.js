#!/usr/bin/env node
/**
 * Created by k33g_org on 17/01/16.
 *
 * This is the launcher of K
 * K is written with ES6 and uses Traceur
 */

var traceur = require('traceur');
traceur.require.makeDefault(function(filename) {
  // don't transpile our dependencies, just our application
  return filename.indexOf('node_modules') === -1;
});
require('./src/KGenerator');

