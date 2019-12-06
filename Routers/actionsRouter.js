const express = require("express");

const router = express.Router();
router.use(express.json());

const actionsDB = require("../data/helpers/actionModel");

// GET method to get all actions
router.get("/", (req, res) => {
  actionsDB
    .get()
    .then(actions => {
      res.status(200).json(actions);
    })
    .catch(error => {
      res.status(500).json({
        error: "There was an error while saving the comment to the data base"
      });
    });
});

module.exports = router;
