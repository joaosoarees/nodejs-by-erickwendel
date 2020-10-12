const service = require('./service');

Array.prototype.meuMap = function (callback) {
  const novoArrayMapeado = [];

  for(let indice = 0; indice <= this.length - 1; indice++) {
    const resultado = callback(this[indice], indice);
    novoArrayMapeado.push(resultado);
  };

  return novoArrayMapeado;
};

const main = async () => {
  try {
    const result = await service.obterPessoas('a');
    // const names = [];
    
    // FOR-EACH
    // console.time('for-each');
    // result.results.forEach((item) => {
    //   names.push(item.name);
    // });
    // console.timeEnd('for-each');

    // MAP
    // console.time('map');
    // const names = result.results.map(pessoa => pessoa.name);
    // console.timeEnd('map');
    const names = result.results.meuMap(pessoa => pessoa.name)

    console.log('names', names);
  }
  catch(err) {
    console.error('Deu ruim', erro);
  }
};
main();