const { obterPessoas } = require('./service');

Array.prototype.meuFilter = function(callback) {
  const lista = [];
  for(index in this) {
    const item = this[index];
    const resultado = callback(item, index, this);
    // 0, "", null, undefined === false
    if (!resultado) continue;
    lista.push(item);
  }

  return lista;
};

const main = async () => {
  try {
    const { results } = await obterPessoas('a');

    // const familiaLars = results.filter((item) => {
    //   // por padrão precisa retornar um booleano
    //   // para informar se deve manter ou remover da lista
    //   // false -> remove da lista
    //   // true -> mantém
    //   // não encontrou = -1
    //   // encontrou = posicaoNoArray
    //   const result = item.name.toLowerCase().indexOf(`lars`) !== -1;
    //   return result;
    // });

    const familiaLars = results.meuFilter((item, index, lista) => {
      return item.name.toLowerCase().indexOf('lars') !== -1;
    });

    const names = familiaLars.map(pessoa => pessoa.name);
    console.log(names);
  }
  catch(err) {
    console.error('deu ruim', err);
  }
};
main();