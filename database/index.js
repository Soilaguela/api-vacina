// to use .env file variables
require("dotenv").config();

// import mongoose library
const mongoose = require('mongoose');

// connect to MongoDB
mongoose.connect(
  `mongodb+srv://Vacina_123:vacina@cluster0.9iy3s.mongodb.net/vacinadb?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  }
)
  .then(() => console.log(' Conectados a ' + process.env.DB_NAME + ' com Sucesso!'))
  .catch(err => console.log(err))

module.exports = mongoose;