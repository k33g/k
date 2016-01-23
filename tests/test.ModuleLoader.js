/**
 * Created by k33g_org on 17/01/16.
 */

import assert from 'assert';
import KGenerator from '../src/KGenerator';
import ModuleLoader from '../src/ModuleLoader';
import monet from 'monet';


/**
 * Testing ModuleLoader
 * TODO: improve tests descriptions
 */
describe("Play with ModuleLoader and just one file name", () => {

  let parameters = [null, null, "yo", "bob", "../../sandbox"];
  let moduleLoader = new ModuleLoader(parameters);

  //let kGenerator = new KGenerator(parameters);

  describe("Test parameters", () => {
    it("should equals to parameters", () => {
      assert.equal(moduleLoader.parameters, parameters);
    })

  });

  describe("Test name() method", () => {
    it("should return 'yo'", () => {
      assert.equal(moduleLoader.name().val, "yo");
    });

  });

  describe("Test destination() method", () => {
    it("should return '../../sandbox'", () => {
      assert.equal(moduleLoader.destination().val, "../../sandbox");
    });

  });

});


describe("Play with ModuleLoader and several files names", () => {

  let parameters = [null, null, "hi", "bobCde:bobUi", "../../sandbox"];
  let moduleLoader = new ModuleLoader(parameters);


  describe("Test filesNames() method", () => {
    it("should return ['bobCde', 'bobUi']", () => {
      assert.equal(moduleLoader.filesNames().val[0], "bobCde");
      assert.equal(moduleLoader.filesNames().val[1], "bobUi");
    });

  });

});

describe("Load a module", () => {

  let parameters = [null, null, "hi", "bobCde:bobUi", "../../sandbox"];
  let moduleLoader = new ModuleLoader(parameters);

  describe("Test loadKModule", () => {
    it("should return 'Bob' and 'Morane'", () => {
      assert.equal(moduleLoader.loadKModule("hi").val.data.firstName, "Bob");
      assert.equal(moduleLoader.loadKModule("hi").val.data.lastName, "Morane");
    });

    it("should have 2 templates and 2 extensions", () => {
      assert.equal(moduleLoader.loadKModule("hi").val.templates.length, 2);
      assert.equal(moduleLoader.loadKModule("hi").val.extensions.length, 2);
    });

  });

  describe("Test getModule()", () => {
    it("should return 'Bob' and 'Morane'", () => {
      assert.equal(moduleLoader.getModule().val.data.firstName, "Bob");
      assert.equal(moduleLoader.getModule().val.data.lastName, "Morane");
    });

    it("should have 2 templates and 2 extensions", () => {
      assert.equal(moduleLoader.getModule().val.templates.length, 2);
      assert.equal(moduleLoader.getModule().val.extensions.length, 2);
    });

  });

});