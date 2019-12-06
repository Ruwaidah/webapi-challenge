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

// Get Action By ID
router.get("/:id", valideAction_id, (req, res) => {
  res.status(200).json(req.action);
});

//  Update action
router.put("/:id", valideAction_id, (req, res) => {
  actionsDB
    .update(req.params.id, req.body)
    .then(updateaction => {
      res.status(200).json(updateaction);
    })
    .catch(error => {
      res.status(500).json({
        error: "There was an error while saving the comment to the data base"
      });
    });
});

//  Custon Middleware validateACtion_ID
function valideAction_id(req, res, next) {
  actionsDB
    .get(req.params.id)
    .then(action => {
      if (action) {
        req.action = action;
        next();
      } else {
        res.status(400).json({
          message: "invalid Action id"
        });
      }
    })
    .catch(error => {
      res.status(500).json({
        error: "There was an error while saving the comment to the data base"
      });
    });
}
module.exports = router;
