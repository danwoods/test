// Merge code into master and tag it
// Programatically completes the steps listed in (mags wiki branching guide)[http://wiki.magazines.com/display/DEV/Development+And+Branching+Guide#DevelopmentAndBranchingGuide-ProductionReleases]
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

function gitBranch(){
  return execSync('git rev-parse --abbrev-ref HEAD');
}

function gitPull(){
  execSync('git pull');
}

function gitCheckout(branch){
  var retVal = false;
  
  execSync('git checkout -q '+branch);

  if(gitBranch() === branch){
    retVal = true;
  }

  return retVal;
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
  grunt.registerTask('release', function(){

  var stashSucc,
      branchToMerge,
      curBranch = gitBranch();

  // Stash any current changes
  stashSucc = stashDiff(grunt, 'Stashing changes in '+curBranch+' to checkout master', true);

  // Checkout master
  gitCheckout('master');

  // Pull master
  gitPull();

  // Stash any differences between user's master and remote master
  stashSucc = stashDiff(grunt, 'Stashing changes in user\'s master to merge '+branchToMerge+' into master', true);

  // Merge branch into master
  //
  // Tag
  //
  // Push tags
  //
  // Push
  //
  // Alert user if git status returns anything
  
  });
};
