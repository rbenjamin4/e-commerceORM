const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/api/categories', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findAll( {
      include: [{ model: Product, through: Product, as: 'category_products'}]
    })
    res.status(200).json(categoryData)
  } catch (err) {
    res.status(500).json(err)
  } 
});

router.get('/api/categories/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product, through: Product, as: 'product_category'}]
    })

    if (!categoryData) {
      res.status(404).json({ message: 'No category found with this id!' });
      return
    }

    res.status(200).json(categoryData)
  } catch (err) {
    res.status(500).json(err)
  }
});

router.post('/api/categories', async (req, res) => {
  // create a new category
  try {
    const categoryData = await Category.create(req.body)
    res.status(200).json(categoryData)
  } catch (err) {
    res.status(400).json(err)
  }
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
