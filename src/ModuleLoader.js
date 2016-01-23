import monet from 'monet';
import colors from 'colors';

/**
 * This is a helper to read command line arguments
 * and load the appropriate module
 */
export default class ModuleLoader {

  /**
   * @param {array} parameters == process.argv
   * An array containing the command line arguments.
   * The first element will be 'node',
   * the second element will be the name of the JavaScript file.
   * The next elements will be any additional command line arguments.
   */
  constructor(parameters) {
    console.log("[ModuleLoader]parameters", colors.green(parameters));
    this.parameters = parameters;
  }
  /**
   * @returns {Maybe} value of Maybe is the name of the module or null if error
   */
  name() {
    try {
      return monet.Maybe.Some(this.parameters[2]);
    } catch (e) {
      return monet.Maybe.None();
    }
  }

  /**
   * @returns {Maybe} value of Maybe is the destination path (to generate files) or null if error
   */
  destination() {
    try {
      return monet.Maybe.Some(this.parameters[4]);
    } catch (e) {
      return monet.Maybe.None();
    }
  }

  /**
   * @returns {Maybe} value of Maybe is an array of string or null if error
   */
  filesNames() {
    try {
      let filesNames = this.parameters[3].split(":");
      // when you split a string, it's always an array, so you don't have to check the type of filesNames
      return monet.Maybe.Some(filesNames)
    } catch (e) {
      return monet.Maybe.None();
    }
  }

  /**
   * @param moduleName {string}
   * @returns {Maybe} value of Maybe is a js module or null if error
   */
   loadKModule(moduleName) {
    try {
      return monet.Maybe.Some(require("../modules/"+moduleName+"/"+moduleName+".js"))
    } catch (e) {
      // probably bad name (or module does'nt exist
      return monet.Maybe.None();
    }
  }

  /**
   * @returns {Maybe} value of Maybe is a js module or null if error
   */
  getModule() {

    return this.name().toEither("Something wrong about module name")
      .cata((error) => {
        console.log(colors.red(error));
        return monet.Maybe.None();
      }, (value) => { // value is the module name to load

        return this.loadKModule(value).toEither(`Something wrong about ${this.name().orElse(monet.Maybe.Some("unknown")).val} module directory or source code`)
          .cata((error) => {
            console.log(colors.red(error));
            return monet.Maybe.None();
          }, (myModule) => { // myModule is the js loaded module
            return monet.Maybe.Some(myModule);
          });

      });
  }

}