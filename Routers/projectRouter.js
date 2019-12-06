const express = require("express");
const router = express.Router();
router.use(express.json());

const projectsDB = require("../data/helpers/projectModel");
const actionsDB = require("../data/helpers/actionModel");

// Get All Projects
router.get("/", (req, res) => {
  projectsDB
    .get()
    .then(projects => {
      res.status(200).json(projects);
    })
    .catch(error => {
      res.status(500).json({
        error: "There was an error while saving the comment to the data base"
      });
    });
});

// GET ONE Project
router.get("/:id", validproject_id, (req, res) => {
  res.status(200).json(req.project);
});

// POST method to Create new Project
router.post("/", validProject, (req, res) => {
  projectsDB
    .insert(req.body)
    .then(project => {
      res.status(200).json(project);
    })
    .catch(error => {
      res.status(500).json({
        error: "There was an error while saving the comment to the data base"
      });
    });
});

// POST method to Create new Action
router.post("/:id/actions", validAction, (req, res) => {
  actionsDB
    .insert(req.body)
    .then(action => {
      res.status(200).json(action);
    })
    .catch(error => {
      res.status(500).json({
        error: "There was an error while saving the comment to the data base"
      });
    });
});

// PUT Method to Update the project

router.put("/:id", validproject_id, (req, res) => {
  projectsDB
    .update(req.params.id, req.body)
    .then(updateproject => {
      res.status(200).json(updateproject);
    })
    .catch(error => {
      res.status(500).json({
        error: "There was an error while saving the comment to the data base"
      });
    });
});

//  Custon Middleware validateproject_ID

function validproject_id(req, res, next) {
  projectsDB
    .get(req.params.id)
    .then(project => {
      if (project) {
        req.project = project;
        next();
      } else {
        res.status(400).json({
          message: "invalid Project id"
        });
      }
    })
    .catch(error => {
      res.status(500).json({
        error: "There was an error while saving the comment to the data base"
      });
    });
}

//  Custon Middleware validateproject
function validProject(req, res, next) {
  if (req.body.name && req.body.description) {
    next();
  } else {
    res.status(400).json({
      message: "missing required name and description field"
    });
  }
}

//  Custon Middleware validateAction
function validAction(req, res, next) {
  if (req.body.notes && req.body.description && req.body.project_id) {
    if (req.body.project_id === Number(req.params.id)) {
      next();
    } else {
      console.log(req.body.project_id, req.params.id);
      res.status(400).json({
        message: "project_id is inCorrect"
      });
    }
  } else {
    res.status(400).json({
      message: "missing required notes and description project_id and field"
    });
  }
}

module.exports = router;
