const assert = require('assert');
const Postgres = require('../db/strategies/postgres');
const Context = require('../db/strategies/base/contextStrategy');

const context = new Context(new Postgres())
const MOCK_HEROI_CADASTRAR = { nome: 'Gavião Negro', poder: 'Flexas' };

describe('Postgres Strategy', () => {
  it('PostgresSQL Connection', async () => {
    await context.connect()
    const result = await context.isConnected();
    assert.deepStrictEqual(result, true)
  })

  it('Cadastrar', async () => {
    await context.connect()
    const result = await context.create(MOCK_HEROI_CADASTRAR)

    delete result.id

    assert.deepStrictEqual(result, MOCK_HEROI_CADASTRAR)
  })
})