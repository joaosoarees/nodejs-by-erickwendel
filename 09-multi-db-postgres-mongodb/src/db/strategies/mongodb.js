/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
const Mongoose = require('mongoose');
const ICrud = require('./interfaces/interfaceCrud');

const STATUS = {
  0: 'Disconectado',
  1: 'Conectado',
  2: 'Conectando',
  3: 'Disconectando',
};

class MongoDB extends ICrud {
  constructor() {
    super();
    this._herois = null;
    this._driver = null;
  }

  async isConnected() {
    const state = STATUS[this._driver.readyState];

    if (state === 'Conectado') return state;

    if (state !== 'Conectando') return state;

    await new Promise((resolve) => setTimeout(resolve, 1000));

    return STATUS[this._driver.readyState];
  }

  defineModel() {
    const heroisSchema = new Mongoose.Schema({
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

    this._herois = Mongoose.model('herois', heroisSchema);
  }

  connect() {
    Mongoose.connect('mongodb://joao:root@localhost:27017/herois', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }, (error) => {
      if (!error) return;
      console.log('Falha na conexão', error);
    });

    const { connection } = Mongoose;

    this._driver = connection;
    this.defineModel();
  }

  create(item) {
    return this._herois.create(item);
  }
}

module.exports = MongoDB;
