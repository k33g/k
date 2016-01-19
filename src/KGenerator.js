import monet from 'monet';
import ModuleLoader from './ModuleLoader';
import colors from 'colors';
import fs from 'fs';
import _ from 'underscore';


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
      console.info(error.red)
      return monet.Maybe.None();
    }, (module) => {
      // check if data and templates exists
      return module.data && module.templates && module.extensions
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
        process.cwd() + generatedFileName
        , compiledTemplate({data : data})
      );
      return monet.Maybe.Some(true)
    } catch(e) {
      return monet.Maybe.None();
    }

  }

  /**
   *
   * @param {JavaScriptModule} module is the loaded module
   * @param {String} moduleName
   * @param {MayBe} mayBeFiles value is an array of files to be generated
   */
  generateFiles(module, moduleName, mayBeFiles) {

    console.log("mayBeFiles".green, mayBeFiles)
    console.log("mayBeFiles.val".yellow, mayBeFiles.val)

    mayBeFiles.toEither("You probably forgot to input parameters")
      .cata(
        (error)=>{
          console.info(error.red);
        },
        (arrayOfFilesNameToBeGenerated) => {
          console.log("Module name:".blue, moduleName);
          console.log("Generated files:".blue, arrayOfFilesNameToBeGenerated);

          let templates = module.templates;

          console.log("templates:".blue, templates);

          templates.forEach((templateName) => {

            console.log("templateName:".magenta, templateName);

            this.loadAndExecuteTemplate(moduleName, templateName).toEither(`There is a problem with the template: ${templateName}.`)
              .cata((error) => {
                console.info(error.red)
              }, (compiledTemplate) => {

                var index = arrayOfFilesNameToBeGenerated.length == 1 ? 0 : templates.indexOf(templateName);
                var generatedFileName = "/" + arrayOfFilesNameToBeGenerated[index] +"." + module.extensions[templates.indexOf(templateName)];

                //---
                this.generateFile(generatedFileName, compiledTemplate, module.data).toEither(`There is a problem when generating ${generatedFileName}.`)
                  .cata((error) => {
                    console.info(error.red)
                  }, (value) => {
                    console.log("generatedFileName:".magenta, generatedFileName);
                  });

              });

          });

        }
      )

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
        console.info("module".blue, module);

        this.generateFiles(module, moduleLoader.name().val, moduleLoader.filesNames());

      })

  }
}

//--- go! ---
new KGenerator(process.argv);


