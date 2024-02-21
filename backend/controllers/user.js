const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/User');

const { ADMIN_PSEUDO, ADMIN_EMAIL, ADMIN_PASSWORD, TOKEN_SECRET } = process.env;

const admin = {
    pseudo: ADMIN_PSEUDO,
    email: ADMIN_EMAIL,
    password: ADMIN_PASSWORD
};

const messages = {
    unauthorized: "Paire identifiant/mot de passe incorrecte",
    userCreated: "Utilisateur créé !",
    adminCreated: "Administrateur créé !",
    unauthorizedPseudo: "Pseudo non autorisé",
    unauthorizedEmail: "Email non autorisé"
};

exports.signup = async (req, res) => {
    try {

        let isAdmin = false;
        let message = messages.userCreated;

        if (req.body.pseudo === admin.pseudo && req.body.email === admin.email && req.body.password === admin.password) {
            message = messages.adminCreated;
            isAdmin = true;
        } else if (req.body.pseudo === admin.pseudo) {
            return res.status(401).json({ message: messages.unauthorizedPseudo });
        } else if (req.body.email === admin.email) {
            return res.status(401).json({ message: messages.unauthorizedEmail });
        }

        const hash = await bcrypt.hash(req.body.password, 10);
        const user = new UserModel({
            pseudo: req.body.pseudo,
            email: req.body.email,
            password: hash,
            admin: isAdmin
        });

        await user.save();

        res.status(201).json({ message });
    } catch (error) {
        res.status(400).json({ error });
    }
};

exports.login = async (req, res) => {
    try {
        const user = await UserModel.findOne({ email: req.body.email });
        if (!user) {
            return res.status(401).json({ message: messages.unauthorized });
        }

        const passwordIfValid = await bcrypt.compare(req.body.password, user.password);
        if (!passwordIfValid) {
            return res.status(401).json({ message: messages.unauthorized });
        } else {
            res.status(200).json({
                userId: user._id,
                token: jwt.sign(
                    { userId: user._id },
                    TOKEN_SECRET,
                    { expiresIn: '24h' })
            });
        }
    } catch (error) {
        res.status(400).json({ error });
    }
};

exports.getOneUser = async (req, res) => {
    try {
        const user = await UserModel.findOne({ _id: req.params.id }).select('pseudo admin');
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ error });
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        const users = await UserModel.find().select('pseudo admin');
        res.status(200).json(users);
    } catch (error) {
        res.status(400).json({ error });
    }
};