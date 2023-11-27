const express = require('express');
const router = express.Router();
const poolTableQueries = require('../db/queries/tables');

//get all pool tables
router.get('/', (req, res) => {
  poolTableQueries.getAllPoolTables()
    .then(tables => {
      res.json({ tables });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

//get pool table/:d
router.get('/:id', (req, res) => {
  const tableID = req.params.id;
  poolTableQueries.getTableByID(tableID)
    .then(table => {
      res.json({ table });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

// //add a pool table
// router.post('/', (req, res) => {
//   const newPoolTable = req.body;

//   poolTableQueries.addPoolTable(newPoolTable)
//     .then(table => {
//       console.log('New table added', table);
//       res.send(table);
//     })
//     .catch(err => {
//       res
//         .status(500)
//         .json({ error: err.message });
//     });
// });

//edit a pool table by ID
router.patch('/:id', (req, res) => {
  const poolTableID = req.params.id;
  const poolTable = req.body;

  poolTableQueries.editPoolTable(poolTableID, poolTable)
    .then(table => {
      console.log('Edited table', table);
      res.send(table);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});








module.exports = router;