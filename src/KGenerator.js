import monet from 'monet';
import ModuleLoader from './ModuleLoader';
import colors from 'colors';
import fs from 'fs';
import _ from 'underscore';
import mkdirp from 'mkdirp';


/**
 * This is the main class
 */
export default class KGenerator {

  /**
   * This method checks if the module has the appropriate properties
   * @param {Maybe} mayBeModule
   * @returns {Maybe}
   *
   */
  checkModule(mayBeModule) {

    return mayBeModule.toEither("Impossible to load the module").cata((error) =>{
      console.info(error.red);
      return monet.Maybe.None();
    }, (module) => {
      // check if data and templates exists or if the module is a tool
      return (module.data && module.templates && module.extensions) || module.tool
        ? monet.Maybe.Some(module) : monet.Maybe.None();
    });
  }

  /**
   *
   * @param moduleName
   * @param templateName
   * @returns {Maybe}
   */
  loadAndExecuteTemplate(moduleName, templateName) {
    try {
      var templateFileContent = fs.readFileSync(__dirname+"/../modules/"+moduleName+"/"+templateName).toString();
      var tpl  = _.template(templateFileContent);
      return monet.Maybe.Some(tpl);
    } catch (e) {
      return monet.Maybe.None();
    }

  }

  /**
   *
   * @param generatedFileName
   * @param compiledTemplate
   * @param data
   * @returns {Maybe}
   */
  generateFile(generatedFileName, compiledTemplate, data) {

    try {
      fs.writeFileSync(
        process.cwd()+ "/" +generatedFileName
        , compiledTemplate({data : data})
      );
      return monet.Maybe.Some(true)
    } catch(e) {
      //console.log("Exception when generateFile", e);
      return monet.Maybe.None();
    }

  }

  /**
   *
   * @param {String} path
   */
  createDirectory(path) {
    try {
      return monet.Maybe.Some(mkdirp.sync(process.cwd() + "/" + path));
    } catch(e) { // if path exists -> Illegal state exception
      return monet.Maybe.None();
    }
  }

  /**
   *
   * @param {JavaScriptModule} module is the loaded module
   * @param {String} moduleName
   * @param {MayBe} mayBeFiles value is an array of files to be generated
   * @param {MayBe} mayBeDestination
   */
  generateFiles(module, moduleName, mayBeFiles, mayBeDestination) {

    module.before ? module.before() : monet.Maybe.None();

    var destination = "";
    mayBeDestination.toEither("No path").cata((message) => {
      console.info(message.blue);
    }, (path) => {
      this.createDirectory(path);
      // TODO: deals with other errors than "Illegal state exception"
      destination = "/"+path+"/";

      if(module.targets) {
        module.targets.filter((target) => { return target!=="" }).forEach((target) => {
          this.createDirectory(destination+target);
        })
      }
    });


    mayBeFiles.toEither("You probably forgot to input parameters")
      .cata(
        (error)=>{
          console.info(error.red);
        },
        (arrayOfFilesNameToBeGenerated) => { // generation for each file
          console.log("Module name:".blue, moduleName);
          console.log("Generated files:".blue, arrayOfFilesNameToBeGenerated);

          let templates = module.templates;

          // Add some informations to module.data
          // Useful if you want that the function or class has the name of the file
          module.data.filesNames = arrayOfFilesNameToBeGenerated;

          console.log("templates:".blue, templates);

          templates.forEach((templateName) => {

            console.log("templateName:".magenta, templateName);

            this.loadAndExecuteTemplate(moduleName, templateName)
              .toEither(`There is a problem with the template: ${templateName}.`)
              .cata(
                (error) => {
                console.info(error.red)
                }, (compiledTemplate) => {

                  let index = arrayOfFilesNameToBeGenerated.length == 1 ? 0 : templates.indexOf(templateName);
                  let generatedFileName =
                    destination + (module.targets!==undefined ? module.targets[templates.indexOf(templateName)] : "") +
                    arrayOfFilesNameToBeGenerated[index] +
                    "." + module.extensions[templates.indexOf(templateName)];

                  this.generateFile(generatedFileName, compiledTemplate, module.data)
                    .toEither(`There is a problem when generating ${generatedFileName}.`)
                    .cata((error) => {
                      console.info(error.red)
                    }, (value) => {
                      console.log("generatedFileName:".magenta, generatedFileName);
                    });

                }); // end of cata

          }); // end of templates.forEach

          module.after ? module.after() : monet.Maybe.None();

        } // end of generation for each file
      ); // end of cata

  }

  /**
   * The constructor load and check the external module, and then run the file generation
   *
   * @param {array} parameters, Remark: parameters == process.argv
   *
   */
  constructor(parameters) {
    this.templates = null;

    console.log("K - Files Generator...");
    let moduleLoader = new ModuleLoader(parameters);

    // Load and check module
    let module = this.checkModule(moduleLoader.getModule())
      .toEither(`Something wrong, check if data and templates properties exist in the ${moduleLoader.name().orElse(monet.Maybe.Some("unknown")).val} module`)
      .cata((error) => {
        console.info(error.red)
      }, (module) => {
        //console.info("module".blue, module);

        !module.tool ?
            this.generateFiles(
              module,
              moduleLoader.name().val,
              moduleLoader.filesNames(),
              moduleLoader.destination()
            )
          : monet.Maybe.None(); // do nothing

      })

  }
}



