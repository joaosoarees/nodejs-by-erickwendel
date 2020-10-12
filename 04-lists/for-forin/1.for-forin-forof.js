const service = require('./service');

const main = async () => {
  try {
    const result = await service.obterPessoas('a');

    const names = [];

    // FOR
    console.time('for');
    for(let i = 0; i <= result.results.length -1; i++) {
      const pessoa = result.results[i];
      names.push(pessoa.name);
    }
    console.timeEnd('for');

    //FOR-IN
    console.time('for-in');
    for(let i in result.results) {
      const pessoa = result.results[i];
      names.push(pessoa.name);
    }
    console.timeEnd('for-in');

    // FOR-OF
    console.time('for-of');
    for(pessoa of result.results) {
      names.push(pessoa.name);
    }
    console.timeEnd('for-of');

    console.log('names', names);
  }
  catch(err) {
    console.err('erro interno', err);
  }
};

main();