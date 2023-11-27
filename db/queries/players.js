const client = require("../connection");

//get all players
const getAllPlayers = function() {
  return client
    .query("SELECT * FROM players")
    .then((players) => {
      return players.rows;
    })
    .catch((err) => {
      console.log(err);
    });
};

const getPlayerCount = function() {
  return client
    .query(
      "SELECT count(players.name) as player_count, pool_tables.* FROM players RIGHT JOIN pool_tables ON players.table_id = pool_tables.id GROUP BY pool_tables.id ORDER BY pool_tables.id;"
    )
    .then((players) => {
      return players.rows;
    })
    .catch((err) => {
      console.log(err);
    });
};

//get player by ID
const getPlayerByID = function(id) {
  return client
    .query("SELECT * FROM players WHERE id = $1;", [id])
    .then((item) => {
      return item.rows[0];
    })
    .catch((err) => {
      console.log(err);
    });
};

//add a player to the queue
const enqueuePlayerByID = function(player) {
  return client
    .query(
      "UPDATE players SET enqueued_at = NOW(), table_id = $1 WHERE name = $2 RETURNING *",
      [player.table_id, player.name]
    )
    .then((player) => {
      return player.rows[0];
    })
    .catch((err) => {
      console.log(err);
    });
};

//remove player from the queue
const dequeuePlayerByID = function(player) {
  return client
    .query(
      "UPDATE players SET enqueued_at = null, table_id = null WHERE name = $1 RETURNING *",
      [player.name]
    )
    .then((player) => {
      return player.rows[0];
    })
    .catch((err) => {
      console.log(err);
    });
};

const addPlayer = function(player) {
  return client
    .query(
      "INSERT INTO players (name, enqueued_at, is_admin, table_id) VALUES($1, null, false, null) RETURNING *",
      [player.name]
    )
    .then((player) => {
      return player.rows[0];
    })
    .catch((err) => {
      console.log(err);
      throw err; // Re-throw the error to be caught and handled on the frontend
    });
};

module.exports = {
  getAllPlayers,
  getPlayerCount,
  getPlayerByID,
  enqueuePlayerByID,
  dequeuePlayerByID,
  addPlayer
};
