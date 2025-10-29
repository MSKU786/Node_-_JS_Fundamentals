import express from 'express';

const app = express();
const PORT = '8000';

app.get('/heavy-load', (req, res) => {
  let counter = 0;
  for (let i = 0; i < 200000000; i++) {
    counter++;
  }

  res.status(200).send(`The result of the heavey load task is: ${counter}`);
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
  console.log(`Server process worker id ${process.pid}`);
});
