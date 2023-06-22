console.log("Before");
getUser(1, getRepositorites);

getUser(1)
  .then(user => getRepositorites(user.gitHubUsername))
  .then(repos => getCommits(repos[0]))
  .then(commits => console.log('Commits', commits))
  .catch(err => console.log('Error', err.message));

console.log("After");

function getRepositorites(user) {
  getRepositorites(user.gitHubUsername, getCommits);
};

function getCommits(repos) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('Calling GitHub API...');
      resolve(['commit']);
    })
  })
};

function displayCommits(commits) {
  console.log(commits);
};

function getUser(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Reading a user from a database...");
      resolve({ id: id, gitHubUsername: "Will" });
      return;
    }, 2000);
  });
}

function getRepositorites(username) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Calling github API...");
      resolve(["repo1", "repo2", "repo3"]);
    }, 1500);
  })
  return;
}
