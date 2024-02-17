// Importation des packages
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const { isEmail } = require('validator');

// Création du schéma pour la base de données MongoDB
const userSchema = mongoose.Schema(
  {
    pseudo: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 30,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      validate: [isEmail],
      lowercase: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    likes: {
      type: [String]
    },
    admin: {
      type: Boolean,
      required: true
    }
  },
  {
    timestamps: true
  }
);

userSchema.plugin(uniqueValidator);

// Exportation du schéma
module.exports = mongoose.model('User', userSchema);