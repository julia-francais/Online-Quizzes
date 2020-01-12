// const DBConnection = require('../dbConnection');

// // Comme certaines propriété sont communes à tous les class/model/table

// class CoreModel {

//     // On déclare les propriétés communes a toutes les classes
//     id;
//     created_at;
//     updated_at;
//     status;

//     static tableName = null;

//     // On récupère les valeur de l'objet envoyé au contructeur pour les assignées propriétés de la classe mère
//     constructor(obj) {
//         this.id = obj.id;
//         // Si on veut ajouter les check à l'instanciation
//         // on peut utiliser les setter
//         //this.setId(obj.id);
//         this.status = obj.status;
//         this.created_at = obj.created_at;
//         this.updated_at = obj.updated_at;
//     };

//     // Les getter et setter, comme toute méthode, s'écrivent en camelCase et non en snake_case comme dans les tables de la base de données (et par exetnsion les paramètres des models)
//     // Ceci est un getter
//     getId() {
//         return this.id;
//     };

//     // Ceci est un setter
//     // Il prend toujourts en paramètre la propriété à mettre à jour
//     setId(value) {
//         // Ici au lieu d'utiliser typeof number ou isNaN
//         // On utilise Number.isInteger afin de s'assurer que le nombne reçu est bien un entier
//         if (!Number.isInteger(value)) {
//             throw Error('Model.id must be an integer!');
//         }
//         this.id = value;
//     };

//     getStatus() {
//         return this.status;
//     };

//     setStatus(value) {
//         if (!Number.isInteger(value)) {
//             throw Error('Model.status must be a integer!');
//         }
//         this.status = value;
//     };

//     getCreatedAt() {
//         return this.created_at;
//     }

//     setCreatedAt(value) {
//         // La date ser reçu sous form de timestamp
//         // ex : 1578045454
//         if (!Number.isInteger(value)) {
//             throw Error('Model.created_at must be a integer!');
//         }
//         this.created_at = value;
//     }

//     getUpdatedAt() {
//         return this.updated_at;
//     }

//     setUpdatedAt(value) {
//         if (!Number.isInteger(value)) {
//             throw Error('Model.updated_at must be a integer!');
//         }
//         this.updated_at = value;
//     };

//     static findAll(callback) {
//         //tablename
//         const query = `SELECT * FROM "${this.tableName}"`;

//         DBConnection.makeQuery(query, (error, result) => {
//             if (error) {
//                 return callback(error, null);
//             }

//             if (!result.rowCount) {
//                 return callback(null, []);
//             }

//             let trueResult = [];
//             for (let obj of result.rows) {
//                 // on peut utiliser "this" dans une méthode statique
//                 // Ici cela sera par exemple new User / new Level / new Question
//                 // En fait cela représente la classe qui appelle cette méthode
//                 // Dans le cas d'un appelle à Question.findAll > this = Question
//                 let instance = new this(obj);
//                 trueResult.push(instance);
//             }

//             callback(null, trueResult);
//         });
//     };

//     static findById(id, callback) {

//         const query = `SELECT * FROM "${this.tableName}" where "id"=${id}`;
//         DBConnection.makeQuery(query, (error, result) => {
//             if (error) {
//                 return callback(error, null);
//             }

//             if (!result.rowCount) {
//                 return callback(null, []);
//             } else {
//                 // Ici nous n'avons plus plusieurs résultat mais un seul
//                 const obj = result.rows[0]
//                 let instance = new this(obj);
//                 callback(null, instance);
//             }
//         });

//     };

//     static findBy(condition, callback) {
//         // Ici afin de pouvoir utiliser un nombre lambda de conditions, nous allons utiliser un objet comme paramètre
//         // Ici cela sera "condition"
//         /*
//             {
//                 app_users_id: 3,
//                 status: 1
//             }
//         */
//         /*
//         // Méthode de la condition bidon 1=1 afin de pouvoir concaténer
//         let query = `SELECT * FROM "${this.tableName}" WHERE 1=1 `;
//         for(let cond in condition){
//             query += ` AND ${cond} = ${condition[cond]}`;
//         }
//         */
//         let query = `SELECT * FROM "${this.tableName}"`;
//         if (typeof condition != 'undefined') {
//             let conditionArr = [];
//             for (let cond in condition) {
//                 conditionArr.push(cond + '=' + condition[cond]);
//             }

