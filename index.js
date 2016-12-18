'use strict';

var fs           = require('fs');
var objectAssign = require('object-assign');
var yaml         = require('js-yaml');

function parseYaml(file) {
  return yaml.safeLoad(fs.readFileSync(file));
}
module.exports = function(options) {
  var defaults = {
    sourceDir: 'src',
    pugDir: 'pug',
    configDir: 'config',
    configFiles: {
      siteConfig: 'site.yml',
      collectionsConfig: 'collections.yml'
    }
  };
  options = objectAssign(defaults, options);

  var basedir = options.sourceDir + '/' + options.pugDir;
  var configDirPath = basedir + '/' + options.configDir;

  function isPugOption(option) {
    for (var key in defaults) {
      if ({}.hasOwnProperty.call(defaults, key)) {
        if (key === 'basedir') {
          return true;
        }
        if (key === option) {
          return false;
        }
      }
    }
    return true;
  }
  function getSrc() {
    return [
      basedir + '/*.pug',
      '!' + basedir + '/layouts{,/**}',
      '!' + basedir + '/includes{,/**}'
    ];
  }
  function getSite() {
    var siteConfigPath = './' + configDirPath + '/' + options.configFiles.siteConfig;
    return parseYaml(siteConfigPath);
  }
  function getPug() {
    var output = {};
    var data = {
      site: getSite()
      // collections: getCollections();
    };
    // Grab any options passed outside of what gug uses.
    for (var key in options) {
      if ({}.hasOwnProperty.call(options, key)) {
        if (isPugOption(key)) {
          output[key] = options[key];
        }
      }
    }
    // If data wasn't passsed, then create the `data` object,
    // Else, merge it with gug data.
    if (output.data === undefined) {
      output.data = data;
    } else {
      output.data = objectAssign(output.data, data);
    }
    return output;
  }

  return {
    src: getSrc(),
    options: getPug()
  };
};
