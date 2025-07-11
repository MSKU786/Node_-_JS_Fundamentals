const customPromiseAllSettled = (tasks) => {
  if (!Array.isArray(tasks)) {
    throw new Error('tasks should be an array');
  }
  const promise = new Promise((resolve, reject) => {
    let solutions = new Array(tasks.length).fill(null);
    for (let i = 0; i < tasks.length; i++) {
      tasks[i]
        .then((res) => {
          solutions[i] = res;
        })
        .catch((err) => (solutions[i] = err));
    }
    resolve(solutions);
  });

  return promise;
};
