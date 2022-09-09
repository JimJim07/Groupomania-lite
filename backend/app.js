require('dotenv').config({ path: './config/.env' })
require('./config/db')

const express = require('express');
const cors = require('cors');
const path = require('path');

const userRoutes = require('./routes/user.routes');
const postRoutes = require('./routes/post.routes');

// Création de l'application express    
const app = express();

// Erreurs CORS
app.use(cors());

// Permet d'accéder au corps de la requête ou bodyparser plus ancien
app.use(express.json());

app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes);

module.exports = app;