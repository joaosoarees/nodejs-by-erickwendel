const Mongoose = require('mongoose');

Mongoose.connect('mongodb://joao:root@localhost:27017/herois', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}, (error) => {
  if (!error) return;
  console.log('Falha na conexão', error);
});

const { connection } = Mongoose;
connection.once('open', () => console.log('Database rodando'));

// setTimeout(() => {
//   const state = connection.readyState;
//   console.log(state);
// }, 5000);
/**
 * 0 - Disconectado
 * 1 - Conectado
 * 2 - Conectando
 * 3 - Disconectando
 */

const heroiSchema = new Mongoose.Schema({
  nome: {
    type: String,
    require: true,
  },
  poder: {
    type: String,
    required: true,
  },
  insertedAt: {
    type: Date,
    default: new Date().toLocaleDateString(),
  },
});

const model = Mongoose.model('herois', heroiSchema);

const main = async () => {
  const resultCadastrar = await model.create({
    nome: 'Batman',
    poder: 'Dinheiro',
  });

  console.log('Resultado: ', resultCadastrar);

  const listItens = await model.find();

  console.log('Itens: ', listItens);
};

main();
