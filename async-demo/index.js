console.log("Before");
// getUser(1, getRepositorites);

// getUser(1)
//   .then(user => getRepositorites(user.gitHubUsername))
//   .then(repos => getCommits(repos[0]))
//   .then(commits => console.log('Commits', commits))
//   .catch(err => console.log('Error', err.message));

// Async & Await approach
async function displayCommits() {
  try {
    const user = await getUser(1);
    const repos = await getRepositorites(user.gitHubUsername);
    const commits = await getCommits(repos[0]);
    console.log(commits);
  } catch (err) {
    console.log('Error', err.message)
  }
}
displayCommits();

console.log("After");

function getCommits(repo) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Calling GitHub API...");
      resolve(["commit"]);
    }, 2000);
  });
}

function getUser(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Reading a user from a database...");
      resolve({ id: id, gitHubUsername: "Will" });
    }, 2000);
  });
}

function getRepositorites(username) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Calling github API...");
      resolve(["repo1", "repo2", "repo3"]);
    }, 2000);
  });
}
