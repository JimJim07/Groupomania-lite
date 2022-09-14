// Importation des packages, du model et du password
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/User.model');
const AdminModel = require('../models/Admin.model');

const Admin = {
    pseudo: "Admin007",
    email: "admin@test.fr",
    password: "Admin1234"
}

exports.signup = (req, res) => {
    if (req.body.pseudo === Admin.pseudo && req.body.email === Admin.email && req.body.password === Admin.password) {
        bcrypt.hash(req.body.password, 10)
            .then(hash => {
                const admin = new AdminModel({
                    pseudo: req.body.pseudo,
                    email: req.body.email,
                    password: hash
                });
                admin.save()
                    .then(() => res.status(201).json({ message: 'Administrateur créé !' }))
                    .catch(error => res.status(400).json({ error }));
            })
            .catch(error => res.status(500).json({ error }));
    } else {
        bcrypt.hash(req.body.password, 10)
            .then(hash => {
                const user = new UserModel({
                    pseudo: req.body.pseudo,
                    email: req.body.email,
                    password: hash
                });
                user.save()
                    .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
                    .catch(error => res.status(400).json({ error }));
            })
            .catch(error => res.status(500).json({ error }));
    }

};

exports.login = (req, res) => {
    if (req.body.email === Admin.email && req.body.password === Admin.password) {
        AdminModel.findOne({ email: req.body.email })
            .then(admin => {
                if (!admin) {
                    return res.status(401).json({ message: 'Paire identifiant/mot de passe incorrecte' });
                }
                // Nous utilisons la fonction compare de bcrypt pour comparer le mot de passe entré par l'utilisateur avec le hash enregistré dans la base de données
                bcrypt.compare(req.body.password, admin.password)
                    .then(valid => {
                        if (!valid) {
                            return res.status(401).json({ message: 'Paire identifiant/mot de passe incorrecte' });
                        } else {
                            res.status(200).json({
                                adminId: admin._id,
                                // Fonction sign() permet de chiffrer un nouveau token
                                token: jwt.sign(
                                    { adminId: admin._id },
                                    process.env.TOKEN_SECRET,
                                    { expiresIn: '24h' })
                            });
                        }
                    })
                    .catch(error => res.status(500).json({ error }));
            })
            .catch(error => res.status(500).json({ error }));
    } else {
        UserModel.findOne({ email: req.body.email })
            .then(user => {
                if (!user) {
                    return res.status(401).json({ message: 'Paire identifiant/mot de passe incorrecte' });
                }
                // Nous utilisons la fonction compare de bcrypt pour comparer le mot de passe entré par l'utilisateur avec le hash enregistré dans la base de données
                bcrypt.compare(req.body.password, user.password)
                    .then(valid => {
                        if (!valid) {
                            return res.status(401).json({ message: 'Paire identifiant/mot de passe incorrecte' });
                        } else {
                            res.status(200).json({
                                userId: user._id,
                                // Fonction sign() permet de chiffrer un nouveau token
                                token: jwt.sign(
                                    { userId: user._id },
                                    process.env.TOKEN_SECRET,
                                    { expiresIn: '24h' })
                            });
                        }
                    })
                    .catch(error => res.status(500).json({ error }));
            })
            .catch(error => res.status(500).json({ error }));
    }

};

exports.getOneUser = (req, res) => {
    UserModel.findOne({ _id: req.params.id }).select('pseudo')
        .then((user) => res.status(200).json(user))
        .catch(error => res.status(400).json({ error }));
};

// A supprimer *****************************************************************************
exports.getAllUsers = (req, res) => {
    UserModel.find().select('-password')
        .then(users => res.status(200).json(users))
        .catch(error => res.status(400).json({ error }));
};

exports.deleteAllUsers = (req, res) => {
    UserModel.deleteMany()
        .then(() => res.status(200).json({ message: 'Tous les utilisateurs supprimés !' }))
        .catch(error => res.status(400).json({ error }));
};
// A supprimer *****************************************************************************