import { Router } from 'express';

const packageRoutes = (db: any) => {
  const router = Router();

  // Insert Package
  router.post('/', async (req, res) => {
    const { name, price, features } = req.body;
    try {
      await db.run(
        `INSERT INTO packages (name, price, features) VALUES (?, ?, ?)`,
        [name, price, JSON.stringify(features)]
      );
      res.status(201).json({ message: 'Package added successfully' });
    } catch (error) {
      res.status(500).json({ error: `${error} Failed to add package`});
    }
  });


  // Fetch Packages
  router.get('/', async (req, res) => {
    try {
      const packages = await db.all(`SELECT * FROM packages`);
      const formattedPackages = packages.map((pkg: any) => ({
        ...pkg,
        features: JSON.parse(pkg.features),
      }));
      res.json(formattedPackages);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch packages' });
    }
  });

  router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { name, price, features } = req.body;
    try {
      await db.run(
        `UPDATE packages SET name = ?, price = ?, features = ? WHERE id = ?`,
        [name, price, JSON.stringify(features), id]
      );
      res.json({ message: 'Package updated successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to update package' });
    }
  });

  // Delete Package
  router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
      await db.run(`DELETE FROM packages WHERE id = ?`, [id]);
      res.json({ message: 'Package deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete package' });
    }
  });
  return router;
};

export default packageRoutes;
