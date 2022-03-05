const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VacinacaoSchema = new Schema({
  data: {
    type: String,
    required: true,
    format: "Month-D"
  },
  nomeVaina: {
    type: String,
    required: true,
  },
  nVacinados: {
    type: Number,
    required: true,
  },
  
  localVacinacao: {
    type: String,
    required: true,
  },
  
});



// Exportar Dados Model
var Vacina = module.exports = mongoose.model('Vacina', VacinacaoSchema);

module.exports.get = function (callback, limit) {
  Vacina.find(callback).limit(limit);
}