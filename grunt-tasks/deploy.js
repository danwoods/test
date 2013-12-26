// Create deploy branch
var dwup = require('../node_modules/dware-upload'),
    dwact = require('../node_modules/dware-activate'),
    prompt = require('prompt');

module.exports = function(grunt){
  grunt.registerTask('deploy', function(){
    var opts = this.options({}, true),
        user = grunt.option('user') || opts.user || process.env.USER,
        pass = grunt.option('pass') || opts.pass,
        inst = grunt.option('inst') || opts.inst,
        org  = grunt.option('org') || opts.org,
        folder = grunt.option('folder') || opts.folder,
        source = grunt.option('source') || opts.source,
        timestamp = grunt.option('ts') || opts.ts,
        useGit = grunt.option('git') || opts.git,
        gitRegex   = grunt.option('gitRegex') || opts.gitRegex,
        maxUploads = grunt.option('maxUploads') || opts.maxUploads,
        noActivate = grunt.option('no-activate') || opts['no-activate'],
        done = this.async(),
        promptSchema = {
          properties: {
            user: {
              required: true
            },
            pass: {
              required: true,
              hidden: true
            },
            org: {
              required: true
            }
          }
        };

    // Setup logger to pass to modules
    function logger(level, mesg){
      if(level === 'info'){
        level = 'ok';
      }
      if(grunt.log[level]){
        grunt.log[level](mesg);
      }
      else{
        console.log('['+level+'] '+mesg);
      }
    }

    // Setup prompt; if necc, prompt user for required values;
    // then fire calls to dware-upload/dware-activate
    prompt.start();
    prompt.override = {user:user, pass:pass, org:org};
    prompt.get(promptSchema, function(err, result){
      dwup(result.user, result.pass, inst, result.org, folder, source, timestamp, useGit, gitRegex, maxUploads, logger, function(err, upObj){
        if(err){
          grunt.log.error('Error: '+err);
          return false;
        }
        else{
          grunt.log.ok('Successfully uploaded files');
          if(!noActivate){
            dwact(user, pass, inst, org, upObj.folder, logger, function(err){
              if(err){
                grunt.log.error('Error: '+err);
                return false;
              }
              else{
                done();
              }
            });
          }
          else{
            done();
          }
        }
      });
    });
  });
};
