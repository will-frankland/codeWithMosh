const p = new Promise((resolve, reject) => {
  // Async work (access db, start timer etc)
  setTimeout(() => {
    resolve(1);
    reject(new Error('Error occurred'));
  }, 2000);
});

p
  .then((result) => console.log("Result:", result))
  .catch(err => console.log('Error', err.message));
