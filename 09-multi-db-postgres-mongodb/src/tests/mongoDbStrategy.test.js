/* eslint-disable func-names */
/* eslint-disable no-undef */
const assert = require('assert');
const MongoDB = require('../db/strategies/mongodb');
const Context = require('../db/strategies/base/contextStrategy');

const context = new Context(new MongoDB());

describe('MongoDB Suite de Testes', function () {
  this.beforeAll(async () => {
    await context.connect();
  });

  it.only('Verificar conexão', async () => {
    const result = await context.isConnected();

    const expected = 'Conectado';

    assert.deepStrictEqual(result, expected);
  });
});
