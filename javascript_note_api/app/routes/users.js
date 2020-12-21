const express = require('express');
const router = express.Router();
const User = require('../models/user')
const jwt = require('jsonwebtoken');
const withAuth = require('../middlewares/auth');
require('dotenv').config()

const secret = process.env.JWT_TOKEN

router.post('/register', async (req, res) => {
  // Pegando as variaveis que foram passadas via requisição
  const { name, email, password } = req.body
  // estou criando um usuario, fazendo referencia a classe user
  // que foi criado no banco de dados
  const user = new User({name, email, password})
  // fazendo um try catch para possiveis errros
  try{
    // aqui estã sendo salvo os usuarios
    await user.save()
    // retornando um status 200, e passando o json do resultado
    res.status(200).json(user)
  }catch(err){
    // casso de algum erro, estou pegando o erro e dando a mensagem
    res.status(500).json({error: `Error registering new user ${err}`})
  }
})

router.post('/login', async (req, res) => {
  const {email, password} = req.body

  try{
    // aqui estou buscando usuario pelo email cadastrado
    const user = await User.findOne({ email })
    if(!user)
      res.status(401).json({error: 'Incorrect email or password'})
    else{
      user.isCorrectPassword(password, function (err, same) {
        if(!same)
          res.status(401).json({error: 'Incorrect email or password'})
        else{
          // aqui estou criando um token a partir do email, passando o secret que vai ser usado para gerar o token
          // e tambem estou passando um parametro que vai informar quanto tempo o usuario vai ficar logado
          const token = jwt.sign({email}, secret, { expiresIn: '10d'})
          res.json({user: user, token: token})
        }
      })
    }
  }catch(err){
    res.status(500).json({error: `Internal error! Please, try again ${err}`})
  }
})

router.put('/', withAuth, async function(req, res) {
  const { name, email } = req.body;

  try {
    var user = await User.findOneAndUpdate(
      {_id: req.user._id}, 
      { $set: { name: name, email: email}}, 
      { upsert: true, 'new': true }
    )
    const token = jwt.sign({email}, secret, { expiresIn: '10d'})
    res.json({user: user, token: token});
  } catch (error) {
    res.status(401).json({error: error});
  }
});


router.put('/password', withAuth, async function(req, res) {
  const { password } = req.body;

  try {
    var user = await User.findOne({_id: req.user._id})
    user.password = password
    await user.save()
    res.json(user);
  } catch (error) {
    res.status(401).json({error: error});
  }
});

router.delete('/', withAuth, async(req, res) => {
  try{
    let user = await User.findOne({_id: req.user._id})
    await user.delete()
    res.status(201).json({message: 'User deleted'})
  }catch(error){
    res.status(401).json({error: `Problem to delete a user: ${error}`})
  }
})

module.exports = router;
