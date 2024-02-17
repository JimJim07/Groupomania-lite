// Importation des packages
const fsPromises = require('fs').promises;
const PostModel = require('../models/Post');
const UserModel = require('../models/User');

exports.createPost = async (req, res) => {
    try {
        const { userId } = req.auth;
        const { post } = req.body;
        const imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;

        const newPost = new PostModel({ posterId: userId, post, imageUrl, likers: [] });
        await newPost.save();

        res.status(201).json({ message: 'Post enregistré !' });
    } catch (error) {
        res.status(400).json({ error });
    }
};

exports.modifyPost = async (req, res) => {
    try {
        const { userId } = req.auth;

        const user = await UserModel.findById(userId)
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur introuvable' });
        }

        const post = await PostModel.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ message: 'Post introuvable' });
        }

        if (user.admin || userId === post.posterId) {

            if (req.file) {
                const filename = post.imageUrl.split('/images/')[1];
                await fsPromises.unlink(`images/${filename}`);
                post.imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
            }

            post.post = req.body.post;
            await post.save();

            res.status(200).json({ message: 'Post modifié !' });
        } else {
            return res.status(403).json({ message: 'Non autorisé' });
        }

    } catch (error) {
        res.status(500).json({ error });
    }
};

exports.deleteOnePost = async (req, res) => {
    try {
        const { userId } = req.auth;

        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur introuvable' });
        }

        const post = await PostModel.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ message: 'Post introuvable' });
        }

        if (user.admin || userId === post.posterId) {
            const filename = post.imageUrl.split('/images/')[1];
            await fsPromises.unlink(`images/${filename}`);
            await post.deleteOne();
            return res.status(200).json({ message: 'Post supprimé !' });
        } else {
            return res.status(403).json({ message: 'Non autorisé' });
        }

    } catch (error) {
        return res.status(500).json({ error });
    }
};

exports.deleteAllPosts = async (req, res) => {
    try {
        const { userId } = req.auth;

        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur introuvable' });
        }

        if (!user.admin) {
            return res.status(403).json({ message: 'Non autorisé' });
        }

        const directoryPath = './images';

        const files = await fsPromises.readdir(directoryPath);

        if (!files.length) {
            return res.status(200).json({ message: 'Aucun fichier à supprimer dans le dossier images' });
        }

        for (const file of files) {
            await fsPromises.unlink(`${directoryPath}/${file}`);
            console.log(`Le fichier ${file} a été supprimé.`);
        }
        await PostModel.deleteMany();

        return res.status(200).json({ message: 'Tous les posts on été suprimés' });
    } catch (error) {
        return res.status(500).json({ error });
    }
};

exports.getAllPosts = async (req, res) => {
    try {
        const posts = await PostModel.find();
        res.status(200).json(posts);
    } catch (error) {
        res.status(400).json({ error });
    }
};

exports.getOnePost = async (req, res) => {
    try {
        const post = await PostModel.findById(req.params.id);
        res.status(200).json(post);
    } catch (error) {
        res.status(400).json({ error });
    }
};

exports.likePost = (req, res) => {
    try {
        PostModel.findByIdAndUpdate(
            req.params.id,
            {
                $addToSet: { likers: req.body.id }
            },
            { new: true },
            (err, docs) => {
                if (err) res.status(400).send(err);
                else return res.send(docs);
            }
        )
        UserModel.findByIdAndUpdate(
            req.body.id,
            {
                $addToSet: { likes: req.params.id }
            },
            { new: true },
            (err) => {
                if (err) return res.status(400).send(err);
            }
        )
    } catch (err) {
        return res.status(402).send(err);
    }
};

exports.unlikePost = (req, res) => {
    try {
        PostModel.findByIdAndUpdate(
            req.params.id,
            {
                $pull: { likers: req.body.id }
            },
            { new: true },
            (err, docs) => {
                if (err) res.status(400).send(err);
                else return res.send(docs);
            }
        )
        UserModel.findByIdAndUpdate(
            req.body.id,
            {
                $pull: { likes: req.params.id }
            },
            { new: true },
            (err) => {
                if (err) return res.status(400).send(err);
            }
        )
    } catch (err) {
        return res.status(400).send(err);
    }
};