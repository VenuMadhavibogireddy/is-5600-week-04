const path = require('path');
const Products = require('./products');

/**
 * @param {object} req
 * @param {object} res
 */
function handleRoot(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
}

/**
 * @param {object} req
 * @param {object} res
 */
async function listProducts(req, res) {
  const { limit = 10, offset = 0, tag } = req.query;

  try {
    const products = await Products.list({ limit: Number(limit), offset: Number(offset), tag });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

/**
 * @param {object} req
 * @param {object} res
 */
async function getProduct(req, res, next) {
  const { id } = req.params;

  try {
    const product = await Products.get(id);
    if (!product) return next(); 
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

/**
 * @param {object} req
 * @param {object} res
 */
async function createProduct(req, res) {
  const newProduct = req.body;
  res.status(201).json(newProduct);
}

/**
 * @param {object} req
 * @param {object} res
 */
async function updateProduct(req, res) {
  const { id } = req.params;
  const updatedData = req.body;
  res.status(200).json({ id, ...updatedData });
}

/**
 * @param {object} req
 * @param {object} res
 */
async function deleteProduct(req, res) {
  const { id } = req.params;
  res.status(202).json({ message: `Product ${id} deleted` });
}

module.exports = {
  handleRoot,
  listProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};