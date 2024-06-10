const jsonServer = require('json-server');
const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

const ProductosIMG = path.join(__dirname, 'uploads');

// Crear la carpeta de uploads si no existe
if (!fs.existsSync(ProductosIMG)) {
  fs.mkdirSync(ProductosIMG);
}

// Configuración de multer para guardar archivos en la carpeta "uploads"
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, ProductosIMG);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

app.use(express.json()); // Para poder parsear el cuerpo de las peticiones JSON

// Middleware para manejar la subida de archivos y actualizar el producto
app.post('/upload/:id', upload.single('image'), (req, res) => {
  const productId = parseInt(req.params.id, 10);
  const db = router.db; // Obtener la instancia de lowdb
  const product = db.get('products').find({ ID: productId }).value();

  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }

  // Validaciones
  let hasErrors = false;
  let errors = {};

  if (req.body.Name && req.body.Name.length < 2) {
    hasErrors = true;
    errors.Name = "La longitud del nombre debe tener al menos 2 caracteres";
  }
  if (req.body.Brand && req.body.Brand.length < 2) {
    hasErrors = true;
    errors.Brand = "La longitud de la marca debe tener al menos 2 caracteres";
  }
  if (req.body.Category && req.body.Category.length < 2) {
    hasErrors = true;
    errors.Category = "La longitud de la categoría debe tener al menos 2 caracteres";
  }
  if (req.body.Price && req.body.Price <= 0) {
    hasErrors = true;
    errors.Price = "El precio no es válido";
  }
  if (req.body.Description && req.body.Description.length < 10) {
    hasErrors = true;
    errors.Description = "La longitud de la descripción debe tener al menos 10 caracteres";
  }

  if (hasErrors) {
    res.status(400).json(errors);
    return;
  }

  // Actualizar el campo Image del producto
  db.get('products')
    .find({ ID: productId })
    .assign({ Image: req.file.filename })
    .write();

  res.status(200).json({ id: productId, filename: req.file.filename });
});

// Usar los middlewares y el router de JSON Server
app.use(middlewares);
app.use(router);

// Iniciar el servidor en el puerto 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`JSON Server is running on port ${PORT}`);
});