const express = require('express');
const router = express.Router();
const Note = require('../models/note')
const withAuth = require('../middlewares/auth');

router.get('/', withAuth, async (req, res) => {
    try{
        // Aqui estou pegando as notas, usando o find para buscar o author
        // Passando o id do usuario para o author
        const notes = await Note.find({ author: req.user._id})
        res.status(200).json(notes)
    }catch(err){
        res.status(500).json({ error: `Note cannot find: ${err}`})
    }
})

router.get('/search', withAuth, async (req, res) => {
    // pegando a querry (valor digitado) para poder pesquisar
    // no caso estamos pegando o valor de req.query
    const { query } = req.query

    try {
        // estamos chamando a nota, usando o find para pesquisar somente as notas do usuario atual(pegando pelo id do usuario)
        // depois estou usando o find novamente, para buscar todos os campos que estejam indexados como texto
        let notes = await Note.find({ author: req.user._id }).find({ $text: {$search: query}})
        res.status(200).json(notes)
    } catch (error) {
        res.status(400).json({error: `cannot find note: ${error}`})
    }
})

// pegando as notas pelo id do usuario
// passando o withAuth para pegar somente se o usuario estiver autenticado
router.get('/:id', withAuth, async( req, res) => {
    try{
        // armazenando o id em uma const
        const { id } = req.params

        // pegando a nota
        let note = await Note.findById(id)
        // fazendo a verificacao para ver se o usuario pode ver a nota
        // estou passando o usuario da requisicao, e a nota que foi buscada pelo id
        if(isOwner(req.user, note))
            res.json(note)
        else    
            res.status(403).json({error: `You don't have permission to acess this file`})
    }catch(err){
        res.status(500).json({ error: `Problem to get a note: ${err}`})
    }
})


router.post('/', withAuth, async (req, res) => {
    // Pegando o title e o body da noda pelo corpo da requisição
    const { title, body } = req.body

    // criando a nova nota passando os atributos
    // o req.user foi passado pelo middleware para poder pegar o email
    try{
        let note = new Note( {title: title, body: body, author: req.user._id })
        await note.save()
        res.status(200).json(note)
    }catch(err){
        res.status(500).json( {error: `Problem to crate a new note: ${err}`})
    }
})



router.put('/:id', withAuth, async (req, res) => {
    const { title, body } = req.body
    const { id } = req.params

    try {
        let note = await Note.findById(id)
        if(isOwner(req.user, note)){
            // estou buscando um e atualizando, passando o id, e as opçoes para serem modificadas
            // usando o $set: vou definir o que vai mudar
            // usando o upsert, serve para retornar a nota nova para o usuario
            let note = await Note.findOneAndUpdate(
                {_id: id}, 
                { $set: {title: title, body: body} },
                { upsert: true, 'new': true}
            )
            res.json(note)
        }else {
            res.status(403).json({error: `You don't have permission to acess this file`})
        }
    } catch (error) {
        res.status(500).json({ error: `Problem to update a note: ${error}`})
    }
})

router.delete('/:id', withAuth, async(req, res) => {
    const { id } = req.params

    try {
        let note = await Note.findById(id)
        if(isOwner(req.user, note)){
            await note.delete()
            res.status(200).json({message: 'ok'})
        }else{
            res.status(403).json({error: `You don't have permission to acess this file`})
        }

    } catch (error) {
        res.status(500).json({ error: `Problem to delete a note: ${error}`})
    }
})

// criando uma função para verificar se o id do usuario
// é o mesmo do id do usuario que criou a nota
const isOwner = (user, note) => {
    // se o id do usuario for igual o id do criador da nota
    if(JSON.stringify(user._id) ==JSON.stringify(note.author._id))
    // retorna verdadeiro
        return true
    // se não for
    else
        // retorna falso
        return false
}

module.exports = router

