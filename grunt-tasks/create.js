// Create branch
var execSync = require('exec-sync');

function stash(mesg){
  if(!mesg){
    mesg = '';
  }
  execSync('git stash save "' + mesg + '"');
}

function gitStatus(){
  return execSync('git status --porcelain');
}

function stashDiff(grunt, stashMesg, add){
  var changesToStash;

  // **git status**
  //  * If diffs, stash them w/ message and notify user
  changesToStash = gitStatus();
  if(changesToStash){
    if(add){
      grunt.log.writeln('Adding changes');
      execSync('git add .');
    }
    stash(stashMesg);
    grunt.log.writeln('Stashing changes');
  }
  // Re-check to make sure we got everything
  changesToStash = gitStatus();
  if(changesToStash){
    grunt.log.error('It looks like you have untracked files. Please remove or add them and re-try');
    grunt.log.writeln(execSync('git status'));
    return false;
  }
  return true;
}

module.exports = function(grunt){
  grunt.registerTask('create', function(){
    var currentBranch,
        newBranch = grunt.option('ver'),
        shResp;

    // Check if necc params
    if(!newBranch){
      grunt.log.error('Missing --ver option');
      return false;
    }
    // Save current branch name
    currentBranch = execSync('git rev-parse --abbrev-ref HEAD');
    grunt.log.writeln('Current branch: ' + currentBranch);

    // git status
    if(!stashDiff(grunt, 'Stashing to create '+newBranch)){
      return false;
    }

    // git checkout master
    grunt.verbose.writeln('Running: git checkout -q master');
    shResp = execSync('git checkout -q master');
    if(execSync('git rev-parse --abbrev-ref HEAD') !== 'master'){
      grunt.log.error('Issue checking out master');
      return false;
    }
    grunt.log.writeln('Checked out master');
    grunt.log.ok('Current branch: master');

    // git status
    // Here we add and stash if there are differences
    if(!stashDiff(grunt, 'Stashing changes when moving from ' + newBranch + ' to master', true)){
      return false;
    }

    // git pull
    grunt.verbose.writeln('Running: git pull');
    shResp = execSync('git pull');

    // git status
    if(gitStatus()){
      grunt.log.error('Unmerged files remaining after pulling master. Please check and re-run');
      grunt.log.writeln(execSync('git status'));
      return false;
    }

    grunt.verbose.writeln('Running: grb new '+newBranch);
    shResp = execSync('grb new '+newBranch, true);

    // Confirm grb
    if(execSync('git rev-parse --abbrev-ref HEAD') !== newBranch){
      grunt.log.error('Error running grb');
      grunt.log.debug('Error: '+JSON.stringify(shResp));
      return false;
    }
    else{
      grunt.log.ok('Successfully created and pushed new branch '+newBranch);
      grunt.log.ok('Current branch: '+newBranch);
      return true;
    }

    // * Update package.json
    // **git commit**
    // Notify user that they are on the new branch and can begin merging in tickets. Also give instructions on how to return to their previous state
  });
};
