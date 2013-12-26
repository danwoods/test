// Load external config files
function loadConfig(path) {
  var glob = require('glob'),
      object = {},
      key;
 
  glob.sync('*', {cwd: path}).forEach(function(option) {
    key = option.replace(/\.js$/,'');
    object[key] = require(path + option);
  });

  return object;
}

module.exports = function(grunt) {
  var config = {
    pkg: grunt.file.readJSON('package.json'),
    // Get Paths
    magsStatic: "cartridges/app_mags2/cartridge/static/default/",
    clftrStatic: "cartridges/app_cleanerfilters/cartridge/static/default/",
    commonStatic: "cartridges/app_common/cartridge/static/default/",
    sfCoreStatic: "cartridges/storefront_core/cartridge/static/default/",
    sfRichUIStatic: "cartridges/storefront_richUI/cartridge/static/default/",
    smtStatic: "cartridges/int_smt/cartridge/static/default/"
  };

  // Combine all configs
  grunt.util._.extend(config, loadConfig('./grunt-tasks/options/'));

  // Load config
  grunt.initConfig(config);

  // Load Tasks standard task
  require('load-grunt-tasks')(grunt);

  // Load custom tasks
  grunt.loadTasks('grunt-tasks');

  // Register aliases
  grunt.registerTask('test', ['jshint']);
  grunt.registerTask('default', ['jshint', 'uglify', 'cssmin', 'requirejs']);
  grunt.registerTask('smt', ['cssmin:smt', 'requirejs:smt']);
  grunt.registerTask('common', ['uglify:common', 'cssmin:common']);
  grunt.registerTask('mags', ['uglify:mags', 'cssmin:mags']);
  grunt.registerTask('cf', ['uglify:cleanerfilters', 'cssmin:cleanerfilters']);
  grunt.registerTask('build-deploy', ['default', 'deploy']);

};
