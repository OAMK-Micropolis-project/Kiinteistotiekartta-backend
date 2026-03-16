import exress from 'express';
import * as firebaseApi from './src/firebase/firebaseApi.js';

const app = exress();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/kiinteistot', async (req, res) => {
  try {
    const kiinteistot = await firebaseApi.getKiinteistot();
    res.json(kiinteistot);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching kiinteistöt' });
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
