// Remove whitespace from modules.isml
module.exports = function(grunt){
  grunt.registerTask('mod_min', function(){
    var modules = grunt.file.read('../templates/default/util/modulesDEV.isml'),
        newMods = modules.replace(/\n/g, '');
    grunt.file.write('../templates/default/util/modules.isml', newMods);
    console.log("modulesDEV.isml minified into modules.isml");
  });
};
