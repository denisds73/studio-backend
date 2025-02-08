import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';
import { initDB } from './db';
import packageRoutes from './routes/packageRoutes';

const app = express();
app.use(cors());
app.use(express.json());

//the below is data feed - used in the begginit .. hee hee

// const data = [
//   {
//     name: "Basic",
//     price: "100",
//     features: ["Feature 1", "Feature 2", "Feature 3"],
//   },
//   {
//     name: "Standard",
//     price: "200",
//     features: ["Feature 1", "Feature 2", "Feature 3"],
//   },
//   {
//     name: "Premium",
//     price: "300",
//     features: ["Feature 1", "Feature 2", "Feature 3"],
//   },
// ];

// data.forEach(async (pkg) => {
//   await fetch('http://localhost:3000/api/packages', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(pkg),
//   });
// });

initDB().then((db) => {
  app.use('/api/packages', packageRoutes(db));

  app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
  });
});
