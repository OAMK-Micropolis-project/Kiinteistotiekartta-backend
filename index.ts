import express from 'express';
import data from './src/data.json' with { type: 'json' };

const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/data', (req, res) => {
  res.json(data);
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
