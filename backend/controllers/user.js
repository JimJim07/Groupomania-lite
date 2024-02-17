// Importation des packages, du model et du password
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/User');

const Admin = {
    pseudo: process.env.ADMIN_PSEUDO,
    email: process.env.ADMIN_EMAIL,
    password: process.env.ADMIN_PASSWORD
}

exports.signup = async (req, res) => {
    try {
        let ifAdmin = false;
        let message = "Utilisateur";

        if (req.body.pseudo === Admin.pseudo && req.body.email === Admin.email && req.body.password === Admin.password) {
            message = "Administrateur";
            ifAdmin = true;
        }

        if (req.body.pseudo === Admin.pseudo && !ifAdmin) {
            return res.status(401).json({ message: "Pseudo non autorisé" })
        }
        if (req.body.email === Admin.email && !ifAdmin) {
            return res.status(401).json({ message: "Email non autorisé" })
        }

        const hash = await bcrypt.hash(req.body.password, 10)
        const user = new UserModel({
            pseudo: req.body.pseudo,
            email: req.body.email,
            password: hash,
            admin: ifAdmin
        })

        await user.save()

        res.status(201).json({ message: `${message} créé !` })
    } catch (error) {
        res.status(400).json(error)
    }
};

exports.login = async (req, res) => {
    try {
        const user = await UserModel.findOne({ email: req.body.email })
        if (!user) {
            return res.status(401).json({ message: 'Paire identifiant/mot de passe incorrecte' });
        }

        const passwordIfValid = await bcrypt.compare(req.body.password, user.password)
        if (!passwordIfValid) {
            return res.status(401).json({ message: 'Paire identifiant/mot de passe incorrecte' })
        } else {
            console.log(user);
            res.status(200).json({
                userId: user._id,
                // Fonction sign() permet de chiffrer un nouveau token
                token: jwt.sign(
                    { userId: user._id },
                    process.env.TOKEN_SECRET,
                    { expiresIn: '24h' })
            });
        }
    } catch (error) {
        res.status(400).json(error)
    }
};

exports.getOneUser = async (req, res) => {
    try {
        const user = await UserModel.findOne({ _id: req.params.id }).select('pseudo')
        res.status(200).json(user)
    } catch (error) {
        res.status(400).json({ error })
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        const users = await UserModel.find().select('pseudo')
        res.status(200).json(users)
    } catch (error) {
        res.status(400).json({ error })
    }
};