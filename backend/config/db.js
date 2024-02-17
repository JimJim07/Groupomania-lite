const mongoose = require('mongoose');

// Connexion MongoDB
mongoose.connect(process.env.DB_USER_PASS)
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));