const express = require('express')
require('dotenv').config()
const secret = process.env.JWT_TOKEN

const jwt = require('jsonwebtoken')

const User = require('../models/user')

// middleware para autenticar o usuário
const withAuth = (req, res, next) => {
    // Vamos pegar o token da requisição
    const token = req.headers['x-access-token']
    // Se o token não estiver presente vamos devolver uma mensagem de não autorizado
    if(!token)
        res.status(401).json({error: 'Unauthorized: no token provide'})
    else{
        // Caso o token esteja presente vamos verificar se o token passado é válido
        jwt.verify(token, secret, function (err, decoded) {
            // Caso não seja, vamos devolver uma mensagem de não autorizado
            if(err)
                res.status(401).json({error: 'Unauthorized: invalid token'})
            else{
                // Agora vamos pegar o email associado com o token
                req.email = decoded.email
                // Vamos encontrar o usuário e injeta-lo na requisição
                User.findOne({email: decoded.email})
                .then(user => {
                    req.user = user
                    next()
                })
                .catch(error => {
                    res.status(401).json({error: error})
                })
            }
        })
    }
}

module.exports = withAuth 