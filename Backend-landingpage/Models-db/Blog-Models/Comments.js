const mongoose = require('mongoose');
const BlogPostM = require('./BlogPostM.js');

const commentSchema = new mongoose.Schema({
    IdComentario: {
        type: String,
        required: true
    },
    Fecha: {
        type: Date,
        default: Date.now,
        required: true
    },
    Autor: {
        type: String,
        required: true
    },
    Body: {
        type: String,
        required: true
    },
    Active: {
        type: Boolean,
        required: true
    },
    IdPost: {
        type: mongoose.Schema.Types.ObjectId, //Almacenar el Id en formato de Object
        required: true,
        ref : BlogPostM
    },
    IdComentarioPrincipal: {
        type: mongoose.Schema.Types.ObjectId, //Almacenar el Id en formato de Object
    }
});

module.exports = mongoose.model('Blog.Comentarios', commentSchema, 'Blog.Comentarios');
