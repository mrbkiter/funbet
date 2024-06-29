const helpers = require("handlebars-helpers")();

function registerHandleBarHelpers(plop) {
    for (const prop in helpers) {
        // if it is not an already included "case" helper, than add the helper to plop
        if (!prop.toLowerCase().includes("case")) {
            plop.setHelper(prop, helpers[prop]);
        }
    }
    
}

function registerCustomAction(plop) {
  
  plop.setActionType('output-name', function (answers, config, plop) {
		const pascalName = plop.getHelper('pascalCase')(answers.name);
		return `
		        1. New component is created with this name
		           ${answers.wcName}
		           
		        2. Add this to MicroComponent.jsx:
		           import ${pascalName}Shared from "${answers.importParentPath}/${pascalName}/shared";
		           
		        3. Add this to rootMicroReducers
               import ${pascalName}Reducer from '${answers.importParentPath}/${pascalName}/reducer';   
		`;
	});
}

const config = (plop) => {
  
  registerHandleBarHelpers(plop);
  registerCustomAction(plop);
  plop.setGenerator('reactapp-generate', {
    description: 'Generate a redux collection template',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'What do you want to title this redux collection?',
      },
      {
        type: 'input',
        name: 'path',
        message: 'Where do you want to push this redux collection?',
      },
    ],
    actions: [
      {
        type: 'addMany',
        destination: '{{path}}/{{pascalCase name}}',
        base: 'src/generateTemplates/component-templates/',
        templateFiles: 'src/generateTemplates/component-templates/*.hbs',
        skipIfExists: true,
      },
      {
        type: 'addMany',
        destination: '{{path}}/{{pascalCase name}}/__test__',
        base: 'src/generateTemplates/unit-test-templates/',
        templateFiles: 'src/generateTemplates/unit-test-templates/*.hbs',
        skipIfExists: true,
      },
      {
        type: 'add',
        path: '{{path}}/{{pascalCase name}}/__mocks__/mockData.js',
        base: 'src/generateTemplates/unit-test-templates/',
        templateFile:
          'src/generateTemplates/unit-test-templates/mock/mockData.hbs',
        skipIfExists: true,
      }
    ],
  });
  plop.setGenerator('initFeature', {
    description: 'Start to generate base template for a feature',
    prompts: [ // https://github.com/SBoudrias/Inquirer.js/blob/master/packages/inquirer/README.md#examples
      {
        type: 'input',
        name: 'name',
        message: 'Give the feature name',
        default: 'CandidateBulkTagging'
      },
      {
        type: 'input',
        name: 'wcName',
        message: '<optional> Give the web component name which would be used to register on jsp. Skipping this step & a name will be automatically created for you',
        default: (currentInquierAnswers) => {
          const compound = currentInquierAnswers.name.match(/[A-Z]+[^A-Z]*|[^A-Z]+/g).join(" ");
          return `wc-${helpers.dashcase(compound)}`
        }
      },
      {
        type: 'input',
        name: 'path',
        message: 'Give the folder path where the generated file will be located in. Example: <your folder path>/staffingboss-reactapp/packages/reactapp/src/pages/VincereCore',
        default: '/Users/telvin/Documents/www/staffingboss-reactapp/packages/reactapp/src/pages/VincereCore'
      },
      
      {
        type: 'input',
        name: 'importParentPath',
        message: 'Give the relative path of the parent folder which contains the feature (webpack alias supported). Example: pages, or pages/VincereCore',
        default: 'pages/VincereCore'
      },
      
      
      {
        type: 'input',
        name: 'msgResourceKey',
        message: '<optional> Give the name of the message resource jsp for feature (for translation purpose). Skipping this step & a name will be automatically created for you',
        default: (currentInquierAnswers) => {
          return plop.getHelper('camelCase')(currentInquierAnswers.name);;
        } 
      },
    ],
    actions: [
      {
        type: 'addMany',
        destination: '{{path}}/{{pascalCase name}}/',
        base: 'src/generateTemplates/initFeatureTemplates/',
        templateFiles: 'src/generateTemplates/initFeatureTemplates/**/*.hbs',
        skipIfExists: true,
      },
      {
        type: 'output-name'
      }
    ]
  })
};

module.exports = config;