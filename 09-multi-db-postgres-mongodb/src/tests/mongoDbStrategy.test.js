/* eslint-disable func-names */
/* eslint-disable no-undef */
const assert = require('assert');
const MongoDB = require('../db/strategies/mongodb');
const Context = require('../db/strategies/base/contextStrategy');

const context = new Context(new MongoDB());

const MOCK_HEROI_CADASTRAR = {
  nome: 'Flash',
  poder: 'Velocidade',
};

const MOCK_HEROI_DEFAULT = {
  nome: `Thanos-${Date.now()}`,
  poder: 'Jóias',
};

describe('MongoDB Strategy', function () {
  this.beforeAll(async () => {
    await context.connect();
    await context.create(MOCK_HEROI_DEFAULT);
  });

  it('Verificar conexão', async () => {
    const result = await context.isConnected();

    const expected = 'Conectado';

    assert.deepStrictEqual(result, expected);
  });

  it('cadastrar', async () => {
    const { nome, poder } = await context.create(MOCK_HEROI_CADASTRAR);

    assert.deepStrictEqual({ nome, poder }, MOCK_HEROI_CADASTRAR);
  });

  it('listar', async () => {
    const [{ nome, poder }] = await context.read({ nome: MOCK_HEROI_DEFAULT.nome });
    const result = { nome, poder };

    assert.deepStrictEqual(result, MOCK_HEROI_DEFAULT);
  });
});
