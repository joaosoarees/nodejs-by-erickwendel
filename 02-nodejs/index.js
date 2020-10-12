/*
0 - Obter um usuário
1 - Obter o número de telefone de um usuário a partir de seu ID
2 - Obter o endereço do usuário pelo ID
*/
// importamos um módulo interno do node.js
const util = require('util');

function getUser() {
  // quando der algum problema -> reject(ERRO)
  // quando sucesso -> resolve()
  return new Promise(function resolvePromise(resolve, reject) {
    setTimeout(() => {
      return resolve({
        id: 1,
        name: 'João',
        birth: new Date()
      });
    }, 1000);
  });
};

function getPhone(userId) {
  return new Promise(function resolvePromise(resolve, reject) {
    setTimeout(() => {
      return resolve({
        phone: '993667220',
        ddd: 16
      });
    }, 2000);
  });
};

function getAddress(userId) {
  return new Promise(function resolveAddress(resolve, reject) {
    setTimeout(() => {
      return resolve({
        street: 'francisca martins',
        number: 0
      });
    }, 2000);
  })
};

// 1o passo adicionar a palavra async -> automaticamente ela retornará uma Promise
main();
async function main() {
  try {
    console.time('medida-promise');
    const user = await getUser();
    // const phone = await getPhone(user.id);
    // const address = await getAddress(user.id);
    const result = await Promise.all([
      getPhone(user.id),
      getAddress(user.id)
    ]);

    const address = result[1];
    const phone = result[0];

    console.log(`
      Nome: ${user.name},
      Telefone: (${phone.ddd} ${phone.phone}),
      Endereço: ${address.street}, ${address.number};
    `);
    console.timeEnd('medida-promise');
  }
  catch(error) {
    console.error('Deu Ruim', error);
  }
};

// const promiseUser = getUser();
// const getAsyncAddress = util.promisify(getAddress);

// para manipular o sucesso usamos a função .then
// para manipular erros usamos o .catch
// usuario -> telefone -> telefone

// promiseUser
//   .then(function (user) {
//     return getPhone(user.id)
//       .then(function resolvePhone(result) {
//         return {
//           user: {
//             name: user.name,
//             id: user.id
//           },
//           phone: result
//         };
//       }); 
//   })
//   .then(function (resultado) {
//     const address = getAsyncAddress(resultado.user.id);
//     return address.then(function resolveAddress(result) {
//       return {
//         user: resultado.user,
//         phone: resultado.phone,
//         address: result
//       }
//     });
//   })
//   .then(function (result) {
//     console.log(`
//       Name: ${result.user.name}
//       Address: ${result.address.street}, ${result.address.number}
//       Phone: (${result.phone.ddd}) ${result.phone.phone}
//     `);
//   })
//   .catch(function (error) {
//     console.error('Deu RUIM', error)
//   })

// getUser(function resolveUser(error, user) {
//   // null || "" || 0 === false
//   if (error) {
//     console.log('Deu ruim em usuario', error);
//     return;
//   };

//   getPhone(user.id, function resolvePhone(error1, phone) {
//     if (error) {
//       console.log('Deu ruim em telefone', error1);
//       return;
//     };

//     getAddress(user.id, function resolveAddress(error2, address) {
//       if (error) {
//         console.log('Deu ruim em endereço', error2);
//         return;
//       };

//       console.log(`
//         Nome: ${user.name},
//         Endereço: ${address.street},${address.number}
//         Telefone: (${phone.ddd}) ${phone.phone}
//       `);
//     });
//   });
// });
// // const phone = getPhone(user.id);

// console.log('telefone', phone);