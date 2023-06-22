console.log("Before");
getUser(1, (user) => {
  getRepositorites(user.gitHubUsername, function (repo) {
    console.log("repos", repo);
  });
});

console.log("After");

function getUser(id, callback) {
  setTimeout(() => {
    console.log("Reading a user from a database...");
    callback({ id: id, gitHubUsername: "Will" });
    return;
  }, 2000);
}

function getRepositorites(username, callback) {
  setTimeout(() => {
    console.log("Calling github API...");
    callback(["repo1", "repo2", "repo3"]);
  }, 1500);
  return;
}
