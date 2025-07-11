const customPromiseAllSettled = (tasks) => {
  if (!Array.isArray(tasks)) {
    throw new Error('tasks should be an array');
  }
  const promise = new Promise((resolve, reject) => {
    let solutions = new Array(tasks.length).fill(null);
    let completed = 0;
    for (let i = 0; i < tasks.length; i++) {
      Promise.resolve(tasks[i])
        .then((res) => {
          solutions[i] = { status: 'fulfilled', res };
        })
        .catch((err) => (solutions[i] = { status: 'reject', err }))
        .finally(() => {
          completed++;
          if (completed === tasks.length) resolve(solutions);
        });
    }
  });

  return promise;
};
