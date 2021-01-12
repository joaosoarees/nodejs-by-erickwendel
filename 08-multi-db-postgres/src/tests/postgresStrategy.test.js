/* eslint-disable no-undef */
const assert = require('assert');
const Postgres = require('../db/strategies/postgres');
const Context = require('../db/strategies/base/contextStrategy');

const context = new Context(new Postgres());
const MOCK_HEROI_CADASTRAR = { nome: 'Gavião Negro', poder: 'Flexas' };
const MOCK_HEROI_ATUALIZAR = { nome: 'Batman', poder: 'Dinheiro' };

describe('Postgres Strategy', () => {
  it('PostgresSQL Connection', async () => {
    await context.connect();
    await context.create(MOCK_HEROI_ATUALIZAR);
    const result = await context.isConnected();
    assert.deepStrictEqual(result, true);
  });

  it('Cadastrar', async () => {
    await context.connect();
    const result = await context.create(MOCK_HEROI_CADASTRAR);

    delete result.id;

    assert.deepStrictEqual(result, MOCK_HEROI_CADASTRAR);
  });

  it('Listar', async () => {
    const [result] = await context.read({ nome: MOCK_HEROI_CADASTRAR.nome });

    delete result.id;

    assert.deepStrictEqual(result, MOCK_HEROI_CADASTRAR);
  });

  it('Atualizar', async () => {
    const [itemUpdate] = await context.read({ nome: MOCK_HEROI_ATUALIZAR.nome });

    const newItem = {
      ...MOCK_HEROI_ATUALIZAR,
      nome: 'Mulher Maravilha',
    };

    const [result] = await context.update(itemUpdate.id, newItem);
    const [itemUpdated] = await context.read({ id: itemUpdate.id });

    assert.deepStrictEqual(result, 1);
    assert.deepStrictEqual(itemUpdated.nome, newItem.nome);
  });
});
