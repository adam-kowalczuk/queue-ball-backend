const express = require("express");
const router = express.Router();
const playerQueries = require("../db/queries/players");

//get all players
router.get("/", (req, res) => {
  playerQueries
    .getAllPlayers()
    .then((players) => {
      res.json({ players });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.get("/count", (req, res) => {
  playerQueries
    .getPlayerCount()
    .then((tables) => {
      res.json({ tables });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

//get player/:id
router.get("/:id", (req, res) => {
  const playerID = req.params.id;
  playerQueries
    .getPlayerByID(playerID)
    .then((player) => {
      res.json({ player });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

//when a player joins the queue
router.patch("/enqueued", (req, res) => {
  const player = req.body;

  playerQueries
    .enqueuePlayerByID(player)
    .then((player) => {
      playerQueries.getPlayerCount().then((tables) => {
        res.json({ tables });
      });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.patch("/dequeued", (req, res) => {
  const player = req.body;

  playerQueries
    .dequeuePlayerByID(player)
    .then((player) => {
      playerQueries.getPlayerCount().then((tables) => {
        res.json({ tables });
      });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

//add a player
router.post("/", (req, res) => {
  const newPlayer = req.body;

  playerQueries
    .addPlayer(newPlayer)
    .then((player) => {
      res.send(player);
    })
    .catch((err) => {
      if (err.code === "23505") {
        // Unique constraint violation error
        res.status(400).send("Please choose a different name.");
      } else {
        // Other errors
        console.log(err);
        res.status(500).send("An error occurred while adding the player due to unique name constraint");
      }
    });
});

module.exports = router;
