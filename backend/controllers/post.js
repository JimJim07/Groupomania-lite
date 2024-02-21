const fsPromises = require('fs').promises;
const PostModel = require('../models/Post');
const UserModel = require('../models/User');

exports.createPost = async (req, res) => {
    try {
        const userId = req.auth.userId;
        const user = await UserModel.findById(userId)
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur introuvable' });
        }
        const txtContent = req.body.txtContent;
        const imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;

        const newPost = new PostModel({ posterId: userId, posterPseudo: user.pseudo, txtContent, imageUrl, likers: [] });
        await newPost.save();

        res.status(201).json({ message: 'Post enregistré !' });
    } catch (error) {
        res.status(400).json({ error });
    }
};

exports.modifyPost = async (req, res) => {
    try {
        const userId = req.auth.userId;

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

            post.txtContent = req.body.txtContent;
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
        const userId = req.auth.userId;
        const postId = req.params.id

        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur introuvable' });
        }

        const post = await PostModel.findById(postId);
        if (!post) {
            return res.status(404).json({ message: 'Post introuvable' });
        }

        if (user.admin || userId === post.posterId) {
            // Récupérez la liste des utilisateurs qui ont aimé le post
            const usersWhoLikedPost = await UserModel.find({ likes: postId });

            // Retirez le post de la liste des likes de chaque utilisateur
            for (const likedUser of usersWhoLikedPost) {
                await UserModel.findByIdAndUpdate(likedUser._id, { $pull: { likes: postId } });
            }

            // Supprimez le post
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
        const userId = req.auth.userId;

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

        // Récupérer tous les posts avant de les supprimer
        const posts = await PostModel.find();

        // Retirer chaque post de la liste de likes de chaque utilisateur
        for (const post of posts) {
            const usersWhoLikedPost = await UserModel.find({ likes: post._id });
            for (const likedUser of usersWhoLikedPost) {
                await UserModel.findByIdAndUpdate(likedUser._id, { $pull: { likes: post._id } });
            }
        }

        // Supprimer tous les fichiers images
        for (const file of files) {
            await fsPromises.unlink(`${directoryPath}/${file}`);
            console.log(`Le fichier ${file} a été supprimé.`);
        }

        // Supprimer tous les posts
        await PostModel.deleteMany();

        return res.status(200).json({ message: 'Tous les posts ont été supprimés' });
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

exports.likePost = async (req, res) => {
    try {
        const userId = req.auth.userId;
        const postId = req.params.id

        // Recherche du post
        const post = await PostModel.findById(postId);
        if (!post) {
            return res.status(404).json({ message: 'Post introuvable' });
        }

        const updatedPost = await PostModel.findByIdAndUpdate(
            postId,
            { $addToSet: { likers: userId } },
            { new: true }
        ).select('_id posterId likers');

        const updatedUser = await UserModel.findByIdAndUpdate(
            userId,
            { $addToSet: { likes: postId } },
            { new: true }
        ).select('pseudo likes');

        return res.status(200).json({ updatedPost, updatedUser });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

exports.unlikePost = async (req, res) => {
    try {
        const userId = req.auth.userId;
        const postId = req.params.id;

        // Recherche du post
        const post = await PostModel.findById(postId);
        if (!post) {
            return res.status(404).json({ message: 'Post introuvable' });
        }

        const updatedPost = await PostModel.findByIdAndUpdate(
            postId,
            { $pull: { likers: userId } },
            { new: true }
        ).select('_id posterId likers');

        const updatedUser = await UserModel.findByIdAndUpdate(
            userId,
            { $pull: { likes: postId } },
            { new: true }
        ).select('pseudo likes');

        return res.status(200).json({ updatedPost, updatedUser });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};