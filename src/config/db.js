const mongoose = require('mongoose')
require('dotenv').config()

function connect() {
    mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })

    const db = mongoose.connection
    db.on('error', (err) => {
        console.log(`Erro ao contectar com banco de dados: ${err.message}`)
    })
    db.once('open', () => {
        console.log('Conectado!')
    })
}

module.exports = {connect}
