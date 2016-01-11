/*jshint node:true*/
/* global require, module */
var path = require('path');
var _ = require('lodash');
var EmberApp = require('ember-cli/lib/broccoli/ember-app');
var Project = require('ember-cli/lib/models/project');
var UI = require('ember-cli/lib/ui');
var WatchedDir    = require('broccoli-source').WatchedDir;
var UnwatchedDir  = require('broccoli-source').UnwatchedDir;
var Registry = require('ember-cli-preprocess-registry');

var EMBER_PROJ_DIR = path.resolve('test-a');

var MyEmberApp = function (defaults, options) {

  var registry = new Registry(
    require('./package.json').dependencies,
    this);

  EmberApp.call(
    this,
    // deep merge of project by merge-defaults hits recursive loop
    _.merge(defaults, {
      project: options.project
    }), _.merge({
      // registry: registry
    }, _.omit(options, ['project'])));
};
MyEmberApp.prototype = Object.create(EmberApp.prototype);

MyEmberApp.prototype.dependencies = (function () {
  var app_package = require('./package.json');
  return function () {
    return app_package.dependencies;
  };
}());


module.exports = function(defaults) {

  var ui = new UI({
    inputStream:  process.stdin,
    outputStream: process.stdout,
    ci: false,
    writeLevel: undefined // could be 'ERROR'
  });

  var project = new Project(
    path.resolve(EMBER_PROJ_DIR), // project directory
    require(path.join(EMBER_PROJ_DIR, 'package.json')), // pkg
    ui,
    defaults.project.cli // cli
  );

  project.configPath = function () {
    return path.join(EMBER_PROJ_DIR, 'config', 'environment');
  };


  console.log("instatiated project");
  console.log(project.root);


  // Project.setupBowerDirectory undesired behavior: doesn't join paths
  // path.join(path.dirname(bowerrcPath),
  //           JSON.parse(bowerrcContent).directory)
  project.bowerDirectory = path.join(EMBER_PROJ_DIR, 'bower_components');


  var app = new MyEmberApp(defaults, {
    project: project,
    // name: path.join(EMBER_PROJ_DIR, 'app'),

    babel: {
      compileModules: true, // no effect.. EmberApp._prunedBabelOptions
      modules: 'amdStrict',
      resolveModuleSource: require('amd-name-resolver'),
      moduleIds: true
    },

    trees: {
      app: new WatchedDir(path.join(EMBER_PROJ_DIR, 'app')),
      tests: new WatchedDir(path.join(EMBER_PROJ_DIR, 'tests')),
      styles: new UnwatchedDir(
        path.join(EMBER_PROJ_DIR, 'app', 'styles')),
      // bower: undefined, // app.bowerDirectory set by project
      vendor: null,
      public: null
    }
  });

  return app.toTree();
};
