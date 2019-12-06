const express = require("express");
const router = express.Router();
router.use(express.json());

const projectsDB = require("../data/helpers/projectModel");

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
module.exports = router;
