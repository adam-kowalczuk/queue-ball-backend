const client = require('../connection');

//get all tables
const getAllPoolTables = function() {
  return client
    .query('SELECT * FROM pool_tables')
    .then(tables => {
      return tables.rows;
    })
    .catch(err => {
      console.log(err);
    });
};

//get table by ID
const getTableByID = function(id) {
  return client
    .query('SELECT * FROM pool_tables WHERE id = $1', [id])
    .then(table => {
      return table.rows[0];
    })
    .catch(err => {
      console.log(err);
    });
};

// //add a pool table
// const addPoolTable = function(table) {
//   return client
//     .query('INSERT INTO pool_tables (name, is_available) VALUES($1, $2) RETURNING *',
//       [table.name, table.is_available])
//     .then(table => {
//       return table.rows[0];
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };

//edit a pool table
const editPoolTable = function(id, table) {
  return client
    .query('UPDATE pool_tables SET name = $1, is_available = $2 WHERE id = $3 RETURNING *',
      [table.name, table.is_available, id])
    .then(table => {
      return table.rows[0];
    })
    .catch(err => {
      console.log(err);
    });
};



module.exports = {
  getAllPoolTables,
  getTableByID,
  editPoolTable
};