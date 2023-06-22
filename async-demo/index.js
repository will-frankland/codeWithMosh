console.log("Before");
getUser(1, function(user) {
  console.log('User', user);
});

console.log("After");

function getUser(id, callback) {
  setTimeout(() => {
    console.log("Reading a user from a database...");
    callback({ id: id, gitHubUsername: 'Will' })
    return;
  }, 2000);
}
