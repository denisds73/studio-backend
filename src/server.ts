import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';
import { initDB } from './db';
import packageRoutes from './routes/packageRoutes';

const app = express();
app.use(cors());
app.use(express.json());

initDB().then((db) => {
  app.use('/api/packages', packageRoutes(db));

  app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
  });
});