//             console.log(conditionArr);

//             // La contruction de la requête ce fait ici à la fin en utilisant le tableau préalablement généré
//             query = `SELECT * FROM "${this.tableName}" WHERE ${conditionArr.join(' AND ')}`;
//         }

//         DBConnection.makeQuery(query, (error, result) => {
//             if (error) {
//                 return callback(error, null);
//             }

//             if (!result.rowCount) {
//                 return callback(null, []);
//             } else {

//                 let trueResult = [];
//                 for (let obj of result.rows) {
//                     let instance = new this(obj);
//                     trueResult.push(instance);
//                 }

//                 callback(null, trueResult);
//             }
//         });


//     }

//     insert(callback) {

//         // Comme on ne connait pas à l'avance les propriétés d'une classe inconnu (Qui va appeler cette méthode ?)
//         // On va récupérer la liste des propriété de l'instance qui va appeler la méthode
//         // Et comme de par hasard les propriétés correspondent aux champs présents dans la table. Ca nous arrange bien ;)
//         let properties = Object.keys(this);

//         // On filtre le tablea de propriété afin d'obtenir la liste des champs que l'on va spécifier dans notre notre insert
//         // Ici on ne veut pas d'id
//         let tableStructure = [];
//         let tableValues = [];
//         for (let prop of properties) {

//             if (prop === 'id') {
//                 // continue dis de stopper le bout de code dans la boucle et de passé à l'itération suivante (élément suivant)
//                 // Ici on ne veut pas mettre l'id dans tableStructure, et on ne veut pas mettre sa valeur dans tableValues
//                 continue;
//             }

//             tableStructure.push(`"${prop}"`);

//             if (prop === 'created_at' || prop === 'updated_at') {
//                 tableValues.push('CURRENT_TIMESTAMP');
//             } else {
//                 tableValues.push(`'${this[prop]}'`);
//             }
//         }
//         //console.log(tableStructure, tableValues);


//         //this.contructor permet de récupérer la classe qui a construit l'instance courante
//         //comme j'ai récupérer la classe, j'ai également accès aux propriétés / méthodes statique de celle-ci
//         const query = `
//           INSERT INTO ${this.constructor.tableName}
//           (${tableStructure})
//           VALUES (${tableValues})
//           RETURNING id, created_at, updated_at
//         `;
//         console.log(query);

//         DBConnection.makeQuery(query, (error, result) => {
//             if (error) {
//                 return callback(error, null);
//             }
//             this.id = result.rows[0].id;
//             this.created_at = result.rows[0].created_at;
//             this.updated_at = result.rows[0].updated_at;
//             callback(null, this);
//         });

//     };

//     update(callback) {
//         let properties = Object.keys(this);

//         let data = [];

//         for (let prop of properties) {

//             if (prop === 'updated_at') {
//                 data.push('"updated_at" = CURRENT_TIMESTAMP')
//             } else if (prop !== 'id' && prop !== 'created_at') {
//                 data.push(`"${prop}" = '${this[prop]}'`);
//             }

//         }

//         const query = `
//           UPDATE "${this.constructor.tableName}" SET
//           ${data}
//           WHERE "id" = ${this.id}
//         `;

//         DBConnection.makeQuery(query, (error, result) => {
//             if (error) {
//                 return callback(error, null);
//             }

//             if (!result.rowCount) {
//                 console.log('Aucune donnée modifiée');
//                 return callback(null, this);
//             }

//             callback(null, this);
//         });

//     };

//     // Ici pour la factorisation rien de spécial toutes les tables on une colonne "id" et on supprime toujours grâce a celui-ci
//     delete(callback) {
//         const query = `DELETE FROM "${this.constructor.tableName}" WHERE id = ${this.id}`;
//         DBConnection.makeQuery(query, (error, result) => {

//             if (error) {
//                 return callback(error, null);
//             }

//             callback(null, this);
//         });
//     };

//     save(callback) {
//         // Je dois utiliser insert() ou update() ?
//         if (this.id) {
//             return this.update(callback);
//         } else {
//             return this.insert(callback);
//         }
//     }
// }

// module.exports = CoreModel;