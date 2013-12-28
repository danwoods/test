// Merge code into master and tag it
// Programatically completes the steps listed in (mags wiki branching guide)[http://wiki.magazines.com/display/DEV/Development+And+Branching+Guide#DevelopmentAndBranchingGuide-ProductionReleases]
// *Params*:
//   `ver`: the branch name to merge into master
//   `tagMesg` : tag message
var execSync = require('exec-sync');

function stash(mesg){
  if(!mesg){
    mesg = '';
  }
  execSync('git stash save "' + mesg + '"');
}

// Get status
function gitStatus(){
  return execSync('git status --porcelain');
}

// Get current branch name
function gitBranch(){
  return execSync('git rev-parse --abbrev-ref HEAD');
}

// Merge `branch` into current branch
function gitMerge(branch){
  execSync('git merge ' + branch);
}

function gitPull(){
  execSync('git pull');
}

function gitPush(){
  execSync('git push');
}

function gitTag(ver, mesg){
  execSync('git tag "' + ver + '" -m ' + mesg);
}

function gitCheckout(branch){
  var retVal = false,
      shResp;
  
  shResp = execSync('git checkout -q '+branch);

  if(gitBranch() === branch){
    retVal = true;
  }

  return retVal;
}

// stashDiff()
// Stashes any existing changes
// If third parameter `add` is true, all changes are
// added `git add .` before stashing
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

function getVersionFromBranchName(branchName, regex){
  var ver = branchName,
      re;

  if(regex){
    re = new RegExp(regex);
    if(re.test(branchName)){
      ver = re.exec(branchName)[0];
    }
  }

  return ver;
}

module.exports = function(grunt){
  grunt.registerTask('release', function(){

    var opts = this.options({}, true),
        stashSucc,
        branchToMerge = grunt.option('ver'),
        curBranch = gitBranch(),
        gitRegex = grunt.option('gitRegex') || opts.gitRegex,
        version = getVersionFromBranchName(branchToMerge, gitRegex),
        tagMesg = grunt.option('mesg') || opts.mesg;

    // Stash any current changes
    stashSucc = stashDiff(grunt, 'Stashing changes in '+curBranch+' to checkout ' + branchToMerge, true);

    // Checkout branch to merge
    grunt.log.writeln('Checking out: ' + branchToMerge);
    gitCheckout(branchToMerge);

    // Pull any changes
    grunt.log.writeln('Pulling remote changes to: ' + branchToMerge);
    gitPull();

    // Stash any merge conflicts with pulled changes.
    // Add and stash if necessary.
    stashSucc = stashDiff(grunt, 'Stashing conflicts between your local and the remote branch ' + branchToMerge, true);

    // Checkout master
    gitCheckout('master');

    // Pull master
    gitPull();

    // Stash any differences between user's master and
    // remote master. Add and stash if necessary.
    stashSucc = stashDiff(grunt, 'Stashing conflicts between your local and the remote master', true);

    // Merge branch into master
    gitMerge(branchToMerge);

    // Tag
    grunt.log.writeln('Tagging master: ' + ver);
    gitTag(ver, tagMesg);
    //
    // Push tags
    //
    // Push
    //
    // Alert user if git status returns anything
  
  });
};
