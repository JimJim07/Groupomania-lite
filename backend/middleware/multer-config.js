// Importation du package 'multer'
const multer = require('multer');

// Définition du type image accepté
const MIME_TYPES = {
  'image/jpg' : 'jpg',
  'image/jpeg': 'jpg',
  'image/png' : 'png'
};

// Destination du stockage des images
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'images');
  },
// Création d'un nom de fichier unique des images
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_');
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + '.' + extension);
  }
});

// Exportation du module
module.exports = multer({ storage }).single('image');