const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

// Aqui estou criando a estrutura de dados que vai ter
// No banco de dados

let userSchema = new mongoose.Schema({
    name: String,
    email: { 
        type: String, 
        required: true, 
        unique: true 
    },
    password: {
        type: String,
        required: true
    },
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now},

})

// Vamos criar um middleware para transformar nosso password em um hash
userSchema.pre('save', function (next) {
    // Agora vamos verificar se o password mudou
    if(this.isNew || this.isModified('password')) {
        bcrypt.hash(this.password, 10, (err, hashedPassword) => {
            if(err)
                next(err)
            else{
                this.password = hashedPassword
                next(
                )
            }
        })
    }
})

userSchema.methods.isCorrectPassword = function (password, callback) {
    // compare vai servir para comparar se o password passado, é igual o cadastrado
    // same é o cara que vai dizer se o password é igual, vai colocar se é true ou false
    bcrypt.compare(password, this.password, function(err, same) {
        // vendo se o erro é presente
        if(err)
            // se tiver erro, vamos chamar o callback passando o erro
            callback(err)
        else
            // se nao tiver erro, vamos passar esses valores para o callback
            callback(err, same)
    })
}

module.exports = mongoose.model('User', userSchema)