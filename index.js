'use strict';

var fs           = require('fs');
var objectAssign = require('object-assign');
var yaml         = require('js-yaml');

function parseYaml(file) {
  return yaml.safeLoad(fs.readFileSync(file));
}
// NOTE Gonna have to make this module handle the other settings for pug as well.
module.exports = function(options) {
  var defaults = {
    src: [
      'src/pug/*.pug',
      '!src/pug/layouts{,/**}',
      '!src/pug/includes{,/**}'
    ],
    options: {
      basedir: 'src',
      pretty: true
    },
    data: {
      configDirPath: './config/',
      siteConfig: 'site.yml',
      collectionsConfig: 'collections.yml'
    }
  };
  options = objectAssign(defaults, options);

  function getConfigPaths(options) {
    var output = {};
    var pathToConfigDir = options.configDirPath;
    var configFiles = {
      siteConfig: options.siteConfig,
      collectionsConfig: options.collectionsConfig
    };

    for (var key in configFiles) {
      if ({}.hasOwnProperty.call(values, key)) {
        output[key] = pathToConfigDir + configFiles[key];
      }
    }
    return output;
  }

  var configPaths = getConfigPaths(options.data);

  function site() {
    var fileToParse = fs.readFileSync(configPaths.siteConfig);
    var parsedFile = yaml.safeLoad(fileToParse);
    return parsedFile;
  }
  function collections() {
    // the output of any collection should be collections.collection.foo.bar
    // The directory name should match the defined collection name
    var collectionsConfig = this.parseYaml(configPaths.collectionsConfig);
    // Gets each collection and their settings.

    // Iterate over each collection
    // for ( var collection in collections )

    // Check if collection is active.
    // Store in an array.
    // loop through those and grab the items in each collection.
    // assign the data as an object in an array.
    // itterate through the array via pug.

    return registeredCollections;
  }
  return {
    site: site(),
    collections: collections()
  };
}
