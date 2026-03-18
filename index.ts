import express from 'express';
import * as fs from './src/file-system/fs.js';

const app = express();
app.use(express.json());

fs.checkLocalDataFile();

app.get('/data', (req, res) => {
  const data = fs.getData();
  if (data) {
    res.json(data);
  } else {
    res.status(500).json({ error: 'Failed to retrieve data' });
  }
});

app.get('/data/id/:id', (req, res) => {
  let id: number;
  try {
    id = parseInt(req.params.id);
    if (isNaN(id)) {
      throw new Error('Invalid ID');
    }
  } catch (error) {
    return res.status(400).json({ error: 'Invalid ID format' });
  }

  const item = fs.getDataById(id);
  if (item) {
    res.json(item);
  } else {
    res.status(404).json({ error: 'Data not found' });
  }
});

app.post('/data', (req, res) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({ error: 'Request body is missing' });
  }

  const newData = req.body;
  fs.addData(newData);
  res.status(201).json({ message: 'Data received' });
});

app.put('/data/id/:id', (req, res) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({ error: 'Request body is missing' });
  }

  let id: number;
  try {
    id = parseInt(req.params.id);
    if (isNaN(id)) {
      throw new Error('Invalid ID');
    }
  } catch (error) {
    return res.status(400).json({ error: 'Invalid ID format' });
  }

  const existingData = fs.getDataById(id);
  if (!existingData) {
    return res.status(404).json({ error: 'Data not found' });
  }

  fs.updateData(id, req.body);
  res.json({ message: 'Data updated' });
});

app.delete('/data/id/:id', (req, res) => {
  let id: number;
  try {
    id = parseInt(req.params.id);
    if (isNaN(id)) {
      throw new Error('Invalid ID');
    }
  } catch (error) {
    return res.status(400).json({ error: 'Invalid ID format' });
  }

  fs.deleteData(id);
  res.json({ message: 'Data deleted' });
});

app.get('/initialize', async (req, res) => {
  const status = await fs.initializeData();
  if (status) {
    res.json({ message: 'Data source initialized successfully' });
  } else {
    res.status(500).json({ error: 'Missing data file' });
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
