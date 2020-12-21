const mongoose = require('mongoose')

// Aqui estou criando a estrutura de dados que vai ter
// No banco de dados

let noteSchema = new mongoose.Schema({
    title: String,
    body: String,
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now},
    // Fazendo relação entre usuario e data
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
})

noteSchema.index({'title': 'text', 'body': 'text'})

module.exports = mongoose.model('Note', noteSchema)