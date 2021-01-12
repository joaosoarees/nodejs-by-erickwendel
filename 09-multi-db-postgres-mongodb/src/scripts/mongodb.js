// docker ps
// docker exec -it d296723f41a3 mongo -u joao -p root --authenticationDatabase herois

// Databases
// show dbs

// Mudando contexto para uma database especifica
// use herois

// Mostrar coleções de documentos
// show collections

// db.herois.insert({
//   nome: 'Flash',
//   poder: 'Velocidade',
//   dataNascimento: '1998-01-01',
// });

// db.herois.find();
// db.herois.find().pretty();

// for (let i = 0; i <= 1000; i++) {
//   db.herois.insert({
//     nome: `Clone-${i}`,
//     poder: 'Velocidade',
//     dataNascimento: '1998-01-01',
//   });
// }

// db.herois.count();
// db.herois.findOne();
// db.herois.find().limit(1000).sort({ nome: -1 });
// db.herois.find({}, { poder: 1, _id: 0 });

// create
// db.herois.insert({
//   nome: 'Flash',
//   poder: 'Velocidade',
//   dataNascimento: '1998-01-01',
// });

// read
// db.herois.find();

// update
// db.herois.update(
//   { _id: ObjectId('5ffe331683882a955f60e8eb') },
//   { nome: 'Mulher Maravilha' },
// );

// db.herois.update(
//   { _id: ObjectId('5ffe33a683882a955f60ecc2') },
//   { $set: { nome: 'Batman' } },
// );

// delete
// db.herois.remove({ });
