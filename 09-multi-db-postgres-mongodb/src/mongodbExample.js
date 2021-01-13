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
